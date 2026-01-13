"""Обработка колбэков от Robokassa для оплаты дополнительных AI-запросов"""
import json
import os
import hashlib
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context) -> dict:
    """Обработка успешных платежей от Robokassa"""
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    db_url = os.environ.get('DATABASE_URL')
    schema = os.environ.get('MAIN_DB_SCHEMA', 't_p46047379_doc_dialog_ecosystem')
    robokassa_password2 = os.environ.get('ROBOKASSA_PASSWORD2')
    
    if not db_url or not robokassa_password2:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Configuration missing'}),
            'isBase64Encoded': False
        }
    
    params = event.get('queryStringParameters') or {}
    
    out_sum = params.get('OutSum', '')
    inv_id = params.get('InvId', '')
    signature_value = params.get('SignatureValue', '')
    user_id = params.get('Shp_user_id', '')
    count = params.get('Shp_count', '0')
    
    if not all([out_sum, inv_id, signature_value, user_id, count]):
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'text/plain'},
            'body': 'Missing parameters',
            'isBase64Encoded': False
        }
    
    signature_string = f"{out_sum}:{inv_id}:{robokassa_password2}:Shp_count={count}:Shp_user_id={user_id}"
    expected_signature = hashlib.md5(signature_string.encode()).hexdigest().upper()
    
    if expected_signature != signature_value.upper():
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'text/plain'},
            'body': 'Invalid signature',
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(db_url)
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        cur.execute(f"""
            UPDATE {schema}.users 
            SET extra_requests = extra_requests + %s
            WHERE id = %s
            RETURNING extra_requests
        """, (int(count), int(user_id)))
        
        conn.commit()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'text/plain'},
            'body': f'OK{inv_id}',
            'isBase64Encoded': False
        }
        
    except Exception as e:
        conn.rollback()
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'text/plain'},
            'body': 'Error processing payment',
            'isBase64Encoded': False
        }
    finally:
        cur.close()
        conn.close()
