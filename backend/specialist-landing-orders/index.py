import json
import os
import psycopg2

def handler(event: dict, context) -> dict:
    '''
    API для управления заказами лендингов специалистов.
    Поддерживает GET (список), POST (создание), DELETE (удаление).
    '''
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Authorization'
            },
            'body': ''
        }
    
    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
    
    dsn = os.environ.get('DATABASE_URL')
    if not dsn:
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'error': 'Database connection not configured'})
        }
    
    auth_header = event.get('headers', {}).get('X-Authorization', '')
    user_id = auth_header.replace('Bearer ', '').strip() if auth_header else None
    
    if not user_id:
        return {
            'statusCode': 401,
            'headers': headers,
            'body': json.dumps({'error': 'Unauthorized'})
        }
    
    conn = psycopg2.connect(dsn)
    cur = conn.cursor()
    
    try:
        if method == 'GET':
            cur.execute('''
                SELECT id, name, email, phone, specialization, status, created_at
                FROM t_p46047379_doc_dialog_ecosystem.specialist_landing_orders
                WHERE user_id = %s
                ORDER BY created_at DESC
            ''', (user_id,))
            
            rows = cur.fetchall()
            orders = []
            for row in rows:
                orders.append({
                    'id': row[0],
                    'name': row[1],
                    'email': row[2],
                    'phone': row[3],
                    'specialization': row[4],
                    'status': row[5],
                    'created_at': row[6].isoformat() if row[6] else None
                })
            
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps(orders)
            }
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            
            name = body.get('name', '').strip()
            email = body.get('email', '').strip()
            phone = body.get('phone', '').strip()
            specialization = body.get('specialization', '').strip()
            
            if not all([name, email, phone, specialization]):
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'body': json.dumps({'error': 'Missing required fields'})
                }
            
            cur.execute('''
                INSERT INTO t_p46047379_doc_dialog_ecosystem.specialist_landing_orders
                (user_id, name, email, phone, specialization, status, created_at)
                VALUES (%s, %s, %s, %s, %s, 'pending', NOW())
                RETURNING id
            ''', (user_id, name, email, phone, specialization))
            
            order_id = cur.fetchone()[0]
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': headers,
                'body': json.dumps({'id': order_id, 'status': 'created'})
            }
        
        elif method == 'DELETE':
            params = event.get('queryStringParameters', {}) or {}
            order_id = params.get('id')
            
            if not order_id:
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'body': json.dumps({'error': 'Missing order id'})
                }
            
            cur.execute('''
                DELETE FROM t_p46047379_doc_dialog_ecosystem.specialist_landing_orders
                WHERE id = %s AND user_id = %s AND status = 'pending'
            ''', (order_id, user_id))
            
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({'status': 'deleted'})
            }
        
        else:
            return {
                'statusCode': 405,
                'headers': headers,
                'body': json.dumps({'error': 'Method not allowed'})
            }
    
    except Exception as e:
        conn.rollback()
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'error': str(e)})
        }
    
    finally:
        cur.close()
        conn.close()
