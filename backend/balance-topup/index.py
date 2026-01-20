import json
import os
import uuid
import base64
import psycopg2
from psycopg2.extras import RealDictCursor
import requests

def handler(event: dict, context) -> dict:
    """Создание платежа для пополнения баланса пользователей"""
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Метод не поддерживается'}),
            'isBase64Encoded': False
        }
    
    headers = event.get('headers', {})
    user_id = headers.get('X-User-Id', '') or headers.get('x-user-id', '')
    
    if not user_id:
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Требуется авторизация'}),
            'isBase64Encoded': False
        }
    
    try:
        body = json.loads(event.get('body', '{}'))
        amount = body.get('amount')
        bonus = body.get('bonus', 0)
        package_id = body.get('package_id', 'custom')
        
        if not amount or amount < 300:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Минимальная сумма пополнения — 300 ₽'}),
                'isBase64Encoded': False
            }
        
        dsn = os.environ.get('DATABASE_URL')
        schema = os.environ.get('MAIN_DB_SCHEMA', 't_p46047379_doc_dialog_ecosystem')
        
        conn = psycopg2.connect(dsn)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        # Получаем данные пользователя
        cur.execute(f"SELECT email, role FROM {schema}.users WHERE id = %s", (user_id,))
        user = cur.fetchone()
        
        if not user:
            cur.close()
            conn.close()
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Пользователь не найден'}),
                'isBase64Encoded': False
            }
        
        user_email = user['email'] or 'noreply@brossok.ru'
        user_role = user['role']
        
        # Получаем ключи ЮКассы
        shop_id = os.environ.get('YOOMONEY_SHOP_ID')
        secret_key = os.environ.get('YOOMONEY_SECRET_KEY')
        
        if not shop_id or not secret_key:
            cur.close()
            conn.close()
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Платёжная система не настроена'}),
                'isBase64Encoded': False
            }
        
        payment_id = str(uuid.uuid4())
        total_amount = amount + bonus
        
        description = f"Пополнение баланса на {amount} ₽"
        if bonus > 0:
            description += f" (бонус +{bonus} ₽)"
        
        # Используем реферер для определения домена
        headers = event.get('headers', {})
        origin = headers.get('Origin') or headers.get('origin') or headers.get('Referer') or headers.get('referer') or 'https://docdialog.su'
        base_domain = origin.split('//')[1].split('/')[0] if '//' in origin else 'docdialog.su'
        return_url = f"https://{base_domain}/payment/processing?type=balance_topup"
        
        payment_data = {
            'amount': {
                'value': str(amount),
                'currency': 'RUB'
            },
            'confirmation': {
                'type': 'redirect',
                'return_url': return_url
            },
            'capture': True,
            'description': description,
            'receipt': {
                'customer': {
                    'email': user_email
                },
                'items': [
                    {
                        'description': f'Пополнение баланса ({user_role})',
                        'quantity': '1',
                        'amount': {
                            'value': str(amount),
                            'currency': 'RUB'
                        },
                        'vat_code': 1,
                        'payment_mode': 'full_payment',
                        'payment_subject': 'service'
                    }
                ]
            },
            'metadata': {
                'user_id': str(user_id),
                'amount': str(amount),
                'bonus': str(bonus),
                'total_amount': str(total_amount),
                'package_id': package_id,
                'type': 'balance_topup'
            }
        }
        
        auth_string = f"{shop_id}:{secret_key}"
        auth_header = base64.b64encode(auth_string.encode()).decode()
        
        response = requests.post(
            'https://api.yookassa.ru/v3/payments',
            json=payment_data,
            headers={
                'Authorization': f'Basic {auth_header}',
                'Content-Type': 'application/json',
                'Idempotence-Key': payment_id
            },
            timeout=10
        )
        
        if response.status_code != 200:
            print(f"YooKassa API error: {response.text}")
            cur.close()
            conn.close()
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Ошибка создания платежа', 'details': response.text}),
                'isBase64Encoded': False
            }
        
        payment_result = response.json()
        payment_url = payment_result.get('confirmation', {}).get('confirmation_url', '')
        
        # Логируем платёж
        cur.execute(f"""
            INSERT INTO {schema}.payment_logs (user_id, payment_id, amount, type, status, metadata)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (
            user_id, 
            payment_result.get('id'), 
            amount, 
            'balance_topup', 
            'pending', 
            json.dumps({'amount': amount, 'bonus': bonus, 'total': total_amount, 'package_id': package_id})
        ))
        conn.commit()
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'payment_url': payment_url,
                'payment_id': payment_result.get('id'),
                'amount': amount,
                'total_amount': total_amount
            }),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }