import json
import os
import jwt
import psycopg2
from psycopg2.extras import RealDictCursor


def handler(event: dict, context) -> dict:
    '''API для управления избранными массажистами'''
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Authorization, Authorization'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    try:
        token = event.get('headers', {}).get('X-Authorization', '').replace('Bearer ', '')
        if not token:
            return error_response('Требуется авторизация', 401)
        
        user_data = verify_token(token)
        user_id = user_data['user_id']
        
        if method == 'GET':
            return get_favorites(user_id)
        
        if method == 'POST':
            body = json.loads(event.get('body', '{}'))
            masseur_id = body.get('masseur_id')
            if not masseur_id:
                return error_response('Не указан masseur_id', 400)
            return add_to_favorites(user_id, masseur_id)
        
        if method == 'DELETE':
            query_params = event.get('queryStringParameters') or {}
            masseur_id = query_params.get('masseur_id')
            if not masseur_id:
                return error_response('Не указан masseur_id', 400)
            return remove_from_favorites(user_id, int(masseur_id))
        
        return error_response('Метод не поддерживается', 405)
    
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


def get_favorites(user_id: int) -> dict:
    '''Получение списка ID избранных массажистов'''
    conn, cursor = get_db_connection()
    
    try:
        cursor.execute("""
            SELECT masseur_id, created_at
            FROM t_p46047379_doc_dialog_ecosystem.favorites
            WHERE user_id = %s
            ORDER BY created_at DESC
        """, (user_id,))
        
        fav_list = cursor.fetchall()
        
        # Возвращаем только ID - фронтенд сам получит детали через API массажистов
        result = [{
            'masseur_id': f['masseur_id'],
            'favorited_at': f['created_at'].isoformat()
        } for f in fav_list]
        
        return success_response({'favorite_ids': result})
        
    except Exception as e:
        print(f"ERROR in get_favorites: {str(e)}")
        import traceback
        traceback.print_exc()
        return error_response(f"Ошибка получения избранного: {str(e)}", 500)
    finally:
        cursor.close()
        conn.close()


def add_to_favorites(user_id: int, masseur_id: int) -> dict:
    '''Добавление массажиста в избранное'''
    conn, cursor = get_db_connection()
    
    try:
        query = """
            INSERT INTO t_p46047379_doc_dialog_ecosystem.favorites (user_id, masseur_id, created_at)
            VALUES (%s, %s, NOW())
            ON CONFLICT (user_id, masseur_id) DO NOTHING
            RETURNING id
        """
        
        cursor.execute(query, (user_id, masseur_id))
        result = cursor.fetchone()
        conn.commit()
        
        if result:
            return success_response({
                'success': True,
                'message': 'Массажист добавлен в избранное'
            })
        else:
            return success_response({
                'success': True,
                'message': 'Массажист уже в избранном'
            })
        
    except Exception as e:
        print(f"ERROR in add_to_favorites: {str(e)}")
        import traceback
        traceback.print_exc()
        conn.rollback()
        return error_response(f"Ошибка добавления в избранное: {str(e)}", 500)
    finally:
        cursor.close()
        conn.close()


def remove_from_favorites(user_id: int, masseur_id: int) -> dict:
    '''Удаление массажиста из избранного'''
    conn, cursor = get_db_connection()
    
    try:
        query = """
            DELETE FROM t_p46047379_doc_dialog_ecosystem.favorites
            WHERE user_id = %s AND masseur_id = %s
            RETURNING id
        """
        
        cursor.execute(query, (user_id, masseur_id))
        result = cursor.fetchone()
        conn.commit()
        
        if result:
            return success_response({
                'success': True,
                'message': 'Массажист удалён из избранного'
            })
        else:
            return error_response('Массажист не найден в избранном', 404)
        
    except Exception as e:
        print(f"ERROR in remove_from_favorites: {str(e)}")
        import traceback
        traceback.print_exc()
        conn.rollback()
        return error_response(f"Ошибка удаления из избранного: {str(e)}", 500)
    finally:
        cursor.close()
        conn.close()