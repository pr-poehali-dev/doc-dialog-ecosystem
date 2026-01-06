import json
import os
import jwt
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime

def handler(event: dict, context) -> dict:
    '''API для обмена сообщениями между пользователями'''
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Authorization, Authorization',
                'Access-Control-Allow-Credentials': 'true'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    query_params = event.get('queryStringParameters') or {}
    action = query_params.get('action', '')
    
    token = event.get('headers', {}).get('X-Authorization', '').replace('Bearer ', '')
    
    if not token:
        return error_response('Требуется авторизация', 401)
    
    try:
        user_data = verify_token(token)
        
        if method == 'GET':
            if action == 'get-chats':
                return get_user_chats(user_data['user_id'], user_data.get('role', 'client'))
            elif action == 'get-messages':
                other_user_id = query_params.get('chat_id')
                if not other_user_id:
                    return error_response('Не указан chat_id', 400)
                return get_chat_messages(user_data['user_id'], int(other_user_id))
        
        if method == 'POST':
            body = json.loads(event.get('body', '{}'))
            
            if action == 'send-message':
                return send_message(user_data['user_id'], body)
        
        return error_response('Действие не поддерживается', 405)
    
    except jwt.ExpiredSignatureError:
        return error_response('Токен истёк', 401)
    except jwt.InvalidTokenError:
        return error_response('Неверный токен', 401)
    except Exception as e:
        print(f"ERROR: {str(e)}")
        import traceback
        traceback.print_exc()
        return error_response(str(e), 500)


def error_response(message: str, status: int = 400) -> dict:
    return {
        'statusCode': status,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': message}),
        'isBase64Encoded': False
    }


def success_response(data: dict, status: int = 200) -> dict:
    return {
        'statusCode': status,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps(data),
        'isBase64Encoded': False
    }


def get_db_connection():
    db_url = os.environ['DATABASE_URL']
    conn = psycopg2.connect(db_url)
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    return conn, cursor


def verify_token(token: str) -> dict:
    jwt_secret = os.environ['JWT_SECRET']
    payload = jwt.decode(token, jwt_secret, algorithms=['HS256'])
    return payload


def get_schema():
    return os.environ.get('MAIN_DB_SCHEMA', 'public')


def get_user_chats(user_id: int, user_role: str) -> dict:
    '''Получение списка чатов пользователя'''
    conn, cursor = get_db_connection()
    schema = get_schema()
    
    try:
        query = f"""
            WITH chat_partners AS (
                SELECT DISTINCT
                    CASE 
                        WHEN sender_id = %s THEN receiver_id
                        ELSE sender_id
                    END as partner_id
                FROM {schema}.messages
                WHERE sender_id = %s OR receiver_id = %s
            ),
            last_messages AS (
                SELECT DISTINCT ON (
                    CASE 
                        WHEN sender_id = %s THEN receiver_id
                        ELSE sender_id
                    END
                )
                    CASE 
                        WHEN sender_id = %s THEN receiver_id
                        ELSE sender_id
                    END as partner_id,
                    message_text,
                    created_at,
                    sender_id != %s as is_unread
                FROM {schema}.messages
                WHERE sender_id = %s OR receiver_id = %s
                ORDER BY 
                    CASE 
                        WHEN sender_id = %s THEN receiver_id
                        ELSE sender_id
                    END,
                    created_at DESC
            )
            SELECT
                cp.partner_id as other_user_id,
                COALESCE(
                    mp.full_name,
                    CONCAT('Пользователь #', cp.partner_id)
                ) as name,
                mp.avatar_url as avatar,
                CASE 
                    WHEN mp.id IS NOT NULL THEN 'masseur'
                    ELSE 'client'
                END as role,
                lm.message_text as last_message,
                lm.created_at as last_message_time,
                (
                    SELECT COUNT(*)
                    FROM {schema}.messages m
                    WHERE m.sender_id = cp.partner_id 
                      AND m.receiver_id = %s
                      AND m.is_read = FALSE
                ) as unread_count
            FROM chat_partners cp
            LEFT JOIN {schema}.masseur_profiles mp ON cp.partner_id = mp.user_id
            LEFT JOIN last_messages lm ON cp.partner_id = lm.partner_id
            ORDER BY lm.created_at DESC NULLS LAST
        """
        
        cursor.execute(query, (
            user_id, user_id, user_id,  
            user_id, user_id, user_id,  
            user_id, user_id, user_id,  
            user_id  
        ))
        
        chats = cursor.fetchall()
        
        result = []
        for chat in chats:
            result.append({
                'other_user_id': chat['other_user_id'],
                'name': chat['name'],
                'avatar': chat['avatar'],
                'role': chat['role'],
                'last_message': chat['last_message'],
                'last_message_time': chat['last_message_time'].isoformat() if chat['last_message_time'] else None,
                'unread_count': chat['unread_count']
            })
        
        return success_response({'chats': result})
        
    except Exception as e:
        print(f"ERROR in get_user_chats: {str(e)}")
        import traceback
        traceback.print_exc()
        return error_response(f"Ошибка получения чатов: {str(e)}", 500)
    finally:
        cursor.close()
        conn.close()


def get_chat_messages(user_id: int, other_user_id: int) -> dict:
    '''Получение сообщений конкретного чата'''
    conn, cursor = get_db_connection()
    schema = get_schema()
    
    try:
        query = f"""
            SELECT
                id,
                sender_id,
                receiver_id,
                message_text,
                created_at,
                is_read
            FROM {schema}.messages
            WHERE (sender_id = %s AND receiver_id = %s)
               OR (sender_id = %s AND receiver_id = %s)
            ORDER BY created_at ASC
        """
        
        cursor.execute(query, (user_id, other_user_id, other_user_id, user_id))
        messages = cursor.fetchall()
        
        update_query = f"""
            UPDATE {schema}.messages
            SET is_read = TRUE
            WHERE sender_id = %s AND receiver_id = %s AND is_read = FALSE
        """
        cursor.execute(update_query, (other_user_id, user_id))
        conn.commit()
        
        result = []
        for msg in messages:
            result.append({
                'id': msg['id'],
                'sender_id': msg['sender_id'],
                'receiver_id': msg['receiver_id'],
                'message_text': msg['message_text'],
                'created_at': msg['created_at'].isoformat(),
                'is_read': msg['is_read']
            })
        
        return success_response({'messages': result})
        
    except Exception as e:
        print(f"ERROR in get_chat_messages: {str(e)}")
        import traceback
        traceback.print_exc()
        return error_response(f"Ошибка получения сообщений: {str(e)}", 500)
    finally:
        cursor.close()
        conn.close()


def send_message(user_id: int, body: dict) -> dict:
    '''Отправка нового сообщения'''
    conn, cursor = get_db_connection()
    schema = get_schema()
    
    try:
        receiver_id = body.get('receiver_id')
        message_text = body.get('message_text', '').strip()
        
        if not receiver_id:
            return error_response('Не указан получатель', 400)
        
        if not message_text:
            return error_response('Сообщение не может быть пустым', 400)
        
        query = f"""
            INSERT INTO {schema}.messages (sender_id, receiver_id, message_text, created_at, is_read)
            VALUES (%s, %s, %s, NOW(), FALSE)
            RETURNING id, sender_id, receiver_id, message_text, created_at, is_read
        """
        
        cursor.execute(query, (user_id, receiver_id, message_text))
        conn.commit()
        
        message = cursor.fetchone()
        
        return success_response({
            'message': {
                'id': message['id'],
                'sender_id': message['sender_id'],
                'receiver_id': message['receiver_id'],
                'message_text': message['message_text'],
                'created_at': message['created_at'].isoformat(),
                'is_read': message['is_read']
            }
        })
        
    except Exception as e:
        print(f"ERROR in send_message: {str(e)}")
        import traceback
        traceback.print_exc()
        conn.rollback()
        return error_response(f"Ошибка отправки сообщения: {str(e)}", 500)
    finally:
        cursor.close()
        conn.close()
