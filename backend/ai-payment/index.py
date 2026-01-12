import json
import os
import uuid
from datetime import datetime
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context) -> dict:
    '''Backend функция для оплаты AI-подписки через ЮMoney: создание платежа, проверка статуса, активация подписки'''
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '{}',
            'isBase64Encoded': False
        }
    
    db_url = os.environ.get('DATABASE_URL')
    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
    
    if not db_url:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Database configuration missing'}),
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(db_url, options=f'-c search_path={schema}')
    conn.autocommit = True
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        user_id = event.get('headers', {}).get('X-User-Id') or event.get('headers', {}).get('x-user-id')
        if not user_id:
            return {
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Unauthorized'}),
                'isBase64Encoded': False
            }
        
        user_id = int(user_id)
        
        if method == 'POST':
            body = json.loads(event.get('body', '{}'))
            action = body.get('action')
            
            if action == 'create_payment':
                plan = body.get('plan')
                amount = body.get('amount')
                
                if not plan or not amount:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Missing plan or amount'}),
                        'isBase64Encoded': False
                    }
                
                # TODO: Интеграция с ЮMoney
                # yoomoney_client_id = os.environ.get('YOOMONEY_CLIENT_ID')
                # yoomoney_secret = os.environ.get('YOOMONEY_SECRET_KEY')
                
                payment_id = str(uuid.uuid4())
                
                # Временно: создаём запись о платеже в БД (таблицу нужно добавить через миграцию)
                # cursor.execute('''
                #     INSERT INTO ai_subscription_payments (user_id, plan, amount, payment_id, status)
                #     VALUES (%s, %s, %s, %s, %s)
                #     RETURNING id
                # ''', (user_id, plan, amount, payment_id, 'pending'))
                
                # payment_record = cursor.fetchone()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'payment_id': payment_id,
                        'payment_url': f'https://yoomoney.ru/checkout/payments/v2/contract?orderId={payment_id}',
                        'message': 'Платёж создан. После настройки ЮMoney секретов будет работать полноценно.'
                    }),
                    'isBase64Encoded': False
                }
            
            elif action == 'check_payment':
                payment_id = body.get('payment_id')
                
                if not payment_id:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Missing payment_id'}),
                        'isBase64Encoded': False
                    }
                
                # TODO: Проверка статуса платежа через ЮMoney API
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'status': 'pending',
                        'message': 'Проверка статуса будет доступна после настройки ЮMoney'
                    }),
                    'isBase64Encoded': False
                }
            
            elif action == 'activate_subscription':
                plan = body.get('plan')
                
                if not plan:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Missing plan'}),
                        'isBase64Encoded': False
                    }
                
                plan_limits = {
                    'basic': 15,
                    'pro': 50,
                    'unlimited': -1
                }
                
                new_limit = plan_limits.get(plan, 3)
                
                cursor.execute('''
                    UPDATE specialists
                    SET subscription_tier = %s, ai_dialogs_limit = %s
                    WHERE user_id = %s
                ''', (plan, new_limit, user_id))
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'success': True,
                        'plan': plan,
                        'limit': new_limit,
                        'message': 'Подписка успешно активирована'
                    }),
                    'isBase64Encoded': False
                }
        
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    finally:
        cursor.close()
        conn.close()
