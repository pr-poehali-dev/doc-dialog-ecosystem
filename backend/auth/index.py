import json
import os
import jwt
import bcrypt
from datetime import datetime, timedelta
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context) -> dict:
    '''API для регистрации и авторизации пользователей (массажисты, школы, салоны)'''
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Authorization'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    query_params = event.get('queryStringParameters') or {}
    action = query_params.get('action', '')
    
    try:
        if method == 'POST':
            body = json.loads(event.get('body', '{}'))
            
            if action == 'register':
                return register_user(body)
            elif action == 'login':
                return login_user(body)
            elif action == 'verify':
                token = event.get('headers', {}).get('X-Authorization', '').replace('Bearer ', '')
                return verify_token(token)
        
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Метод не поддерживается'}),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }


def get_db_connection():
    '''Подключение к базе данных'''
    db_url = os.environ['DATABASE_URL']
    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
    
    # Устанавливаем search_path через параметр options в строке подключения
    if schema and schema != 'public':
        escaped_schema = schema.replace('"', '""')
        conn = psycopg2.connect(db_url, options=f'-c search_path="{escaped_schema}"')
    else:
        conn = psycopg2.connect(db_url)
    
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    return conn, cursor


def register_user(data: dict) -> dict:
    '''Регистрация нового пользователя'''
    email = data.get('email')
    password = data.get('password')
    role = data.get('role', 'masseur')
    profile_data = data.get('profile', {})
    
    if not email or not password:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Email и пароль обязательны'}),
            'isBase64Encoded': False
        }
    
    if role not in ['masseur', 'school', 'salon']:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Неверный тип пользователя'}),
            'isBase64Encoded': False
        }
    
    conn, cursor = get_db_connection()
    
    try:
        cursor.execute("SELECT id FROM users WHERE email = %s", (email,))
        if cursor.fetchone():
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Пользователь с таким email уже существует'}),
                'isBase64Encoded': False
            }
        
        password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        
        cursor.execute(
            "INSERT INTO users (email, password_hash, role) VALUES (%s, %s, %s) RETURNING id",
            (email, password_hash, role)
        )
        user_id = cursor.fetchone()['id']
        
        if role == 'masseur':
            cursor.execute(
                "INSERT INTO masseur_profiles (user_id, full_name, phone, city) VALUES (%s, %s, %s, %s)",
                (user_id, profile_data.get('full_name'), profile_data.get('phone'), profile_data.get('city'))
            )
        elif role == 'school':
            cursor.execute(
                "INSERT INTO schools (user_id, name, phone, email, city) VALUES (%s, %s, %s, %s, %s)",
                (user_id, profile_data.get('name'), profile_data.get('phone'), email, profile_data.get('city'))
            )
        elif role == 'salon':
            cursor.execute(
                "INSERT INTO salons (user_id, name, phone, email, city) VALUES (%s, %s, %s, %s, %s)",
                (user_id, profile_data.get('name'), profile_data.get('phone'), email, profile_data.get('city'))
            )
        
        conn.commit()
        
        token = generate_token(user_id, email, role)
        
        return {
            'statusCode': 201,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'token': token, 'user': {'id': user_id, 'email': email, 'role': role}}),
            'isBase64Encoded': False
        }
    
    finally:
        cursor.close()
        conn.close()


def login_user(data: dict) -> dict:
    '''Авторизация пользователя'''
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Email и пароль обязательны'}),
            'isBase64Encoded': False
        }
    
    conn, cursor = get_db_connection()
    
    try:
        cursor.execute("SELECT id, password_hash, role FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()
        
        if not user:
            return {
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Неверный email или пароль'}),
                'isBase64Encoded': False
            }
        
        if not bcrypt.checkpw(password.encode('utf-8'), user['password_hash'].encode('utf-8')):
            return {
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Неверный email или пароль'}),
                'isBase64Encoded': False
            }
        
        token = generate_token(user['id'], email, user['role'])
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'token': token, 'user': {'id': user['id'], 'email': email, 'role': user['role']}}),
            'isBase64Encoded': False
        }
    
    finally:
        cursor.close()
        conn.close()


def verify_token(token: str) -> dict:
    '''Проверка JWT токена'''
    if not token:
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Токен не предоставлен'}),
            'isBase64Encoded': False
        }
    
    try:
        jwt_secret = os.environ['JWT_SECRET']
        payload = jwt.decode(token, jwt_secret, algorithms=['HS256'])
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'user': payload}),
            'isBase64Encoded': False
        }
    
    except jwt.ExpiredSignatureError:
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Токен истёк'}),
            'isBase64Encoded': False
        }
    except jwt.InvalidTokenError:
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Неверный токен'}),
            'isBase64Encoded': False
        }


def generate_token(user_id: int, email: str, role: str) -> str:
    '''Генерация JWT токена'''
    jwt_secret = os.environ['JWT_SECRET']
    
    payload = {
        'user_id': user_id,
        'email': email,
        'role': role,
        'exp': datetime.utcnow() + timedelta(days=30)
    }
    
    return jwt.encode(payload, jwt_secret, algorithm='HS256')