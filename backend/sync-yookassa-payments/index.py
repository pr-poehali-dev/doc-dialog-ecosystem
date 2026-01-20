import json
import os
import base64
import psycopg2
from psycopg2.extras import RealDictCursor
import requests

def handler(event: dict, context) -> dict:
    """Синхронизация статусов платежей с ЮКассой (для админа)"""
    
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
    
    try:
        dsn = os.environ.get('DATABASE_URL')
        schema = os.environ.get('MAIN_DB_SCHEMA', 't_p46047379_doc_dialog_ecosystem')
        
        # Получаем ключи ЮКассы
        shop_id = os.environ.get('YOOMONEY_SHOP_ID')
        secret_key = os.environ.get('YOOMONEY_SECRET_KEY')
        
        if not shop_id or not secret_key:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Платёжная система не настроена'}),
                'isBase64Encoded': False
            }
        
        conn = psycopg2.connect(dsn)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        # Получаем все pending платежи за последние 24 часа
        cur.execute(f"""
            SELECT * FROM {schema}.payment_logs
            WHERE status = 'pending'
            AND created_at > NOW() - INTERVAL '24 hours'
            ORDER BY created_at DESC
        """)
        
        pending_payments = cur.fetchall()
        
        auth_string = f"{shop_id}:{secret_key}"
        auth_header = base64.b64encode(auth_string.encode()).decode()
        
        processed = 0
        succeeded = 0
        failed = 0
        
        for payment in pending_payments:
            payment_id = payment['payment_id']
            user_id = payment['user_id']
            payment_type = payment['type']
            log_metadata = payment['metadata'] if payment['metadata'] else {}
            
            # Проверяем статус платежа в ЮКассе
            response = requests.get(
                f'https://api.yookassa.ru/v3/payments/{payment_id}',
                headers={
                    'Authorization': f'Basic {auth_header}',
                    'Content-Type': 'application/json'
                },
                timeout=10
            )
            
            if response.status_code != 200:
                print(f"Error checking payment {payment_id}: {response.text}")
                failed += 1
                continue
            
            yookassa_data = response.json()
            yookassa_status = yookassa_data.get('status')
            metadata = yookassa_data.get('metadata', {})
            
            print(f"Payment {payment_id}: status={yookassa_status}")
            
            if yookassa_status == 'succeeded':
                # Обрабатываем успешный платёж
                if payment_type == 'extra_requests':
                    count = int(log_metadata.get('count', metadata.get('count', 0)))
                    first_purchase_bonus = log_metadata.get('first_purchase_bonus') == 'True'
                    
                    cur.execute(f"""
                        UPDATE {schema}.users
                        SET extra_requests = COALESCE(extra_requests, 0) + %s
                        WHERE id = %s
                    """, (count, user_id))
                    
                    if first_purchase_bonus:
                        cur.execute(f"""
                            UPDATE {schema}.users
                            SET first_purchase_bonus_used = TRUE
                            WHERE id = %s
                        """, (user_id,))
                
                elif payment_type == 'ai_subscription':
                    plan = metadata.get('plan', log_metadata.get('plan'))
                    operations = int(metadata.get('operations', log_metadata.get('operations', 0)))
                    
                    cur.execute(f"""
                        UPDATE {schema}.users
                        SET ai_dialogs_limit = %s,
                            subscription_tier = %s,
                            subscription_expires = NOW() + INTERVAL '30 days'
                        WHERE id = %s
                    """, (operations, plan, user_id))
                    
                    print(f"Activated {plan} subscription for user {user_id} ({operations} operations)")
                
                elif payment_type == 'balance_topup':
                    amount = int(log_metadata.get('amount', 0))
                    bonus = int(log_metadata.get('bonus', 0))
                    total = amount + bonus
                    
                    cur.execute(f"""
                        UPDATE {schema}.users
                        SET balance = COALESCE(balance, 0) + %s
                        WHERE id = %s
                    """, (total, user_id))
                
                # Обновляем статус платежа
                cur.execute(f"""
                    UPDATE {schema}.payment_logs
                    SET status = 'succeeded', updated_at = NOW()
                    WHERE payment_id = %s
                """, (payment_id,))
                
                succeeded += 1
                processed += 1
            
            elif yookassa_status in ['canceled', 'failed']:
                # Помечаем платёж как неудачный
                cur.execute(f"""
                    UPDATE {schema}.payment_logs
                    SET status = %s, updated_at = NOW()
                    WHERE payment_id = %s
                """, (yookassa_status, payment_id))
                
                processed += 1
                failed += 1
        
        conn.commit()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'status': 'completed',
                'total_checked': len(pending_payments),
                'processed': processed,
                'succeeded': succeeded,
                'failed': failed
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
