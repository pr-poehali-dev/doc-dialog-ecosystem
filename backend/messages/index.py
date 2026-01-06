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
    conn = psycopg2.connect(db_url)
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    return conn, cursor


def verify_token(token: str) -> dict:
    '''Проверка JWT токена'''
    jwt_secret = os.environ['JWT_SECRET']
    payload = jwt.decode(token, jwt_secret, algorithms=['HS256'])
    return payload


def get_user_chats(user_id: int, user_role: str) -> dict:
    '''Получение списка чатов пользователя на основе сообщений'''
    conn, cursor = get_db_connection()
    schema_name = os.environ.get('MAIN_DB_SCHEMA', 'public')
    
    try:
        if user_role == 'client':
            query = """
                WITH chat_users AS (
                    SELECT DISTINCT
                        CASE 
                            WHEN m.sender_id = %s THEN m.receiver_id
                            ELSE m.sender_id
                        END as other_user_id
                    FROM {schema}.messages m
                    WHERE m.sender_id = %s OR m.receiver_id = %s
                )
                SELECT
                    cu.other_user_id,
                    COALESCE(mp.full_name, 'Неизвестный') as name,
                    mp.avatar_url as avatar,
                    'masseur' as role,
                    COALESCE(a.id, 0) as booking_id,
                    COALESCE(mv.verified, FALSE) as verified,
                    (
                        SELECT m.message_text 
                        FROM {schema}.messages m 
                        WHERE (m.sender_id = %s AND m.receiver_id = cu.other_user_id) 
                           OR (m.sender_id = cu.other_user_id AND m.receiver_id = %s)
                        ORDER BY m.created_at DESC 
                        LIMIT 1
                    ) as last_message,
                    (
                        SELECT m.created_at 
                        FROM {schema}.messages m 
                        WHERE (m.sender_id = %s AND m.receiver_id = cu.other_user_id) 
                           OR (m.sender_id = cu.other_user_id AND m.receiver_id = %s)
                        ORDER BY m.created_at DESC 
                        LIMIT 1
                    ) as last_message_time,
                    (
                        SELECT COUNT(*) 
                        FROM {schema}.messages m 
                        WHERE m.sender_id = cu.other_user_id 
                          AND m.receiver_id = %s 
                          AND m.is_read = FALSE
                    ) as unread_count
                FROM chat_users cu
                LEFT JOIN {schema}.masseur_profiles mp ON cu.other_user_id = mp.user_id
                LEFT JOIN {schema}.masseur_verifications mv ON mp.id = mv.masseur_profile_id
                LEFT JOIN {schema}.appointments a ON (a.masseur_id = cu.other_user_id AND a.client_id = %s)
                ORDER BY last_message_time DESC
            """.format(schema=schema_name)
            
            cursor.execute(query, (user_id, user_id, user_id, user_id, user_id, user_id, user_id, user_id, user_id))
        else:
            query = """
                WITH chat_users AS (
                    SELECT DISTINCT
                        CASE 
                            WHEN m.sender_id = %s THEN m.receiver_id
                            ELSE m.sender_id
                        END as other_user_id
                    FROM {schema}.messages m
                    WHERE m.sender_id = %s OR m.receiver_id = %s
                )
                SELECT
                    cu.other_user_id,
                    COALESCE(cp.full_name, 'Неизвестный') as name,
                    cp.avatar_url as avatar,
                    'client' as role,
                    COALESCE(a.id, 0) as booking_id,
                    FALSE as verified,
                    (
                        SELECT m.message_text 
                        FROM {schema}.messages m 
                        WHERE (m.sender_id = %s AND m.receiver_id = cu.other_user_id) 
                           OR (m.sender_id = cu.other_user_id AND m.receiver_id = %s)
                        ORDER BY m.created_at DESC 
                        LIMIT 1
                    ) as last_message,
                    (
                        SELECT m.created_at 
                        FROM {schema}.messages m 
                        WHERE (m.sender_id = %s AND m.receiver_id = cu.other_user_id) 
                           OR (m.sender_id = cu.other_user_id AND m.receiver_id = %s)
                        ORDER BY m.created_at DESC 
                        LIMIT 1
                    ) as last_message_time,
                    (
                        SELECT COUNT(*) 
                        FROM {schema}.messages m 
                        WHERE m.sender_id = cu.other_user_id 
                          AND m.receiver_id = %s 
                          AND m.is_read = FALSE
                    ) as unread_count
                FROM chat_users cu
                LEFT JOIN {schema}.client_profiles cp ON cu.other_user_id = cp.user_id
                LEFT JOIN {schema}.appointments a ON (a.client_id = cu.other_user_id AND a.masseur_id = %s)
                ORDER BY last_message_time DESC
            """.format(schema=schema_name)
            
            cursor.execute(query, (user_id, user_id, user_id, user_id, user_id, user_id, user_id, user_id, user_id))
        
        chats = cursor.fetchall()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'chats': chats}, default=str),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        print(f"ERROR in get_user_chats: {str(e)}")
        import traceback
        traceback.print_exc()
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
    finally:
        cursor.close()
        conn.close()


def get_chat_messages(user_id: int, chat_id: str) -> dict:
    '''Получение сообщений конкретного чата'''
    conn, cursor = get_db_connection()
    schema_name = os.environ.get('MAIN_DB_SCHEMA', 'public')
    
    try:
        other_user_id = int(chat_id)
        
        query = """
            SELECT 
                m.id,
                m.sender_id,
                m.receiver_id,
                m.message_text,
                m.message_type,
                m.created_at,
                m.is_read,
                m.booking_request_data
            FROM {schema}.messages m
            WHERE (m.sender_id = %s AND m.receiver_id = %s) 
               OR (m.sender_id = %s AND m.receiver_id = %s)
            ORDER BY m.created_at ASC
        """.format(schema=schema_name)
        
        cursor.execute(query, (user_id, other_user_id, other_user_id, user_id))
        messages = cursor.fetchall()
        
        update_query = """
            UPDATE {schema}.messages 
            SET is_read = TRUE 
            WHERE receiver_id = %s AND sender_id = %s AND is_read = FALSE
        """.format(schema=schema_name)
        
        cursor.execute(update_query, (user_id, other_user_id))
        conn.commit()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'messages': messages}, default=str),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        print(f"ERROR in get_chat_messages: {str(e)}")
        import traceback
        traceback.print_exc()
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
    finally:
        cursor.close()
        conn.close()


def send_message(user_id: int, body: dict) -> dict:
    '''Отправка обычного сообщения'''
    conn, cursor = get_db_connection()
    schema_name = os.environ.get('MAIN_DB_SCHEMA', 'public')
    
    try:
        receiver_id = body.get('receiver_id')
        message_text = body.get('message_text')
        
        if not receiver_id or not message_text:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Не указан получатель или текст сообщения'}),
                'isBase64Encoded': False
            }
        
        query = """
            INSERT INTO {schema}.messages (sender_id, receiver_id, message_text, message_type, created_at, is_read)
            VALUES (%s, %s, %s, 'text', NOW(), FALSE)
            RETURNING id, sender_id, receiver_id, message_text, message_type, created_at, is_read
        """.format(schema=schema_name)
        
        cursor.execute(query, (user_id, receiver_id, message_text))
        message = cursor.fetchone()
        conn.commit()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'message': message}, default=str),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        print(f"ERROR in send_message: {str(e)}")
        import traceback
        traceback.print_exc()
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
    finally:
        cursor.close()
        conn.close()


def send_booking_request(user_id: int, body: dict) -> dict:
    '''Отправка запроса на бронирование'''
    conn, cursor = get_db_connection()
    schema_name = os.environ.get('MAIN_DB_SCHEMA', 'public')
    
    try:
        masseur_id = body.get('masseur_id')
        booking_data = body.get('booking_data', {})
        
        if not masseur_id:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Не указан массажист'}),
                'isBase64Encoded': False
            }
        
        message_text = f"Запрос на бронирование: {booking_data.get('service_name', 'Услуга')} на {booking_data.get('date', '')} в {booking_data.get('time', '')}"
        
        query = """
            INSERT INTO {schema}.messages (sender_id, receiver_id, message_text, message_type, booking_request_data, created_at, is_read)
            VALUES (%s, %s, %s, 'booking_request', %s, NOW(), FALSE)
            RETURNING id, sender_id, receiver_id, message_text, message_type, booking_request_data, created_at, is_read
        """.format(schema=schema_name)
        
        cursor.execute(query, (user_id, masseur_id, message_text, json.dumps(booking_data)))
        message = cursor.fetchone()
        conn.commit()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'message': message}, default=str),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        print(f"ERROR in send_booking_request: {str(e)}")
        import traceback
        traceback.print_exc()
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
    finally:
        cursor.close()
        conn.close()


def respond_to_booking(user_id: int, body: dict) -> dict:
    '''Ответ на запрос бронирования (принять/отклонить)'''
    conn, cursor = get_db_connection()
    schema_name = os.environ.get('MAIN_DB_SCHEMA', 'public')
    
    try:
        message_id = body.get('message_id')
        status = body.get('status')
        
        if not message_id or status not in ['accepted', 'declined']:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Неверные параметры'}),
                'isBase64Encoded': False
            }
        
        select_query = """
            SELECT sender_id, receiver_id, booking_request_data 
            FROM {schema}.messages 
            WHERE id = %s AND receiver_id = %s
        """.format(schema=schema_name)
        
        cursor.execute(select_query, (message_id, user_id))
        original_message = cursor.fetchone()
        
        if not original_message:
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Сообщение не найдено'}),
                'isBase64Encoded': False
            }
        
        client_id = original_message['sender_id']
        booking_data = original_message['booking_request_data']
        
        if status == 'accepted':
            insert_appointment_query = """
                INSERT INTO {schema}.appointments 
                (client_id, masseur_id, service_id, appointment_date, appointment_time, status, created_at)
                VALUES (%s, %s, %s, %s, %s, 'pending', NOW())
                RETURNING id
            """.format(schema=schema_name)
            
            cursor.execute(insert_appointment_query, (
                client_id, 
                user_id, 
                booking_data.get('service_id'),
                booking_data.get('date'),
                booking_data.get('time')
            ))
            
            appointment = cursor.fetchone()
            response_text = "Запрос на бронирование принят"
        else:
            response_text = "Запрос на бронирование отклонён"
        
        insert_message_query = """
            INSERT INTO {schema}.messages (sender_id, receiver_id, message_text, message_type, created_at, is_read)
            VALUES (%s, %s, %s, 'booking_response', NOW(), FALSE)
            RETURNING id, sender_id, receiver_id, message_text, message_type, created_at, is_read
        """.format(schema=schema_name)
        
        cursor.execute(insert_message_query, (user_id, client_id, response_text))
        response_message = cursor.fetchone()
        
        conn.commit()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'message': response_message}, default=str),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        print(f"ERROR in respond_to_booking: {str(e)}")
        import traceback
        traceback.print_exc()
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
    finally:
        cursor.close()
        conn.close()
