import json
import os
import psycopg2
import jwt
import bcrypt

def handler(event: dict, context) -> dict:
    """
    API для смены пароля пользователя
    POST - сменить пароль (требует старый пароль и новый пароль)
    """
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Authorization',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    headers = event.get('headers', {})
    token = headers.get('X-Authorization', headers.get('x-authorization', '')).replace('Bearer ', '')
    
    if not token:
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Не авторизован'}),
            'isBase64Encoded': False
        }
    
    try:
        jwt_secret = os.environ['JWT_SECRET']
        payload = jwt.decode(token, jwt_secret, algorithms=['HS256'])
        user_id = payload.get('user_id')
        
        if not user_id:
            return {
                'statusCode': 403,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Недействительный токен'}),
                'isBase64Encoded': False
            }
    except (jwt.InvalidTokenError, jwt.DecodeError, jwt.ExpiredSignatureError):
        return {
            'statusCode': 403,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Недействительный токен'}),
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Метод не поддерживается'}),
            'isBase64Encoded': False
        }
    
    body = json.loads(event.get('body', '{}'))
    old_password = body.get('old_password', '')
    new_password = body.get('new_password', '')
    
    if not old_password or not new_password:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Необходимо указать старый и новый пароль'}),
            'isBase64Encoded': False
        }
    
    if len(new_password) < 6:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Новый пароль должен быть минимум 6 символов'}),
            'isBase64Encoded': False
        }
    
    dsn = os.environ['DATABASE_URL']
    schema = os.environ['MAIN_DB_SCHEMA']
    
    conn = psycopg2.connect(dsn)
    cur = conn.cursor()
    
    try:
        cur.execute(f"SELECT password_hash FROM {schema}.users WHERE id = {user_id}")
        result = cur.fetchone()
        
        if not result:
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Пользователь не найден'}),
                'isBase64Encoded': False
            }
        
        stored_hash = result[0]
        
        if not bcrypt.checkpw(old_password.encode('utf-8'), stored_hash.encode('utf-8')):
            return {
                'statusCode': 403,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Неверный старый пароль'}),
                'isBase64Encoded': False
            }
        
        new_hash = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        
        cur.execute(f"UPDATE {schema}.users SET password_hash = '{new_hash}' WHERE id = {user_id}")
        conn.commit()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'success': True, 'message': 'Пароль успешно изменён'}),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'Ошибка сервера: {str(e)}'}),
            'isBase64Encoded': False
        }
        
    finally:
        cur.close()
        conn.close()