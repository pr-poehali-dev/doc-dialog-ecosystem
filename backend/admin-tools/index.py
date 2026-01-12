"""API для управления инструментами в админке"""
import json
import os
import jwt
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db():
    dsn = os.environ.get('DATABASE_URL')
    return psycopg2.connect(dsn)

def handler(event: dict, context) -> dict:
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Authorization'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    token = event.get('headers', {}).get('X-Authorization', '').replace('Bearer ', '')
    
    if not token:
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Требуется авторизация'}),
            'isBase64Encoded': False
        }
    
    conn = get_db()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        jwt_secret = os.environ.get('JWT_SECRET')
        if not jwt_secret:
            conn.close()
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'JWT_SECRET не настроен'}),
                'isBase64Encoded': False
            }
        
        payload = jwt.decode(token, jwt_secret, algorithms=['HS256'])
        user_id = payload.get('user_id')
        
        if not user_id:
            conn.close()
            return {
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Неверный токен'}),
                'isBase64Encoded': False
            }
        
        cur.execute("SELECT role FROM t_p46047379_doc_dialog_ecosystem.users WHERE id = %s", (user_id,))
        user = cur.fetchone()
        
        if not user or user['role'] != 'admin':
            return {
                'statusCode': 403,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Доступ запрещен'}),
                'isBase64Encoded': False
            }
        
        if method == 'GET':
            cur.execute("""
                SELECT id, name, description, url, video_url, icon, target_role, is_active, display_order, created_at
                FROM t_p46047379_doc_dialog_ecosystem.tools
                ORDER BY target_role, display_order, created_at DESC
            """)
            tools = cur.fetchall()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(tools, default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            data = json.loads(event.get('body', '{}'))
            
            # Генерируем name из URL если не указан
            tool_name = data.get('name', data['url'].split('//')[-1].split('/')[0][:255])
            
            cur.execute("""
                INSERT INTO t_p46047379_doc_dialog_ecosystem.tools 
                (name, description, url, video_url, target_role, is_active, display_order)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                RETURNING id, name, description, url, video_url, icon, target_role, is_active, display_order, created_at
            """, (
                tool_name,
                data['description'],
                data['url'],
                data.get('video_url'),
                data['target_role'],
                data.get('is_active', True),
                data.get('display_order', 0)
            ))
            
            tool = cur.fetchone()
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(tool, default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'PUT':
            data = json.loads(event.get('body', '{}'))
            tool_id = data.get('id')
            
            if not tool_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Требуется ID инструмента'}),
                    'isBase64Encoded': False
                }
            
            # Генерируем name из URL если не указан
            tool_name = data.get('name', data['url'].split('//')[-1].split('/')[0][:255])
            
            cur.execute("""
                UPDATE t_p46047379_doc_dialog_ecosystem.tools
                SET name = %s, description = %s, url = %s, video_url = %s,
                    target_role = %s, is_active = %s, display_order = %s,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = %s
                RETURNING id, name, description, url, video_url, icon, target_role, is_active, display_order, created_at
            """, (
                tool_name,
                data['description'],
                data['url'],
                data.get('video_url'),
                data['target_role'],
                data.get('is_active', True),
                data.get('display_order', 0),
                tool_id
            ))
            
            tool = cur.fetchone()
            conn.commit()
            
            if not tool:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Инструмент не найден'}),
                    'isBase64Encoded': False
                }
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(tool, default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'DELETE':
            params = event.get('queryStringParameters', {})
            tool_id = params.get('id')
            
            if not tool_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Требуется ID инструмента'}),
                    'isBase64Encoded': False
                }
            
            cur.execute("DELETE FROM t_p46047379_doc_dialog_ecosystem.tools WHERE id = %s", (tool_id,))
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': True}),
                'isBase64Encoded': False
            }
        
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Метод не поддерживается'}),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        conn.rollback()
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
    finally:
        cur.close()
        conn.close()