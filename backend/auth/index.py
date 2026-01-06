import json
import os
import jwt
import bcrypt
from datetime import datetime, timedelta
import psycopg2
from psycopg2.extras import RealDictCursor
import secrets
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def handler(event: dict, context) -> dict:
    '''API для регистрации и авторизации пользователей (массажисты, школы, салоны)'''
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Authorization'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    query_params = event.get('queryStringParameters') or {}
    action = query_params.get('action', '')
    
    try:
        if method == 'GET' and action == 'verify-email':
            token = query_params.get('token', '')
            return verify_email(token)
        
        if method == 'POST':
            body = json.loads(event.get('body', '{}'))
            
            if action == 'register':
                return register_user(body)
            elif action == 'login':
                return login_user(body)
            elif action == 'verify':
                token = event.get('headers', {}).get('X-Authorization', '').replace('Bearer ', '')
                return verify_token(token)
            elif action == 'resend-verification':
                return resend_verification_email(body)
        
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
    
    if role not in ['masseur', 'school', 'salon', 'client']:
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
            "INSERT INTO users (email, password_hash, role, email_verified) VALUES (%s, %s, %s, %s) RETURNING id",
            (email, password_hash, role, True)
        )
        user_id = cursor.fetchone()['id']
        
        if role == 'masseur' or role == 'client':
            cursor.execute(
                "INSERT INTO masseur_profiles (user_id, full_name, phone, city) VALUES (%s, %s, %s, %s)",
                (user_id, profile_data.get('full_name'), profile_data.get('phone'), profile_data.get('city'))
            )
        elif role == 'school':
            cursor.execute(
                "INSERT INTO schools (user_id, name, phone, email, city) VALUES (%s, %s, %s, %s, %s) RETURNING id",
                (user_id, profile_data.get('name'), profile_data.get('phone'), email, profile_data.get('city'))
            )
            school_id = cursor.fetchone()['id']
        elif role == 'salon':
            cursor.execute(
                "INSERT INTO salons (user_id, name, phone, email, city) VALUES (%s, %s, %s, %s, %s)",
                (user_id, profile_data.get('name'), profile_data.get('phone'), email, profile_data.get('city'))
            )
        
        conn.commit()
        
        token = generate_token(user_id, email, role)
        
        user_response = {
            'id': user_id,
            'email': email,
            'role': role
        }
        
        if role == 'school' and 'school_id' in locals():
            user_response['school_id'] = school_id
        
        return {
            'statusCode': 201,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'token': token,
                'user': user_response
            }),
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
        cursor.execute("SELECT id, password_hash, role, email_verified FROM users WHERE email = %s", (email,))
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
        
        user_response = {'id': user['id'], 'email': email, 'role': user['role']}
        
        # Добавляем school_id для школ
        if user['role'] == 'school':
            cursor.execute("SELECT id FROM schools WHERE user_id = %s", (user['id'],))
            school = cursor.fetchone()
            if school:
                user_response['school_id'] = school['id']
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'token': token, 'user': user_response}),
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


def send_verification_email(email: str, token: str):
    '''Отправка письма с подтверждением email'''
    try:
        smtp_config_str = os.environ.get('SMTP_CONFIG')
        if not smtp_config_str:
            print('[WARNING] SMTP_CONFIG not configured, skipping email send')
            return
        
        smtp_config = json.loads(smtp_config_str)
        
        verification_url = f"https://functions.poehali.dev/d6aba2e7-25ea-4ec5-affd-1cf4b6e37db3?action=verify-email&token={token}"
        
        msg = MIMEMultipart('alternative')
        msg['Subject'] = 'Подтверждение регистрации в Док диалог'
        msg['From'] = smtp_config['from']
        msg['To'] = email
        
        html = f"""
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #2563eb;">Добро пожаловать в Док диалог!</h2>
              <p>Спасибо за регистрацию. Для активации аккаунта подтвердите ваш email, нажав на кнопку ниже:</p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="{verification_url}" 
                   style="background-color: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  Подтвердить email
                </a>
              </div>
              <p style="color: #666; font-size: 14px;">Или скопируйте ссылку в браузер:</p>
              <p style="color: #666; font-size: 12px; word-break: break-all;">{verification_url}</p>
              <p style="color: #666; font-size: 14px; margin-top: 30px;">Ссылка действительна 24 часа.</p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
              <p style="color: #999; font-size: 12px;">Если вы не регистрировались на сайте Док диалог, проигнорируйте это письмо.</p>
            </div>
          </body>
        </html>
        """
        
        msg.attach(MIMEText(html, 'html'))
        
        server = smtplib.SMTP(smtp_config['host'], smtp_config['port'])
        server.starttls()
        server.login(smtp_config['user'], smtp_config['password'])
        server.send_message(msg)
        server.quit()
        
        print(f'[INFO] Verification email sent to {email}')
    
    except Exception as e:
        print(f'[ERROR] Failed to send verification email: {str(e)}')


def verify_email(token: str) -> dict:
    '''Подтверждение email по токену'''
    if not token:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'},
            'body': '<html><body><h1>Ошибка</h1><p>Токен не предоставлен</p></body></html>',
            'isBase64Encoded': False
        }
    
    conn, cursor = get_db_connection()
    
    try:
        cursor.execute(
            "SELECT id, email, role, email_verified, verification_token_expires FROM users WHERE verification_token = %s",
            (token,)
        )
        user = cursor.fetchone()
        
        if not user:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'},
                'body': '<html><body><h1>Ошибка</h1><p>Неверный токен подтверждения</p></body></html>',
                'isBase64Encoded': False
            }
        
        if user['email_verified']:
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'},
                'body': '<html><body><h1>Email уже подтверждён</h1><p>Вы можете <a href="https://doc-dialog-ecosystem.poehali.dev">войти в личный кабинет</a></p></body></html>',
                'isBase64Encoded': False
            }
        
        if user['verification_token_expires'] < datetime.utcnow():
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'},
                'body': '<html><body><h1>Ошибка</h1><p>Токен истёк. Запросите новое письмо для подтверждения.</p></body></html>',
                'isBase64Encoded': False
            }
        
        cursor.execute(
            "UPDATE users SET email_verified = TRUE, verification_token = NULL WHERE id = %s",
            (user['id'],)
        )
        conn.commit()
        
        auth_token = generate_token(user['id'], user['email'], user['role'])
        
        dashboard_url = 'https://doc-dialog-ecosystem.poehali.dev'
        redirect_html = f"""
        <html>
          <head>
            <script>
              localStorage.setItem('token', '{auth_token}');
              localStorage.setItem('userRole', '{user['role']}');
              setTimeout(function() {{
                window.location.href = '{dashboard_url}';
              }}, 2000);
            </script>
          </head>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
            <h1 style="color: #2563eb;">Email успешно подтверждён!</h1>
            <p>Перенаправляем вас в личный кабинет...</p>
            <p><a href="{dashboard_url}">Нажмите здесь</a>, если перенаправление не произошло автоматически.</p>
          </body>
        </html>
        """
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'},
            'body': redirect_html,
            'isBase64Encoded': False
        }
    
    finally:
        cursor.close()
        conn.close()


def resend_verification_email(data: dict) -> dict:
    '''Повторная отправка письма с подтверждением'''
    email = data.get('email')
    
    if not email:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Email обязателен'}),
            'isBase64Encoded': False
        }
    
    conn, cursor = get_db_connection()
    
    try:
        cursor.execute("SELECT id, email_verified FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()
        
        if not user:
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Пользователь не найден'}),
                'isBase64Encoded': False
            }
        
        if user['email_verified']:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Email уже подтверждён'}),
                'isBase64Encoded': False
            }
        
        new_token = secrets.token_urlsafe(32)
        new_expires = datetime.utcnow() + timedelta(hours=24)
        
        cursor.execute(
            "UPDATE users SET verification_token = %s, verification_token_expires = %s WHERE id = %s",
            (new_token, new_expires, user['id'])
        )
        conn.commit()
        
        send_verification_email(email, new_token)
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'message': 'Письмо с подтверждением отправлено'}),
            'isBase64Encoded': False
        }
    
    finally:
        cursor.close()
        conn.close()