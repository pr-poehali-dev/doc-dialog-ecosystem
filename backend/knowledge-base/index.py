import json
import os
import psycopg2
import jwt

def handler(event: dict, context) -> dict:
    """API для управления базами знаний (FAQ) для разных типов пользователей"""
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Authorization'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    try:
        dsn = os.environ.get('DATABASE_URL')
        schema = 't_p46047379_doc_dialog_ecosystem'
        
        conn = psycopg2.connect(dsn)
        conn.autocommit = True
        cur = conn.cursor()
        
        query_params = event.get('queryStringParameters', {}) or {}
        action = query_params.get('action', '')
        target_type = query_params.get('target_type', 'school')
        faq_id = query_params.get('id')
        
        # Проверка авторизации для всех операций кроме GET без id
        headers = event.get('headers', {})
        token = headers.get('X-Authorization', headers.get('Authorization', '')).replace('Bearer ', '')
        is_admin = False
        
        if method != 'GET' or action == 'save_settings':
            if not token:
                cur.close()
                conn.close()
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Требуется авторизация'}),
                    'isBase64Encoded': False
                }
            
            # Проверяем JWT токен и права администратора
            try:
                jwt_secret = os.environ.get('JWT_SECRET', 'default-secret-key')
                decoded = jwt.decode(token, jwt_secret, algorithms=['HS256'])
                user_role = decoded.get('role')
                
                if user_role not in ['admin', 'moderator']:
                    cur.close()
                    conn.close()
                    return {
                        'statusCode': 403,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Доступ запрещён'}),
                        'isBase64Encoded': False
                    }
            except jwt.InvalidTokenError:
                cur.close()
                conn.close()
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Неверный токен'}),
                    'isBase64Encoded': False
                }
            
            is_admin = True
        
        # GET - получить все FAQ для типа
        if method == 'GET' and not action and not faq_id:
            cur.execute(f"""
                SELECT id, target_type, category, question, answer, order_index, created_at
                FROM {schema}.knowledge_base
                WHERE target_type = '{target_type}'
                ORDER BY order_index ASC, created_at DESC
            """)
            items = cur.fetchall()
            
            result = {
                'items': [{
                    'id': item[0],
                    'target_type': item[1],
                    'category': item[2],
                    'question': item[3],
                    'answer': item[4],
                    'order_index': item[5],
                    'created_at': item[6].isoformat() if item[6] else None
                } for item in items]
            }
            
            cur.close()
            conn.close()
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(result, ensure_ascii=False),
                'isBase64Encoded': False
            }
        
        # GET settings - получить настройки для типа
        if method == 'GET' and action == 'settings':
            cur.execute(f"""
                SELECT telegram_support_url
                FROM {schema}.knowledge_base_settings
                WHERE target_type = '{target_type}'
            """)
            settings = cur.fetchone()
            
            result = {
                'telegram_support_url': settings[0] if settings else 'https://t.me/+QgiLIa1gFRY4Y2Iy'
            }
            
            cur.close()
            conn.close()
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(result, ensure_ascii=False),
                'isBase64Encoded': False
            }
        
        # POST save_settings - сохранить настройки
        if method == 'POST' and action == 'save_settings':
            body = json.loads(event.get('body', '{}'))
            target = body.get('target_type', 'school')
            telegram_url = body.get('telegram_support_url', 'https://t.me/+QgiLIa1gFRY4Y2Iy')
            
            cur.execute(f"""
                INSERT INTO {schema}.knowledge_base_settings (target_type, telegram_support_url)
                VALUES ('{target}', '{telegram_url}')
                ON CONFLICT (target_type) 
                DO UPDATE SET telegram_support_url = '{telegram_url}'
            """)
            
            cur.close()
            conn.close()
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': True}),
                'isBase64Encoded': False
            }
        
        # POST - создать FAQ
        if method == 'POST' and not action:
            body = json.loads(event.get('body', '{}'))
            
            target = body.get('target_type', 'school')
            category = body.get('category', '')
            question = body.get('question', '')
            answer = body.get('answer', '')
            
            if not question or not answer:
                cur.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Требуются поля question и answer'}),
                    'isBase64Encoded': False
                }
            
            # Получаем максимальный order_index
            cur.execute(f"""
                SELECT COALESCE(MAX(order_index), 0) + 1
                FROM {schema}.knowledge_base
                WHERE target_type = '{target}'
            """)
            order_index = cur.fetchone()[0]
            
            cur.execute(f"""
                INSERT INTO {schema}.knowledge_base (target_type, category, question, answer, order_index)
                VALUES ('{target}', '{category.replace("'", "''")}', '{question.replace("'", "''")}', 
                        '{answer.replace("'", "''")}', {order_index})
                RETURNING id
            """)
            
            new_id = cur.fetchone()[0]
            
            cur.close()
            conn.close()
            return {
                'statusCode': 201,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'id': new_id, 'success': True}),
                'isBase64Encoded': False
            }
        
        # PUT - обновить FAQ
        if method == 'PUT' and faq_id:
            body = json.loads(event.get('body', '{}'))
            
            category = body.get('category', '')
            question = body.get('question', '')
            answer = body.get('answer', '')
            
            if not question or not answer:
                cur.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Требуются поля question и answer'}),
                    'isBase64Encoded': False
                }
            
            cur.execute(f"""
                UPDATE {schema}.knowledge_base
                SET category = '{category.replace("'", "''")}',
                    question = '{question.replace("'", "''")}',
                    answer = '{answer.replace("'", "''")}'
                WHERE id = {faq_id}
            """)
            
            cur.close()
            conn.close()
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': True}),
                'isBase64Encoded': False
            }
        
        # DELETE - удалить FAQ
        if method == 'DELETE' and faq_id:
            cur.execute(f"DELETE FROM {schema}.knowledge_base WHERE id = {faq_id}")
            
            cur.close()
            conn.close()
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': True}),
                'isBase64Encoded': False
            }
        
        cur.close()
        conn.close()
        return {
            'statusCode': 404,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Endpoint not found'}),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        import traceback
        error_details = traceback.format_exc()
        print(f"ERROR: {error_details}")
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e), 'details': error_details}),
            'isBase64Encoded': False
        }