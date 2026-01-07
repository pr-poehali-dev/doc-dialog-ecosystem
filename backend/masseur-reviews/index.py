import json
import os
import jwt
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context) -> dict:
    '''API для управления отзывами массажистов'''
    
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
    
    try:
        if method == 'GET':
            if action == 'get-reviews':
                masseur_id = query_params.get('masseur_id')
                if not masseur_id:
                    return error_response('Не указан masseur_id', 400)
                return get_masseur_reviews(int(masseur_id))
            elif action == 'moderation':
                # Для модерации не требуется авторизация (уже проверена в админ-панели)
                return get_all_reviews_for_moderation()
        
        if method == 'POST':
            token = event.get('headers', {}).get('X-Authorization', '').replace('Bearer ', '')
            if not token:
                return error_response('Требуется авторизация', 401)
            
            user_data = verify_token(token)
            body = json.loads(event.get('body', '{}'))
            
            if action == 'submit-review':
                return submit_review(user_data['user_id'], body)
        
        if method == 'PUT':
            body = json.loads(event.get('body', '{}'))
            if action == 'moderate':
                return moderate_review(body)
        
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


def get_masseur_reviews(masseur_id: int) -> dict:
    '''Получение всех одобренных отзывов массажиста'''
    conn, cursor = get_db_connection()
    
    try:
        query = """
            SELECT 
                r.id,
                r.author_name,
                r.author_avatar,
                r.rating,
                r.comment,
                r.massage_type,
                r.created_at,
                r.is_verified
            FROM t_p46047379_doc_dialog_ecosystem.reviews r
            WHERE r.masseur_id = %s 
              AND r.moderation_status = 'approved'
            ORDER BY r.created_at DESC
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
                'is_verified': review['is_verified']
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


def submit_review(user_id: int, body: dict) -> dict:
    '''Отправка отзыва массажисту (доступно только клиентам)'''
    conn, cursor = get_db_connection()
    
    try:
        masseur_id = body.get('masseur_id')
        rating = body.get('rating')
        comment = body.get('comment', '').strip()
        massage_type = body.get('massage_type')
        
        if not masseur_id:
            return error_response('Не указан masseur_id', 400)
        
        if not rating or rating < 1 or rating > 5:
            return error_response('Рейтинг должен быть от 1 до 5', 400)
        
        if not comment:
            return error_response('Комментарий не может быть пустым', 400)
        
        # Получаем информацию о пользователе
        user_query = """
            SELECT u.email, u.role,
                   COALESCE(cp.full_name, mp.full_name, u.email) as full_name,
                   COALESCE(cp.avatar_url, mp.avatar_url) as avatar_url
            FROM t_p46047379_doc_dialog_ecosystem.users u
            LEFT JOIN t_p46047379_doc_dialog_ecosystem.client_profiles cp ON u.id = cp.user_id
            LEFT JOIN t_p46047379_doc_dialog_ecosystem.masseur_profiles mp ON u.id = mp.user_id
            WHERE u.id = %s
        """
        cursor.execute(user_query, (user_id,))
        user_info = cursor.fetchone()
        
        if not user_info:
            return error_response('Пользователь не найден', 404)
        
        # Проверяем роль пользователя - только клиенты могут оставлять отзывы
        if user_info['role'] in ('masseur', 'school'):
            return error_response('Только клиенты могут оставлять отзывы массажистам', 403)
        
        # Проверяем, не оставлял ли пользователь уже отзыв этому массажисту
        check_query = """
            SELECT id FROM t_p46047379_doc_dialog_ecosystem.reviews
            WHERE user_id = %s AND masseur_id = %s
        """
        cursor.execute(check_query, (user_id, masseur_id))
        existing_review = cursor.fetchone()
        
        if existing_review:
            return error_response('Вы уже оставили отзыв этому массажисту', 400)
        
        # Добавляем отзыв
        insert_query = """
            INSERT INTO t_p46047379_doc_dialog_ecosystem.reviews 
            (masseur_id, user_id, author_name, author_avatar, rating, comment, massage_type, created_at, moderation_status)
            VALUES (%s, %s, %s, %s, %s, %s, %s, NOW(), 'pending')
            RETURNING id, created_at
        """
        
        cursor.execute(insert_query, (
            masseur_id,
            user_id,
            user_info['full_name'],
            user_info['avatar_url'],
            rating,
            comment,
            massage_type
        ))
        
        result = cursor.fetchone()
        conn.commit()
        
        return success_response({
            'success': True,
            'review_id': result['id'],
            'message': 'Отзыв отправлен на модерацию и появится после проверки'
        })
        
    except Exception as e:
        print(f"ERROR in submit_review: {str(e)}")
        import traceback
        traceback.print_exc()
        conn.rollback()
        return error_response(f"Ошибка отправки отзыва: {str(e)}", 500)
    finally:
        cursor.close()
        conn.close()


def get_all_reviews_for_moderation() -> dict:
    '''Получение всех отзывов массажистов для модерации (для админ-панели)'''
    conn, cursor = get_db_connection()
    
    try:
        query = """
            SELECT 
                r.id,
                r.masseur_id,
                r.user_id,
                r.author_name,
                r.rating,
                r.comment,
                r.massage_type,
                r.moderation_status,
                r.created_at,
                mp.full_name as masseur_name,
                u.email as user_email
            FROM t_p46047379_doc_dialog_ecosystem.reviews r
            LEFT JOIN t_p46047379_doc_dialog_ecosystem.masseur_profiles mp ON r.masseur_id = mp.user_id
            LEFT JOIN t_p46047379_doc_dialog_ecosystem.users u ON r.user_id = u.id
            ORDER BY 
                CASE 
                    WHEN r.moderation_status = 'pending' THEN 0 
                    ELSE 1 
                END,
                r.created_at DESC
        """
        
        cursor.execute(query)
        reviews = cursor.fetchall()
        
        result = []
        for review in reviews:
            result.append({
                'id': review['id'],
                'masseur_id': review['masseur_id'],
                'masseur_name': review['masseur_name'],
                'user_id': review['user_id'],
                'user_email': review['user_email'],
                'author_name': review['author_name'],
                'rating': review['rating'],
                'comment': review['comment'],
                'massage_type': review['massage_type'],
                'status': review['moderation_status'],
                'created_at': review['created_at'].isoformat()
            })
        
        return success_response({'reviews': result})
        
    except Exception as e:
        print(f"ERROR in get_all_reviews_for_moderation: {str(e)}")
        import traceback
        traceback.print_exc()
        return error_response(f"Ошибка получения отзывов: {str(e)}", 500)
    finally:
        cursor.close()
        conn.close()


def moderate_review(body: dict) -> dict:
    '''Модерация отзыва (одобрение/отклонение)'''
    conn, cursor = get_db_connection()
    
    try:
        review_id = body.get('review_id')
        new_status = body.get('status')
        
        if not review_id:
            return error_response('Не указан review_id', 400)
        
        if new_status not in ('approved', 'rejected'):
            return error_response('Статус должен быть approved или rejected', 400)
        
        update_query = """
            UPDATE t_p46047379_doc_dialog_ecosystem.reviews
            SET moderation_status = %s
            WHERE id = %s
            RETURNING id, moderation_status
        """
        
        cursor.execute(update_query, (new_status, review_id))
        result = cursor.fetchone()
        
        if not result:
            return error_response('Отзыв не найден', 404)
        
        conn.commit()
        
        return success_response({
            'success': True,
            'review_id': result['id'],
            'status': result['moderation_status']
        })
        
    except Exception as e:
        print(f"ERROR in moderate_review: {str(e)}")
        import traceback
        traceback.print_exc()
        conn.rollback()
        return error_response(f"Ошибка модерации отзыва: {str(e)}", 500)
    finally:
        cursor.close()
        conn.close()