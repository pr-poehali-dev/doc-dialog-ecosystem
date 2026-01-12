import json
import os
import uuid
import base64
import psycopg2
from psycopg2.extras import RealDictCursor
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError


def response(status_code: int, body: dict) -> dict:
    return {
        'statusCode': status_code,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, X-Authorization'
        },
        'body': json.dumps(body, ensure_ascii=False, default=str),
        'isBase64Encoded': False
    }


def handler(event: dict, context) -> dict:
    '''API для оплаты дополнительных вакансий через ЮКассу'''
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return response(200, {})
    
    auth_header = event.get('headers', {}).get('X-Authorization', '')
    if not auth_header.startswith('Bearer '):
        return response(401, {'error': 'Требуется авторизация'})
    
    token = auth_header.replace('Bearer ', '')
    
    dsn = os.environ.get('DATABASE_URL')
    schema = os.environ.get('MAIN_DB_SCHEMA')
    
    try:
        conn = psycopg2.connect(dsn)
        cur = conn.cursor(cursor_factory=RealDictCursor)
    except Exception as e:
        return response(500, {'error': 'Ошибка подключения к БД', 'details': str(e)})
        
        cur.execute(f"""
            SELECT user_id FROM {schema}.auth_tokens 
            WHERE token = %s AND expires_at > NOW()
        """, (token,))
        
        auth_data = cur.fetchone()
        if not auth_data:
            conn.close()
            return response(401, {'error': 'Неверный токен'})
        
        user_id = auth_data['user_id']
        
        if method == 'POST':
            try:
                body = json.loads(event.get('body', '{}'))
                salon_name = body.get('salon_name')
                vacancy_count = body.get('vacancy_count', 1)
                
                if not salon_name:
                    conn.close()
                    return response(400, {'error': 'Укажите салон'})
                
                cur.execute(f"""
                    SELECT id FROM {schema}.salons
                    WHERE user_id = %s AND name = %s
                """, (user_id, salon_name))
                
                salon = cur.fetchone()
                if not salon:
                    conn.close()
                    return response(404, {'error': 'Салон не найден', 'user_id': user_id, 'salon_name': salon_name})
            except Exception as e:
                conn.close()
                return response(500, {'error': 'Ошибка обработки запроса', 'details': str(e)})
            
            salon_id = salon['id']
            
            price_per_vacancy = 500
            total_amount = price_per_vacancy * vacancy_count
            
            shop_id = os.environ.get('YOOKASSA_SHOP_ID')
            secret_key = os.environ.get('YOOKASSA_SECRET_KEY')
            
            if not shop_id or not secret_key:
                conn.close()
                return response(500, {'error': 'Платежная система не настроена'})
            
            idempotence_key = str(uuid.uuid4())
            
            payment_data = {
                'amount': {
                    'value': f'{total_amount}.00',
                    'currency': 'RUB'
                },
                'confirmation': {
                    'type': 'redirect',
                    'return_url': f'https://{event.get("headers", {}).get("host", "")}/dashboard?payment_success=true'
                },
                'capture': True,
                'description': f'Оплата {vacancy_count} доп. вакансий для салона {salon_name}',
                'metadata': {
                    'user_id': str(user_id),
                    'salon_id': str(salon_id),
                    'vacancy_count': str(vacancy_count)
                }
            }
            
            auth_string = f'{shop_id}:{secret_key}'
            auth_bytes = auth_string.encode('utf-8')
            auth_b64 = base64.b64encode(auth_bytes).decode('ascii')
            
            req = Request(
                'https://api.yookassa.ru/v3/payments',
                data=json.dumps(payment_data).encode('utf-8'),
                headers={
                    'Authorization': f'Basic {auth_b64}',
                    'Idempotence-Key': idempotence_key,
                    'Content-Type': 'application/json'
                },
                method='POST'
            )
            
            try:
                with urlopen(req) as response_obj:
                    yookassa_response = json.loads(response_obj.read().decode('utf-8'))
                
                payment_id = yookassa_response['id']
                confirmation_url = yookassa_response['confirmation']['confirmation_url']
                
                cur.execute(f"""
                    INSERT INTO {schema}.vacancy_payments
                    (payment_id, user_id, salon_id, amount, vacancy_count, status, created_at)
                    VALUES (%s, %s, %s, %s, %s, 'pending', NOW())
                """, (payment_id, user_id, salon_id, total_amount, vacancy_count))
                
                conn.commit()
                conn.close()
                
                return response(200, {
                    'payment_id': payment_id,
                    'confirmation_url': confirmation_url,
                    'amount': total_amount
                })
                
            except HTTPError as e:
                error_body = e.read().decode('utf-8')
                conn.close()
                return response(500, {
                    'error': 'Ошибка создания платежа',
                    'details': error_body
                })
            except URLError as e:
                conn.close()
                return response(500, {
                    'error': 'Ошибка соединения с платежной системой',
                    'details': str(e)
                })
        
        elif method == 'GET':
            payment_id = event.get('queryStringParameters', {}).get('payment_id')
            
            if not payment_id:
                conn.close()
                return response(400, {'error': 'Укажите payment_id'})
            
            cur.execute(f"""
                SELECT * FROM {schema}.vacancy_payments
                WHERE payment_id = %s AND user_id = %s
            """, (payment_id, user_id))
            
            payment = cur.fetchone()
            if not payment:
                conn.close()
                return response(404, {'error': 'Платеж не найден'})
            
            if payment['status'] in ['succeeded', 'failed']:
                conn.close()
                return response(200, {
                    'status': payment['status'],
                    'vacancy_count': payment['vacancy_count']
                })
            
            shop_id = os.environ.get('YOOKASSA_SHOP_ID')
            secret_key = os.environ.get('YOOKASSA_SECRET_KEY')
            
            auth_string = f'{shop_id}:{secret_key}'
            auth_bytes = auth_string.encode('utf-8')
            auth_b64 = base64.b64encode(auth_bytes).decode('ascii')
            
            req = Request(
                f'https://api.yookassa.ru/v3/payments/{payment_id}',
                headers={
                    'Authorization': f'Basic {auth_b64}',
                    'Content-Type': 'application/json'
                },
                method='GET'
            )
            
            try:
                with urlopen(req) as response_obj:
                    yookassa_response = json.loads(response_obj.read().decode('utf-8'))
                
                status = yookassa_response['status']
                
                if status == 'succeeded':
                    cur.execute(f"""
                        UPDATE {schema}.vacancy_payments
                        SET status = 'succeeded', paid_at = NOW()
                        WHERE payment_id = %s
                    """, (payment_id,))
                    
                    cur.execute(f"""
                        UPDATE {schema}.salons
                        SET paid_vacancy_slots = COALESCE(paid_vacancy_slots, 0) + %s
                        WHERE id = %s
                    """, (payment['vacancy_count'], payment['salon_id']))
                    
                    conn.commit()
                    
                elif status in ['canceled', 'failed']:
                    cur.execute(f"""
                        UPDATE {schema}.vacancy_payments
                        SET status = 'failed'
                        WHERE payment_id = %s
                    """, (payment_id,))
                    conn.commit()
                
                conn.close()
                
                return response(200, {
                    'status': status,
                    'vacancy_count': payment['vacancy_count']
                })
                
            except HTTPError as e:
                error_body = e.read().decode('utf-8')
                conn.close()
                return response(500, {
                    'error': 'Ошибка проверки платежа',
                    'details': error_body
                })
            except URLError as e:
                conn.close()
                return response(500, {
                    'error': 'Ошибка соединения с платежной системой',
                    'details': str(e)
                })
        
        conn.close()
        return response(405, {'error': 'Метод не поддерживается'})
        
    except Exception as e:
        return response(500, {'error': str(e)})