import json
import os
import jwt
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime
from moderation import check_content_moderation, get_warning_message

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
            elif action == 'get-violations':
                if user_data.get('role') != 'admin':
                    return error_response('Доступ запрещён', 403)
                return get_content_violations()
        
        if method == 'POST':
            body = json.loads(event.get('body', '{}'))
            
            if action == 'send-message':
                return send_message(user_data['user_id'], body)
            elif action == 'delete-chat':
                return delete_chat(user_data['user_id'], body)
        
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


def get_user_chats(user_id: int, user_role: str) -> dict:
    '''Получение списка чатов пользователя'''
    conn, cursor = get_db_connection()
    
    try:
        query = """
            WITH chat_partners AS (
                SELECT DISTINCT
                    CASE 
                        WHEN sender_id = %s THEN receiver_id
                        ELSE sender_id
                    END as partner_id
                FROM t_p46047379_doc_dialog_ecosystem.messages
                WHERE sender_id = %s OR receiver_id = %s
            )
            SELECT
                cp.partner_id as other_user_id,
                COALESCE(
                    mp.full_name, 
                    clp.full_name,
                    sp.school_name,
                    slp.name,
                    u.email
                ) as name,
                COALESCE(mp.avatar_url, clp.avatar_url, sp.logo_url) as avatar,
                u.role as role,
                (
                    SELECT m.message_text 
                    FROM t_p46047379_doc_dialog_ecosystem.messages m 
                    WHERE (m.sender_id = %s AND m.receiver_id = cp.partner_id) 
                       OR (m.sender_id = cp.partner_id AND m.receiver_id = %s)
                    ORDER BY m.created_at DESC 
                    LIMIT 1
                ) as last_message,
                (
                    SELECT m.created_at 
                    FROM t_p46047379_doc_dialog_ecosystem.messages m 
                    WHERE (m.sender_id = %s AND m.receiver_id = cp.partner_id) 
                       OR (m.sender_id = cp.partner_id AND m.receiver_id = %s)
                    ORDER BY m.created_at DESC 
                    LIMIT 1
                ) as last_message_time,
                (
                    SELECT COUNT(*)
                    FROM t_p46047379_doc_dialog_ecosystem.messages m
                    WHERE m.sender_id = cp.partner_id 
                      AND m.receiver_id = %s
                      AND m.is_read = FALSE
                ) as unread_count
            FROM chat_partners cp
            JOIN t_p46047379_doc_dialog_ecosystem.users u ON cp.partner_id = u.id
            LEFT JOIN t_p46047379_doc_dialog_ecosystem.masseur_profiles mp ON cp.partner_id = mp.user_id
            LEFT JOIN t_p46047379_doc_dialog_ecosystem.client_profiles clp ON cp.partner_id = clp.user_id
            LEFT JOIN t_p46047379_doc_dialog_ecosystem.school_profiles sp ON cp.partner_id = sp.user_id
            LEFT JOIN t_p46047379_doc_dialog_ecosystem.salon_profiles slp ON cp.partner_id = slp.user_id
            ORDER BY last_message_time DESC NULLS LAST
        """
        
        cursor.execute(query, (user_id, user_id, user_id, user_id, user_id, user_id, user_id, user_id))
        
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
    
    try:
        query = """
            SELECT
                id,
                sender_id,
                receiver_id,
                message_text,
                created_at,
                is_read
            FROM t_p46047379_doc_dialog_ecosystem.messages
            WHERE (sender_id = %s AND receiver_id = %s)
               OR (sender_id = %s AND receiver_id = %s)
            ORDER BY created_at ASC
        """
        
        cursor.execute(query, (user_id, other_user_id, other_user_id, user_id))
        messages = cursor.fetchall()
        
        update_query = """
            UPDATE t_p46047379_doc_dialog_ecosystem.messages
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
    
    try:
        receiver_id = body.get('receiver_id')
        message_text = body.get('message_text', '').strip()
        
        if not receiver_id:
            return error_response('Не указан получатель', 400)
        
        if not message_text:
            return error_response('Сообщение не может быть пустым', 400)
        
        # Проверка пользователя на блокировку
        check_user_query = """
            SELECT is_content_blocked, content_block_reason, content_violation_count
            FROM t_p46047379_doc_dialog_ecosystem.users
            WHERE id = %s
        """
        cursor.execute(check_user_query, (user_id,))
        user_status = cursor.fetchone()
        
        if user_status and user_status['is_content_blocked']:
            return error_response(
                f"❌ Ваш аккаунт заблокирован за нарушение правил.\nПричина: {user_status['content_block_reason']}\n\nСредства на балансе заморожены до решения модерации.",
                403
            )
        
        # Проверка контента на запрещённые темы
        is_blocked, category, matched_words = check_content_moderation(message_text)
        
        if is_blocked:
            # Записываем предупреждение
            warning_query = """
                INSERT INTO t_p46047379_doc_dialog_ecosystem.content_warnings 
                (user_id, violation_category, message_text, matched_patterns, created_at)
                VALUES (%s, %s, %s, %s, NOW())
            """
            cursor.execute(warning_query, (user_id, category, message_text, matched_words))
            
            # Обновляем счётчик нарушений
            update_violation_query = """
                UPDATE t_p46047379_doc_dialog_ecosystem.users
                SET content_violation_count = content_violation_count + 1
                WHERE id = %s
                RETURNING content_violation_count
            """
            cursor.execute(update_violation_query, (user_id,))
            violation_count = cursor.fetchone()['content_violation_count']
            
            # Если это второе нарушение - блокируем пользователя
            if violation_count >= 2:
                block_query = """
                    UPDATE t_p46047379_doc_dialog_ecosystem.users
                    SET is_content_blocked = TRUE,
                        content_block_reason = %s
                    WHERE id = %s
                """
                block_reason = f"Повторное нарушение правил: {category}"
                cursor.execute(block_query, (block_reason, user_id))
            
            conn.commit()
            
            warning_message = get_warning_message(category)
            
            return {
                'statusCode': 403,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'error': 'content_blocked',
                    'warning': warning_message,
                    'violation_count': violation_count,
                    'is_final_warning': violation_count >= 1
                }),
                'isBase64Encoded': False
            }
        
        # Сообщение прошло проверку - сохраняем
        query = """
            INSERT INTO t_p46047379_doc_dialog_ecosystem.messages (sender_id, receiver_id, message_text, created_at, is_read)
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


def delete_chat(user_id: int, body: dict) -> dict:
    '''Удаление переписки с пользователем'''
    conn, cursor = get_db_connection()
    
    try:
        other_user_id = body.get('other_user_id')
        
        if not other_user_id:
            return error_response('Не указан other_user_id', 400)
        
        query = """
            DELETE FROM t_p46047379_doc_dialog_ecosystem.messages
            WHERE (sender_id = %s AND receiver_id = %s)
               OR (sender_id = %s AND receiver_id = %s)
        """
        
        cursor.execute(query, (user_id, other_user_id, other_user_id, user_id))
        conn.commit()
        
        deleted_count = cursor.rowcount
        
        return success_response({
            'success': True,
            'deleted_messages': deleted_count
        })
        
    except Exception as e:
        print(f"ERROR in delete_chat: {str(e)}")
        import traceback
        traceback.print_exc()
        conn.rollback()
        return error_response(f"Ошибка удаления переписки: {str(e)}", 500)
    finally:
        cursor.close()
        conn.close()


def get_content_violations() -> dict:
    '''Получение списка всех нарушений контента (только для админов)'''
    conn, cursor = get_db_connection()
    
    try:
        query = """
            SELECT 
                cw.id,
                cw.user_id,
                u.email,
                u.role,
                u.is_content_blocked,
                u.content_violation_count,
                cw.violation_category,
                cw.message_text,
                cw.matched_patterns,
                cw.created_at,
                COALESCE(mp.full_name, cp.full_name, u.email) as user_name
            FROM t_p46047379_doc_dialog_ecosystem.content_warnings cw
            JOIN t_p46047379_doc_dialog_ecosystem.users u ON cw.user_id = u.id
            LEFT JOIN t_p46047379_doc_dialog_ecosystem.masseur_profiles mp ON u.id = mp.user_id
            LEFT JOIN t_p46047379_doc_dialog_ecosystem.client_profiles cp ON u.id = cp.user_id
            ORDER BY cw.created_at DESC
            LIMIT 100
        """
        
        cursor.execute(query)
        violations = cursor.fetchall()
        
        result = []
        for v in violations:
            result.append({
                'id': v['id'],
                'user_id': v['user_id'],
                'user_name': v['user_name'],
                'email': v['email'],
                'role': v['role'],
                'is_blocked': v['is_content_blocked'],
                'total_violations': v['content_violation_count'],
                'category': v['violation_category'],
                'message_text': v['message_text'],
                'matched_patterns': v['matched_patterns'],
                'created_at': v['created_at'].isoformat()
            })
        
        return success_response({'violations': result})
        
    except Exception as e:
        print(f"ERROR in get_content_violations: {str(e)}")
        import traceback
        traceback.print_exc()
        return error_response(f"Ошибка получения нарушений: {str(e)}", 500)
    finally:
        cursor.close()
        conn.close()