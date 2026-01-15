"""Обработка колбэков от ЮMoney (YooKassa) для оплаты дополнительных AI-запросов"""
import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context) -> dict:
    """Обработка уведомлений о платежах от ЮMoney"""
    
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    db_url = os.environ.get('DATABASE_URL')
    schema = os.environ.get('MAIN_DB_SCHEMA', 't_p46047379_doc_dialog_ecosystem')
    
    if not db_url:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Configuration missing'}),
            'isBase64Encoded': False
        }
    
    body_content = event.get('body', '{}')
    
    if isinstance(body_content, str):
        try:
            body = json.loads(body_content)
        except:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Invalid JSON'}),
                'isBase64Encoded': False
            }
    else:
        body = body_content
    
    event_type = body.get('event')
    payment_object = body.get('object', {})
    
    if event_type != 'payment.succeeded':
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'status': 'ignored'}),
            'isBase64Encoded': False
        }
    
    payment_id = payment_object.get('id')
    payment_status = payment_object.get('status')
    metadata = payment_object.get('metadata', {})
    
    if payment_status != 'succeeded':
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'status': 'ignored'}),
            'isBase64Encoded': False
        }
    
    user_id = metadata.get('user_id')
    count = metadata.get('count')
    payment_type = metadata.get('type')
    first_purchase_bonus = metadata.get('first_purchase_bonus', 'false') == 'true'
    
    if not user_id or not count or payment_type != 'extra_requests':
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Invalid metadata'}),
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(db_url)
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        cur.execute(f"""
            SELECT status FROM {schema}.payment_logs 
            WHERE payment_id = %s
        """, (payment_id,))
        
        log = cur.fetchone()
        
        if log and log['status'] == 'succeeded':
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'status': 'already_processed'}),
                'isBase64Encoded': False
            }
        
        # Обновляем запросы и отмечаем использование бонуса первой покупки
        if first_purchase_bonus:
            cur.execute(f"""
                UPDATE {schema}.users 
                SET extra_requests = extra_requests + %s,
                    first_purchase_bonus_used = true
                WHERE id = %s
            """, (int(count), int(user_id)))
        else:
            cur.execute(f"""
                UPDATE {schema}.users 
                SET extra_requests = extra_requests + %s
                WHERE id = %s
            """, (int(count), int(user_id)))
        
        cur.execute(f"""
            UPDATE {schema}.payment_logs
            SET status = 'succeeded', updated_at = CURRENT_TIMESTAMP
            WHERE payment_id = %s
        """, (payment_id,))
        
        conn.commit()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'status': 'ok'}),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        conn.rollback()
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Error processing payment'}),
            'isBase64Encoded': False
        }
    finally:
        cur.close()
        conn.close()