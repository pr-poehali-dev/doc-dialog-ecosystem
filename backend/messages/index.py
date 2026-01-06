import json
import os
import jwt
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime

def handler(event: dict, context) -> dict:
    '''API для чата между клиентами и специалистами'''
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Authorization, X-Cookie, Authorization',
                'Access-Control-Allow-Credentials': 'true'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    query_params = event.get('queryStringParameters') or {}
    action = query_params.get('action', '')
    
    token = event.get('headers', {}).get('X-Authorization', '').replace('Bearer ', '')
    
    if not token:
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Требуется авторизация'}),
            'isBase64Encoded': False
        }
    
    try:
        user_data = verify_token(token)
        
        if method == 'GET':
            if action == 'get-chats':
                return get_user_chats(user_data['user_id'], user_data['role'])
            elif action == 'get-messages':
                chat_id = query_params.get('chat_id')
                return get_chat_messages(user_data['user_id'], chat_id)
        
        if method == 'POST':
            body = json.loads(event.get('body', '{}'))
            
            if action == 'send-message':
                return send_message(user_data['user_id'], body)
            elif action == 'send-booking-request':
                return send_booking_request(user_data['user_id'], body)
            elif action == 'respond-booking':
                return respond_to_booking(user_data['user_id'], body)
        
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Метод не поддерживается'}),
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
    except Exception as e:
        print(f"ERROR in handler: {str(e)}")
        import traceback
        traceback.print_exc()
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
    
    if schema and schema != 'public':
        escaped_schema = schema.replace('"', '""')
        conn = psycopg2.connect(db_url, options=f'-c search_path="{escaped_schema}"')
    else:
        conn = psycopg2.connect(db_url)
    
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    return conn, cursor


def verify_token(token: str) -> dict:
    '''Проверка JWT токена'''
    jwt_secret = os.environ['JWT_SECRET']
    payload = jwt.decode(token, jwt_secret, algorithms=['HS256'])
    return payload


def get_user_chats(user_id: int, user_role: str) -> dict:
    '''Получение списка чатов пользователя'''
    conn, cursor = get_db_connection()
    
    try:
        if user_role == 'client':
            cursor.execute("""
                SELECT DISTINCT
                    a.masseur_id as other_user_id,
                    mp.full_name as name,
                    mp.avatar_url as avatar,
                    'masseur' as role,
                    a.id as booking_id,
                    mv.verified as verified,
                    (
                        SELECT m.message_text 
                        FROM messages m 
                        WHERE (m.sender_id = %s AND m.receiver_id = a.masseur_id) 
                           OR (m.sender_id = a.masseur_id AND m.receiver_id = %s)
                        ORDER BY m.created_at DESC 
                        LIMIT 1
                    ) as last_message,
                    (
                        SELECT m.created_at 
                        FROM messages m 
                        WHERE (m.sender_id = %s AND m.receiver_id = a.masseur_id) 
                           OR (m.sender_id = a.masseur_id AND m.receiver_id = %s)
                        ORDER BY m.created_at DESC 
                        LIMIT 1
                    ) as last_message_time,
                    (
                        SELECT COUNT(*) 
                        FROM messages m 
                        WHERE m.sender_id = a.masseur_id 
                          AND m.receiver_id = %s 
                          AND m.is_read = FALSE
                    ) as unread_count
                FROM appointments a
                LEFT JOIN masseur_profiles mp ON a.masseur_id = mp.user_id
                LEFT JOIN masseur_verifications mv ON mp.id = mv.masseur_profile_id
                WHERE a.client_id = %s
                ORDER BY last_message_time DESC NULLS LAST
            """, (user_id, user_id, user_id, user_id, user_id, user_id))
        else:
            cursor.execute("""
                SELECT DISTINCT
                    a.client_id as other_user_id,
                    cp.full_name as name,
                    cp.avatar_url as avatar,
                    'client' as role,
                    a.id as booking_id,
                    FALSE as verified,
                    (
                        SELECT m.message_text 
                        FROM messages m 
                        WHERE (m.sender_id = %s AND m.receiver_id = a.client_id) 
                           OR (m.sender_id = a.client_id AND m.receiver_id = %s)
                        ORDER BY m.created_at DESC 
                        LIMIT 1
                    ) as last_message,
                    (
                        SELECT m.created_at 
                        FROM messages m 
                        WHERE (m.sender_id = %s AND m.receiver_id = a.client_id) 
                           OR (m.sender_id = a.client_id AND m.receiver_id = %s)
                        ORDER BY m.created_at DESC 
                        LIMIT 1
                    ) as last_message_time,
                    (
                        SELECT COUNT(*) 
                        FROM messages m 
                        WHERE m.sender_id = a.client_id 
                          AND m.receiver_id = %s 
                          AND m.is_read = FALSE
                    ) as unread_count
                FROM appointments a
                LEFT JOIN client_profiles cp ON a.client_id = cp.user_id
                WHERE a.masseur_id = %s
                ORDER BY last_message_time DESC NULLS LAST
            """, (user_id, user_id, user_id, user_id, user_id, user_id))
        
        chats = cursor.fetchall()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'chats': [dict(c) for c in chats]
            }, default=str),
            'isBase64Encoded': False
        }
    
    finally:
        cursor.close()
        conn.close()


def get_chat_messages(user_id: int, other_user_id: str) -> dict:
    '''Получение сообщений в чате'''
    if not other_user_id:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Укажите ID собеседника'}),
            'isBase64Encoded': False
        }
    
    conn, cursor = get_db_connection()
    
    try:
        cursor.execute("""
            SELECT 
                id,
                sender_id,
                receiver_id,
                message_text,
                is_read,
                created_at
            FROM messages
            WHERE (sender_id = %s AND receiver_id = %s) 
               OR (sender_id = %s AND receiver_id = %s)
            ORDER BY created_at ASC
        """, (user_id, int(other_user_id), int(other_user_id), user_id))
        
        messages = cursor.fetchall()
        
        cursor.execute("""
            UPDATE messages 
            SET is_read = TRUE 
            WHERE receiver_id = %s AND sender_id = %s AND is_read = FALSE
        """, (user_id, int(other_user_id)))
        
        conn.commit()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'messages': [dict(m) for m in messages]
            }, default=str),
            'isBase64Encoded': False
        }
    
    finally:
        cursor.close()
        conn.close()


def send_message(user_id: int, data: dict) -> dict:
    '''Отправка сообщения'''
    receiver_id = data.get('receiver_id')
    message_text = data.get('message')
    
    if not receiver_id or not message_text:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Укажите получателя и текст сообщения'}),
            'isBase64Encoded': False
        }
    
    conn, cursor = get_db_connection()
    
    try:
        cursor.execute("""
            INSERT INTO messages (sender_id, receiver_id, message_text, is_read)
            VALUES (%s, %s, %s, FALSE)
            RETURNING id, created_at
        """, (user_id, receiver_id, message_text))
        
        result = cursor.fetchone()
        conn.commit()
        
        return {
            'statusCode': 201,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'message_id': result['id'],
                'created_at': str(result['created_at'])
            }),
            'isBase64Encoded': False
        }
    
    finally:
        cursor.close()
        conn.close()


def send_booking_request(user_id: int, data: dict) -> dict:
    '''Отправка заявки на запись через чат'''
    masseur_id = data.get('masseur_id')
    
    if not masseur_id:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Укажите ID специалиста'}),
            'isBase64Encoded': False
        }
    
    conn, cursor = get_db_connection()
    
    try:
        cursor.execute("""
            SELECT full_name FROM client_profiles WHERE user_id = %s
        """, (user_id,))
        client = cursor.fetchone()
        client_name = client['full_name'] if client else 'Клиент'
        
        cursor.execute("""
            INSERT INTO messages (sender_id, receiver_id, message_text, is_read, message_type, booking_data)
            VALUES (%s, %s, %s, FALSE, 'booking_request', %s)
            RETURNING id, created_at
        """, (
            user_id, 
            masseur_id, 
            f'{client_name} хочет записаться на сеанс',
            json.dumps({'status': 'pending', 'client_id': user_id})
        ))
        
        result = cursor.fetchone()
        conn.commit()
        
        return {
            'statusCode': 201,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'message_id': result['id'],
                'created_at': str(result['created_at'])
            }),
            'isBase64Encoded': False
        }
    
    finally:
        cursor.close()
        conn.close()


def respond_to_booking(user_id: int, data: dict) -> dict:
    '''Ответ специалиста на заявку (принять/отклонить)'''
    message_id = data.get('message_id')
    action = data.get('action')
    
    if not message_id or action not in ['accept', 'decline']:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Укажите ID сообщения и действие (accept/decline)'}),
            'isBase64Encoded': False
        }
    
    conn, cursor = get_db_connection()
    
    try:
        cursor.execute("""
            SELECT sender_id, booking_data FROM messages WHERE id = %s AND receiver_id = %s
        """, (message_id, user_id))
        message = cursor.fetchone()
        
        if not message:
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Сообщение не найдено'}),
                'isBase64Encoded': False
            }
        
        booking_data = json.loads(message['booking_data'])
        booking_data['status'] = 'accepted' if action == 'accept' else 'declined'
        
        cursor.execute("""
            UPDATE messages 
            SET booking_data = %s
            WHERE id = %s
        """, (json.dumps(booking_data), message_id))
        
        cursor.execute("""
            SELECT full_name FROM masseur_profiles WHERE user_id = %s
        """, (user_id,))
        masseur = cursor.fetchone()
        masseur_name = masseur['full_name'] if masseur else 'Специалист'
        
        response_text = (
            f'{masseur_name} принял вашу заявку! Обсудите детали записи в чате.' 
            if action == 'accept' 
            else f'{masseur_name} не может принять заявку в данный момент.'
        )
        
        cursor.execute("""
            INSERT INTO messages (sender_id, receiver_id, message_text, is_read, message_type)
            VALUES (%s, %s, %s, FALSE, 'booking_response')
        """, (user_id, message['sender_id'], response_text))
        
        conn.commit()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'message': 'Ответ отправлен'}),
            'isBase64Encoded': False
        }
    
    finally:
        cursor.close()
        conn.close()