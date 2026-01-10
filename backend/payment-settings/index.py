import json
import os
import psycopg2

def handler(event: dict, context) -> dict:
    '''API для управления настройками платёжных систем (ЮMoney)'''
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            },
            'body': ''
        }

    auth_header = event.get('headers', {}).get('X-Authorization', '')
    if not auth_header or not auth_header.startswith('Bearer '):
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Unauthorized'})
        }

    token = auth_header.replace('Bearer ', '')
    
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()

    try:
        cur.execute("SELECT id, role FROM users WHERE id = (SELECT user_id FROM sessions WHERE token = %s)", (token,))
        user = cur.fetchone()
        
        if not user or user[1] != 'admin':
            return {
                'statusCode': 403,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Access denied'})
            }

        if method == 'GET':
            cur.execute("""
                SELECT yoomoney_shop_id, yoomoney_secret_key 
                FROM payment_settings 
                LIMIT 1
            """)
            result = cur.fetchone()
            
            if result:
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'yoomoney_shop_id': result[0] or '',
                        'yoomoney_secret_key': result[1] or ''
                    })
                }
            else:
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'yoomoney_shop_id': '',
                        'yoomoney_secret_key': ''
                    })
                }

        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            shop_id = body.get('yoomoney_shop_id', '').strip()
            secret_key = body.get('yoomoney_secret_key', '').strip()

            cur.execute("""
                INSERT INTO payment_settings (yoomoney_shop_id, yoomoney_secret_key, updated_at)
                VALUES (%s, %s, NOW())
                ON CONFLICT (id) DO UPDATE 
                SET yoomoney_shop_id = EXCLUDED.yoomoney_shop_id,
                    yoomoney_secret_key = EXCLUDED.yoomoney_secret_key,
                    updated_at = NOW()
            """, (shop_id, secret_key))
            
            conn.commit()

            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': True, 'message': 'Settings saved'})
            }

        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }

    except Exception as e:
        conn.rollback()
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }
    finally:
        cur.close()
        conn.close()
