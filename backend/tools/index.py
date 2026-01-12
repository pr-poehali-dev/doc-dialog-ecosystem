import json
import os
import psycopg2

def handler(event: dict, context) -> dict:
    '''Получение списка инструментов для пользователя по его роли'''
    
    print(f"Event: {json.dumps(event, ensure_ascii=False)}")
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Authorization'
            },
            'body': ''
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    # Получаем токен из заголовка
    token = event.get('headers', {}).get('X-Authorization', '').replace('Bearer ', '').strip()
    
    if not token:
        return {
            'statusCode': 401,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Unauthorized'})
        }
    
    conn = None
    try:
        # Подключаемся к БД
        dsn = os.environ.get('DATABASE_URL')
        print(f"Connecting to DB, token present: {bool(token)}")
        conn = psycopg2.connect(dsn)
        cur = conn.cursor()
        
        # Получаем роль пользователя по токену
        cur.execute("""
            SELECT role FROM t_p46047379_doc_dialog_ecosystem.users 
            WHERE token = %s
        """, (token,))
        
        user_row = cur.fetchone()
        print(f"User found: {bool(user_row)}")
        if not user_row:
            return {
                'statusCode': 401,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Invalid token'})
            }
        
        user_role = user_row[0]
        print(f"User role: {user_role}")
        
        # Получаем инструменты для роли пользователя
        cur.execute("""
            SELECT id, name, description, url, video_url 
            FROM t_p46047379_doc_dialog_ecosystem.tools
            WHERE target_role = %s AND is_active = true
            ORDER BY display_order, id
        """, (user_role,))
        
        tools = []
        for row in cur.fetchall():
            tools.append({
                'id': row[0],
                'name': row[1],
                'description': row[2],
                'url': row[3],
                'video_url': row[4]
            })
        
        print(f"Tools found: {len(tools)}")
        cur.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(tools)
        }
        
    except Exception as e:
        print(f"Error in tools handler: {str(e)}")
        import traceback
        traceback.print_exc()
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)})
        }
    finally:
        if conn:
            conn.close()