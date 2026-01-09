"""
API для оплаты размещения вакансий через Юкассу
"""
import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
import uuid
import base64
import http.client
from datetime import datetime, timedelta


def handler(event: dict, context) -> dict:
    """API для создания платежа за вакансию и обработки вебхука"""
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Authorization'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    try:
        dsn = os.environ.get('DATABASE_URL')
        schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
        conn = psycopg2.connect(dsn)
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        # Получаем пользователя из токена
        token = event.get('headers', {}).get('X-Authorization', '').replace('Bearer ', '')
        
        if not token and method == 'POST':
            action = json.loads(event.get('body', '{}')).get('action')
            if action != 'yookassa_webhook':
                cursor.close()
                conn.close()
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Unauthorized'}),
                    'isBase64Encoded': False
                }
        
        user_id = None
        if token:
            # Проверяем JWT токен
            jwt_secret = os.environ.get('JWT_SECRET')
            if jwt_secret:
                try:
                    import jwt
                    payload = jwt.decode(token, jwt_secret, algorithms=['HS256'])
                    user_id = payload.get('user_id')
                except:
                    pass
        
        if method == 'POST':
            body = json.loads(event.get('body', '{}'))
            action = body.get('action')
            
            # Создание платежа за вакансию
            if action == 'create_vacancy_payment':
                if not user_id:
                    cursor.close()
                    conn.close()
                    return {
                        'statusCode': 401,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Unauthorized'}),
                        'isBase64Encoded': False
                    }
                
                vacancy_data = body.get('vacancy_data', {})
                
                # Проверяем, есть ли у пользователя салон
                cursor.execute(f'SELECT id FROM {schema}.salons WHERE user_id = %s', (user_id,))
                salon = cursor.fetchone()
                
                if not salon:
                    cursor.close()
                    conn.close()
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Сначала создайте профиль салона'}),
                        'isBase64Encoded': False
                    }
                
                salon_id = salon['id']
                
                # Создаём платёж в Юкассе
                shop_id = os.environ.get('YOOKASSA_SHOP_ID')
                secret_key = os.environ.get('YOOKASSA_SECRET_KEY')
                
                if not shop_id or not secret_key:
                    cursor.close()
                    conn.close()
                    return {
                        'statusCode': 500,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Юкасса не настроена'}),
                        'isBase64Encoded': False
                    }
                
                # Генерируем уникальный ID платежа
                payment_id = str(uuid.uuid4())
                
                # Сохраняем данные вакансии в БД временно
                cursor.execute(f'''
                    INSERT INTO {schema}.pending_vacancies 
                    (payment_id, salon_id, vacancy_data, created_at)
                    VALUES (%s, %s, %s, NOW())
                ''', (payment_id, salon_id, json.dumps(vacancy_data)))
                conn.commit()
                
                # Создаём платёж в Юкассе
                payment_payload = {
                    "amount": {
                        "value": "500.00",
                        "currency": "RUB"
                    },
                    "confirmation": {
                        "type": "redirect",
                        "return_url": f"https://{event.get('headers', {}).get('Host', 'app.poehali.dev')}/dashboard?payment=success"
                    },
                    "capture": True,
                    "description": "Размещение вакансии на 3 суток",
                    "metadata": {
                        "payment_id": payment_id,
                        "user_id": str(user_id),
                        "salon_id": str(salon_id)
                    }
                }
                
                # HTTP запрос к Юкассе
                auth_string = f"{shop_id}:{secret_key}"
                auth_b64 = base64.b64encode(auth_string.encode()).decode()
                
                conn_yookassa = http.client.HTTPSConnection("api.yookassa.ru")
                headers = {
                    'Authorization': f'Basic {auth_b64}',
                    'Content-Type': 'application/json',
                    'Idempotence-Key': payment_id
                }
                
                conn_yookassa.request("POST", "/v3/payments", json.dumps(payment_payload), headers)
                response = conn_yookassa.getresponse()
                response_data = json.loads(response.read().decode())
                conn_yookassa.close()
                
                if response.status == 200:
                    cursor.close()
                    conn.close()
                    return {
                        'statusCode': 200,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({
                            'payment_id': response_data['id'],
                            'confirmation_url': response_data['confirmation']['confirmation_url']
                        }),
                        'isBase64Encoded': False
                    }
                else:
                    cursor.close()
                    conn.close()
                    return {
                        'statusCode': 500,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Ошибка создания платежа', 'details': response_data}),
                        'isBase64Encoded': False
                    }
            
            # Обработка вебхука от Юкассы
            elif action == 'yookassa_webhook':
                event_data = body.get('event')
                object_data = body.get('object', {})
                
                if event_data == 'payment.succeeded':
                    payment_id = object_data.get('metadata', {}).get('payment_id')
                    salon_id = object_data.get('metadata', {}).get('salon_id')
                    
                    if payment_id and salon_id:
                        # Получаем данные вакансии
                        cursor.execute(f'''
                            SELECT vacancy_data FROM {schema}.pending_vacancies 
                            WHERE payment_id = %s AND salon_id = %s
                        ''', (payment_id, int(salon_id)))
                        
                        result = cursor.fetchone()
                        if result:
                            vacancy_data = result['vacancy_data']
                            
                            # Создаём вакансию
                            expires_at = datetime.now() + timedelta(days=3)
                            cursor.execute(f'''
                                INSERT INTO {schema}.salon_vacancies 
                                (salon_id, specializations, schedule, salary_from, salary_to, 
                                 requirements, requires_partner_courses, expires_at, is_active, created_at)
                                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, true, NOW())
                            ''', (
                                int(salon_id),
                                vacancy_data['specializations'],
                                vacancy_data.get('schedule'),
                                vacancy_data.get('salary_from'),
                                vacancy_data.get('salary_to'),
                                vacancy_data.get('requirements'),
                                vacancy_data.get('requires_partner_courses', False),
                                expires_at
                            ))
                            
                            # Удаляем временную запись
                            cursor.execute(f'DELETE FROM {schema}.pending_vacancies WHERE payment_id = %s', (payment_id,))
                            conn.commit()
                
                cursor.close()
                conn.close()
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json'},
                    'body': json.dumps({'status': 'ok'}),
                    'isBase64Encoded': False
                }
        
        # GET - проверка количества вакансий
        if method == 'GET':
            if not user_id:
                cursor.close()
                conn.close()
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Unauthorized'}),
                    'isBase64Encoded': False
                }
            
            cursor.execute(f'''
                SELECT COUNT(*) as count 
                FROM {schema}.salon_vacancies v
                JOIN {schema}.salons s ON v.salon_id = s.id
                WHERE s.user_id = %s
            ''', (user_id,))
            
            result = cursor.fetchone()
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'count': result['count'] if result else 0}),
                'isBase64Encoded': False
            }
        
        cursor.close()
        conn.close()
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }