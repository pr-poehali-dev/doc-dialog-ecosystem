import json
import os
import jwt
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime, timedelta
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
        
        # Rate limiting для GET запросов
        if method == 'GET':
            rate_limit_result = check_rate_limit(f"messages_get_{user_data['user_id']}", max_requests=40, window_seconds=60)
            if not rate_limit_result['allowed']:
                return {
                    'statusCode': 429,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Retry-After': str(rate_limit_result.get('retry_after', 60))
                    },
                    'body': json.dumps({'error': 'Слишком много запросов, попробуйте позже'}),
                    'isBase64Encoded': False
                }
            
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
            elif action == 'get-reviews':
                return get_masseur_reviews(user_data['user_id'], user_data.get('role', 'client'))
            elif action == 'get-masseur-orders':
                return get_masseur_orders(user_data['user_id'], user_data.get('role', 'client'))
            elif action == 'get-client-orders':
                return get_client_orders(user_data['user_id'])
        
        if method == 'POST':
            body = json.loads(event.get('body', '{}'))
            
            if action == 'send-message':
                return send_message(user_data['user_id'], body)
            elif action == 'delete-chat':
                return delete_chat(user_data['user_id'], body)
            elif action == 'reply-review':
                return reply_to_review(user_data['user_id'], user_data.get('role', 'client'), body)
            elif action == 'create-order':
                return create_service_order(user_data['user_id'], body)
            elif action == 'update-order-status':
                return update_order_status(user_data['user_id'], body)
        
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


def check_rate_limit(identifier: str, max_requests: int = 30, window_seconds: int = 60) -> dict:
    '''Проверка rate limit через PostgreSQL'''
    try:
        dsn = os.environ.get('DATABASE_URL')
        schema = 't_p46047379_doc_dialog_ecosystem'
        
        conn = psycopg2.connect(dsn)
        conn.autocommit = True
        cur = conn.cursor()
        
        # Создаём таблицу если не существует
        cur.execute(f"""
            CREATE TABLE IF NOT EXISTS {schema}.rate_limits (
                identifier VARCHAR(255) NOT NULL,
                request_time TIMESTAMP NOT NULL DEFAULT NOW(),
                PRIMARY KEY (identifier, request_time)
            )
        """)
        
        # Удаляем старые записи
        window_start = datetime.utcnow() - timedelta(seconds=window_seconds)
        cur.execute(f"""
            DELETE FROM {schema}.rate_limits 
            WHERE request_time < '{window_start.isoformat()}'::timestamp
        """)
        
        # Проверяем количество запросов
        identifier_escaped = identifier.replace("'", "''")
        cur.execute(f"""
            SELECT COUNT(*) FROM {schema}.rate_limits 
            WHERE identifier = '{identifier_escaped}' 
            AND request_time >= '{window_start.isoformat()}'::timestamp
        """)
        
        count = cur.fetchone()[0]
        
        if count >= max_requests:
            cur.close()
            conn.close()
            return {'allowed': False, 'retry_after': window_seconds, 'current_count': count}
        
        # Добавляем новую запись
        cur.execute(f"""
            INSERT INTO {schema}.rate_limits (identifier, request_time) 
            VALUES ('{identifier_escaped}', NOW())
        """)
        
        cur.close()
        conn.close()
        
        return {'allowed': True, 'remaining': max_requests - count - 1}
        
    except Exception as e:
        print(f"Rate limit check failed: {e}")
        return {'allowed': True}


def get_user_chats(user_id: int, user_role: str) -> dict:
    '''Получение списка чатов пользователя'''
    print(f"DEBUG: Getting chats for user_id={user_id}, role={user_role}")
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
                    sc.name,
                    sl.name,
                    u.email
                ) as name,
                COALESCE(mp.avatar_url, clp.avatar_url, sc.logo_url, sl.logo_url) as avatar,
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
            LEFT JOIN t_p46047379_doc_dialog_ecosystem.schools sc ON cp.partner_id = sc.user_id
            LEFT JOIN t_p46047379_doc_dialog_ecosystem.salons sl ON cp.partner_id = sl.user_id
            ORDER BY last_message_time DESC NULLS LAST
        """
        
        print(f"DEBUG: Executing query with user_id={user_id}")
        cursor.execute(query, (user_id, user_id, user_id, user_id, user_id, user_id, user_id, user_id))
        
        print("DEBUG: Query executed successfully")
        chats = cursor.fetchall()
        print(f"DEBUG: Fetched {len(chats)} chats")
        
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
        
        # Для школ с активными тарифами добавляем виртуальный чат с админом
        if user_role == 'school':
            print(f"DEBUG: Checking admin chat for school user_id={user_id}")
            cursor.execute("""
                SELECT sp.name, sp.messages_limit_per_day
                FROM t_p46047379_doc_dialog_ecosystem.schools s
                LEFT JOIN t_p46047379_doc_dialog_ecosystem.school_subscriptions ss ON s.id = ss.school_id AND ss.is_active = true
                LEFT JOIN t_p46047379_doc_dialog_ecosystem.subscription_plans sp ON ss.plan_id = sp.id
                WHERE s.user_id = %s
            """, (user_id,))
            
            subscription_data = cursor.fetchone()
            print(f"DEBUG: Subscription data: {subscription_data}")
            
            # Показываем чат админа для школ с тарифами, где доступны сообщения (не 0)
            if subscription_data and (subscription_data['messages_limit_per_day'] is None or subscription_data['messages_limit_per_day'] > 0):
                print(f"DEBUG: Subscription check passed, limit={subscription_data['messages_limit_per_day']}")
                # Проверяем, нет ли уже чата с админом
                admin_user_id = 2  # ID админа из базы
                has_admin_chat = any(chat['other_user_id'] == admin_user_id for chat in result)
                print(f"DEBUG: Has admin chat already: {has_admin_chat}")
                
                if not has_admin_chat:
                    plan_name = subscription_data['name']
                    print(f"DEBUG: Adding virtual admin chat for plan '{plan_name}'")
                    # Добавляем виртуальный чат с админом
                    result.insert(0, {
                        'other_user_id': admin_user_id,
                        'name': f'👨‍💼 Поддержка (Тариф {plan_name})',
                        'avatar': None,
                        'role': 'admin',
                        'last_message': 'Здравствуйте! Я ваш персональный менеджер. Готов ответить на вопросы по тарифу 🚀',
                        'last_message_time': datetime.now().isoformat(),
                        'unread_count': 0
                    })
                    print(f"DEBUG: Admin chat added to result")
            else:
                print(f"DEBUG: Subscription check failed or no messages available")
        
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
            SELECT is_content_blocked, content_block_reason, content_violation_count, role
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
        
        # Проверка лимита сообщений для школ с ограниченным тарифом
        if user_status and user_status['role'] == 'school' and receiver_id == 2:  # 2 = admin_user_id
            # Проверяем тариф школы
            cursor.execute("""
                SELECT sp.name, sp.messages_limit_per_day
                FROM t_p46047379_doc_dialog_ecosystem.schools s
                LEFT JOIN t_p46047379_doc_dialog_ecosystem.school_subscriptions ss ON s.id = ss.school_id AND ss.is_active = true
                LEFT JOIN t_p46047379_doc_dialog_ecosystem.subscription_plans sp ON ss.plan_id = sp.id
                WHERE s.user_id = %s
            """, (user_id,))
            
            subscription_data = cursor.fetchone()
            # Проверяем лимит только если он установлен (не NULL и > 0)
            if subscription_data and subscription_data['messages_limit_per_day'] is not None and subscription_data['messages_limit_per_day'] > 0:
                limit = subscription_data['messages_limit_per_day']
                
                # Считаем сообщения за сегодня
                cursor.execute("""
                    SELECT COUNT(*) as messages_today
                    FROM t_p46047379_doc_dialog_ecosystem.messages
                    WHERE sender_id = %s 
                      AND receiver_id = %s
                      AND created_at >= CURRENT_DATE
                """, (user_id, receiver_id))
                
                messages_count = cursor.fetchone()['messages_today']
                
                if messages_count >= limit:
                    return error_response(
                        f'❌ Достигнут дневной лимит сообщений администратору ({limit} в сутки по тарифу "{subscription_data["name"]}"). Попробуйте завтра или обновите тариф до "Безлимит" для неограниченного общения.',
                        429
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
        message = cursor.fetchone()
        
        # Получаем данные для email-уведомления ДО коммита
        cursor.execute("""
            SELECT u.email, u.first_name, u.last_name,
                   COALESCE(mp.full_name, cp.full_name, s.school_name, sl.name) as display_name
            FROM t_p46047379_doc_dialog_ecosystem.users u
            LEFT JOIN t_p46047379_doc_dialog_ecosystem.masseur_profiles mp ON u.id = mp.user_id
            LEFT JOIN t_p46047379_doc_dialog_ecosystem.client_profiles cp ON u.id = cp.user_id
            LEFT JOIN t_p46047379_doc_dialog_ecosystem.schools s ON u.id = s.user_id
            LEFT JOIN t_p46047379_doc_dialog_ecosystem.salons sl ON u.id = sl.user_id
            WHERE u.id = %s
        """, (receiver_id,))
        receiver_data = cursor.fetchone()
        
        cursor.execute("""
            SELECT u.first_name, u.last_name,
                   COALESCE(mp.full_name, cp.full_name, s.school_name, sl.name) as display_name
            FROM t_p46047379_doc_dialog_ecosystem.users u
            LEFT JOIN t_p46047379_doc_dialog_ecosystem.masseur_profiles mp ON u.id = mp.user_id
            LEFT JOIN t_p46047379_doc_dialog_ecosystem.client_profiles cp ON u.id = cp.user_id
            LEFT JOIN t_p46047379_doc_dialog_ecosystem.schools s ON u.id = s.user_id
            LEFT JOIN t_p46047379_doc_dialog_ecosystem.salons sl ON u.id = sl.user_id
            WHERE u.id = %s
        """, (user_id,))
        sender_data = cursor.fetchone()
        
        conn.commit()
        
        # Отправляем email-уведомление получателю после коммита
        try:
            if receiver_data and receiver_data['email']:
                receiver_email = receiver_data['email']
                receiver_name = f"{receiver_data['first_name'] or ''} {receiver_data['last_name'] or ''}".strip()
                if not receiver_name and receiver_data['display_name']:
                    receiver_name = receiver_data['display_name']
                if not receiver_name:
                    receiver_name = 'Пользователь'
                
                sender_name = 'Пользователь'
                if sender_data:
                    if sender_data['display_name']:
                        sender_name = sender_data['display_name']
                    else:
                        sender_name = f"{sender_data['first_name'] or ''} {sender_data['last_name'] or ''}".strip() or 'Пользователь'
                
                message_preview = message_text[:100] + '...' if len(message_text) > 100 else message_text
                
                send_email_notification_async(receiver_email, receiver_name, sender_name, message_preview)
        except Exception as e:
            print(f"WARNING: Failed to send email notification: {str(e)}")
            # Не прерываем выполнение, если email не отправился
        
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


def get_masseur_reviews(user_id: int, role: str) -> dict:
    '''Получение отзывов массажиста'''
    conn, cursor = get_db_connection()
    
    try:
        if role != 'masseur':
            return error_response('Доступ запрещён', 403)
        
        # Получаем masseur_id по user_id
        cursor.execute("""
            SELECT id FROM t_p46047379_doc_dialog_ecosystem.masseur_profiles
            WHERE user_id = %s
        """, (user_id,))
        
        masseur = cursor.fetchone()
        if not masseur:
            return error_response('Профиль массажиста не найден', 404)
        
        masseur_id = masseur['id']
        
        # Получаем все одобренные отзывы
        query = """
            SELECT 
                id,
                author_name,
                author_avatar,
                rating,
                comment,
                massage_type,
                created_at,
                masseur_reply,
                masseur_reply_at,
                moderation_status
            FROM t_p46047379_doc_dialog_ecosystem.reviews
            WHERE masseur_id = %s AND moderation_status = 'approved'
            ORDER BY created_at DESC
        """
        
        cursor.execute(query, (masseur_id,))
        reviews = cursor.fetchall()
        
        result = []
        for review in reviews:
            result.append({
                'id': review['id'],
                'author_name': review['author_name'],
                'author_avatar': review['author_avatar'],
                'rating': review['rating'],
                'comment': review['comment'],
                'massage_type': review['massage_type'],
                'created_at': review['created_at'].isoformat(),
                'masseur_reply': review['masseur_reply'],
                'masseur_reply_at': review['masseur_reply_at'].isoformat() if review['masseur_reply_at'] else None,
                'moderation_status': review['moderation_status']
            })
        
        return success_response({'reviews': result})
        
    except Exception as e:
        print(f"ERROR in get_masseur_reviews: {str(e)}")
        import traceback
        traceback.print_exc()
        return error_response(f"Ошибка получения отзывов: {str(e)}", 500)
    finally:
        cursor.close()
        conn.close()


def create_service_order(user_id: int, body: dict) -> dict:
    '''Создание заказа услуги'''
    conn, cursor = get_db_connection()
    
    try:
        # Проверка роли пользователя - только клиенты могут заказывать услуги
        cursor.execute("""
            SELECT role FROM t_p46047379_doc_dialog_ecosystem.users
            WHERE id = %s
        """, (user_id,))
        
        user = cursor.fetchone()
        if user and user['role'] in ['salon', 'masseur', 'school']:
            return error_response('Заказывать услуги могут только клиенты', 403)
        
        masseur_id = body.get('masseur_id')
        service_name = body.get('service_name')
        service_description = body.get('service_description')
        duration = body.get('duration')
        price = body.get('price')
        message = body.get('message')
        
        if not masseur_id or not service_name:
            return error_response('Не указаны обязательные параметры', 400)
        
        query = """
            INSERT INTO t_p46047379_doc_dialog_ecosystem.service_orders 
            (client_id, masseur_id, service_name, service_description, duration, price, message, created_at, status)
            VALUES (%s, %s, %s, %s, %s, %s, %s, NOW(), 'pending')
            RETURNING id
        """
        
        cursor.execute(query, (user_id, masseur_id, service_name, service_description, duration, price, message))
        conn.commit()
        
        order = cursor.fetchone()
        
        return success_response({'order_id': order['id'], 'status': 'created'})
        
    except Exception as e:
        print(f"ERROR in create_service_order: {str(e)}")
        import traceback
        traceback.print_exc()
        return error_response(f"Ошибка создания заказа: {str(e)}", 500)
    finally:
        cursor.close()
        conn.close()


def get_masseur_orders(user_id: int, role: str) -> dict:
    '''Получение заказов для массажиста'''
    if role != 'masseur':
        return error_response('Доступ запрещён', 403)
    
    conn, cursor = get_db_connection()
    
    try:
        cursor.execute("""
            SELECT id FROM t_p46047379_doc_dialog_ecosystem.masseur_profiles
            WHERE user_id = %s
        """, (user_id,))
        
        masseur = cursor.fetchone()
        if not masseur:
            return error_response('Профиль массажиста не найден', 404)
        
        masseur_id = masseur['id']
        
        query = """
            SELECT 
                o.id, o.client_id, o.service_name, o.service_description, 
                o.duration, o.price, o.status, o.message, o.created_at,
                COALESCE(cp.full_name, u.email) as client_name,
                cp.avatar_url as client_avatar
            FROM t_p46047379_doc_dialog_ecosystem.service_orders o
            JOIN t_p46047379_doc_dialog_ecosystem.users u ON o.client_id = u.id
            LEFT JOIN t_p46047379_doc_dialog_ecosystem.client_profiles cp ON o.client_id = cp.user_id
            WHERE o.masseur_id = %s
            ORDER BY 
                CASE o.status 
                    WHEN 'pending' THEN 1
                    WHEN 'accepted' THEN 2
                    ELSE 3
                END,
                o.created_at DESC
        """
        
        cursor.execute(query, (masseur_id,))
        orders = cursor.fetchall()
        
        result = []
        for order in orders:
            result.append({
                'id': order['id'],
                'client_id': order['client_id'],
                'client_name': order['client_name'],
                'client_avatar': order['client_avatar'],
                'service_name': order['service_name'],
                'service_description': order['service_description'],
                'duration': order['duration'],
                'price': order['price'],
                'status': order['status'],
                'message': order['message'],
                'created_at': order['created_at'].isoformat()
            })
        
        return success_response({'orders': result})
        
    except Exception as e:
        print(f"ERROR in get_masseur_orders: {str(e)}")
        import traceback
        traceback.print_exc()
        return error_response(f"Ошибка получения заказов: {str(e)}", 500)
    finally:
        cursor.close()
        conn.close()


def get_client_orders(user_id: int) -> dict:
    '''Получение заказов для клиента'''
    conn, cursor = get_db_connection()
    
    try:
        query = """
            SELECT 
                o.id, o.masseur_id, o.service_name, o.service_description, 
                o.duration, o.price, o.status, o.message, o.created_at,
                mp.full_name as masseur_name,
                mp.avatar_url as masseur_avatar,
                (SELECT COUNT(*) FROM t_p46047379_doc_dialog_ecosystem.reviews 
                 WHERE order_id = o.id) as has_review
            FROM t_p46047379_doc_dialog_ecosystem.service_orders o
            JOIN t_p46047379_doc_dialog_ecosystem.masseur_profiles mp ON o.masseur_id = mp.id
            WHERE o.client_id = %s
            ORDER BY o.created_at DESC
        """
        
        cursor.execute(query, (user_id,))
        orders = cursor.fetchall()
        
        result = []
        for order in orders:
            result.append({
                'id': order['id'],
                'masseur_id': order['masseur_id'],
                'masseur_name': order['masseur_name'],
                'masseur_avatar': order['masseur_avatar'],
                'service_name': order['service_name'],
                'service_description': order['service_description'],
                'duration': order['duration'],
                'price': order['price'],
                'status': order['status'],
                'message': order['message'],
                'created_at': order['created_at'].isoformat(),
                'has_review': order['has_review'] > 0
            })
        
        return success_response({'orders': result})
        
    except Exception as e:
        print(f"ERROR in get_client_orders: {str(e)}")
        import traceback
        traceback.print_exc()
        return error_response(f"Ошибка получения заказов: {str(e)}", 500)
    finally:
        cursor.close()
        conn.close()


def update_order_status(user_id: int, body: dict) -> dict:
    '''Обновление статуса заказа'''
    conn, cursor = get_db_connection()
    
    try:
        order_id = body.get('orderId')
        new_status = body.get('status')
        
        if not order_id or not new_status:
            return error_response('Не указаны обязательные параметры', 400)
        
        # Проверяем, массажист это или клиент
        cursor.execute("""
            SELECT id FROM t_p46047379_doc_dialog_ecosystem.masseur_profiles
            WHERE user_id = %s
        """, (user_id,))
        
        masseur = cursor.fetchone()
        
        if masseur:
            # Массажист может обновлять свои заказы
            masseur_id = masseur['id']
            query = """
                UPDATE t_p46047379_doc_dialog_ecosystem.service_orders
                SET status = %s, updated_at = NOW()
                WHERE id = %s AND masseur_id = %s
                RETURNING id
            """
            cursor.execute(query, (new_status, order_id, masseur_id))
        else:
            # Клиент может завершать свои заказы (для оставления отзыва)
            query = """
                UPDATE t_p46047379_doc_dialog_ecosystem.service_orders
                SET status = %s, updated_at = NOW()
                WHERE id = %s AND client_id = %s AND status = 'accepted'
                RETURNING id
            """
            cursor.execute(query, (new_status, order_id, user_id))
        
        conn.commit()
        
        updated = cursor.fetchone()
        if not updated:
            return error_response('Заказ не найден или недоступен для обновления', 404)
        
        return success_response({'status': 'updated'})
        
    except Exception as e:
        print(f"ERROR in update_order_status: {str(e)}")
        import traceback
        traceback.print_exc()
        return error_response(f"Ошибка обновления статуса: {str(e)}", 500)
    finally:
        cursor.close()
        conn.close()


def reply_to_review(user_id: int, role: str, body: dict) -> dict:
    '''Ответ массажиста на отзыв'''
    conn, cursor = get_db_connection()
    
    try:
        if role != 'masseur':
            return error_response('Доступ запрещён', 403)
        
        review_id = body.get('reviewId')
        reply = body.get('reply', '').strip()
        
        if not review_id:
            return error_response('Не указан reviewId', 400)
        
        if not reply:
            return error_response('Ответ не может быть пустым', 400)
        
        # Получаем masseur_id по user_id
        cursor.execute("""
            SELECT id FROM t_p46047379_doc_dialog_ecosystem.masseur_profiles
            WHERE user_id = %s
        """, (user_id,))
        
        masseur = cursor.fetchone()
        if not masseur:
            return error_response('Профиль массажиста не найден', 404)
        
        masseur_id = masseur['id']
        
        # Проверяем, что отзыв принадлежит этому массажисту
        cursor.execute("""
            SELECT id FROM t_p46047379_doc_dialog_ecosystem.reviews
            WHERE id = %s AND masseur_id = %s
        """, (review_id, masseur_id))
        
        review = cursor.fetchone()
        if not review:
            return error_response('Отзыв не найден', 404)
        
        # Обновляем отзыв с ответом
        update_query = """
            UPDATE t_p46047379_doc_dialog_ecosystem.reviews
            SET masseur_reply = %s, masseur_reply_at = NOW()
            WHERE id = %s
            RETURNING masseur_reply_at
        """
        
        cursor.execute(update_query, (reply, review_id))
        result = cursor.fetchone()
        conn.commit()
        
        return success_response({
            'success': True,
            'reply_at': result['masseur_reply_at'].isoformat()
        })
        
    except Exception as e:
        print(f"ERROR in reply_to_review: {str(e)}")
        import traceback
        traceback.print_exc()
        conn.rollback()
        return error_response(f"Ошибка добавления ответа: {str(e)}", 500)
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


def send_email_notification_async(receiver_email: str, receiver_name: str, sender_name: str, message_preview: str) -> None:
    '''Отправка email-уведомления о новом сообщении (асинхронно)'''
    import urllib.request
    
    try:
        # Отправляем email через email-sender функцию
        email_data = {
            'to': receiver_email,
            'subject': 'Новое сообщение в чате — Док диалог',
            'template': 'chat-notification',
            'data': {
                'receiver_name': receiver_name,
                'sender_name': sender_name,
                'message_preview': message_preview
            }
        }
        
        # Вызываем функцию email-sender
        email_sender_url = 'https://functions.poehali.dev/21920113-c479-4edd-9a41-cf0b8a08f47c'
        
        req = urllib.request.Request(
            email_sender_url,
            data=json.dumps(email_data).encode('utf-8'),
            headers={'Content-Type': 'application/json'},
            method='POST'
        )
        
        with urllib.request.urlopen(req, timeout=5) as response:
            if response.status == 200:
                print(f"Email notification sent to {receiver_email}")
            else:
                print(f"Failed to send email notification: status {response.status}")
                
    except Exception as e:
        print(f"Error sending email notification: {str(e)}")
        # Не прерываем выполнение