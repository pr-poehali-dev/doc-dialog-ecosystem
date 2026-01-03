import json
import os
import psycopg2
import psycopg2.extras
import jwt
from datetime import datetime

def response(status_code: int, body: dict) -> dict:
    return {
        'statusCode': status_code,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, X-Authorization, Authorization'
        },
        'body': json.dumps(body, ensure_ascii=False, default=str),
        'isBase64Encoded': False
    }

def handler(event: dict, context) -> dict:
    '''API личного кабинета для салонов красоты - управление профилем и заявками'''
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return response(200, {})
    
    dsn = os.environ.get('DATABASE_URL')
    if not dsn:
        return response(500, {'error': 'DATABASE_URL не настроен'})
    
    try:
        conn = psycopg2.connect(dsn)
        conn.set_client_encoding('UTF8')
        psycopg2.extras.register_default_jsonb(conn)
    except Exception as e:
        return response(500, {'error': f'Ошибка подключения к БД: {str(e)}'})
    
    headers = event.get('headers', {})
    auth_header = headers.get('X-Authorization') or headers.get('Authorization', '')
    token = auth_header.replace('Bearer ', '').strip()
    
    try:
        # GET /?action=salon_profile - получить профиль салона текущего пользователя
        if method == 'GET' and event.get('queryStringParameters', {}).get('action') == 'salon_profile':
            if not token:
                conn.close()
                return response(401, {'error': 'Требуется авторизация'})
            
            try:
                jwt_secret = os.environ.get('JWT_SECRET', 'your-secret-key')
                decoded = jwt.decode(token, jwt_secret, algorithms=['HS256'])
                user_id = decoded.get('user_id')
                
                with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
                    cur.execute("""
                        SELECT id, user_id, name, description, logo_url, website, phone, email, 
                               city, address, is_verified, subscription_type, subscription_expires_at, 
                               created_at
                        FROM t_p46047379_doc_dialog_ecosystem.salons
                        WHERE user_id = %s
                    """, (user_id,))
                    salon = cur.fetchone()
                    
                    if not salon:
                        conn.close()
                        return response(404, {'error': 'Салон не найден'})
                    
                    conn.close()
                    return response(200, {'salon': dict(salon)})
            except jwt.InvalidTokenError:
                conn.close()
                return response(401, {'error': 'Неверный токен'})
        
        # POST / - создать профиль салона
        if method == 'POST':
            if not token:
                conn.close()
                return response(401, {'error': 'Требуется авторизация'})
            
            try:
                jwt_secret = os.environ.get('JWT_SECRET', 'your-secret-key')
                decoded = jwt.decode(token, jwt_secret, algorithms=['HS256'])
                user_id = decoded.get('user_id')
                
                body = json.loads(event.get('body', '{}'))
                name = body.get('name')
                description = body.get('description', '')
                logo_url = body.get('logo_url', '')
                website = body.get('website', '')
                phone = body.get('phone', '')
                email = body.get('email', '')
                city = body.get('city', '')
                address = body.get('address', '')
                
                if not name:
                    conn.close()
                    return response(400, {'error': 'Название салона обязательно'})
                
                with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
                    # Проверяем, нет ли уже салона у этого пользователя
                    cur.execute("""
                        SELECT id FROM t_p46047379_doc_dialog_ecosystem.salons WHERE user_id = %s
                    """, (user_id,))
                    existing = cur.fetchone()
                    
                    if existing:
                        conn.close()
                        return response(400, {'error': 'У вас уже есть салон'})
                    
                    cur.execute("""
                        INSERT INTO t_p46047379_doc_dialog_ecosystem.salons 
                        (user_id, name, description, logo_url, website, phone, email, city, address, 
                         is_verified, subscription_type, created_at)
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, false, 'free', NOW())
                        RETURNING id, user_id, name, description, logo_url, website, phone, email, 
                                  city, address, is_verified, subscription_type, created_at
                    """, (user_id, name, description, logo_url, website, phone, email, city, address))
                    
                    salon = cur.fetchone()
                    conn.commit()
                    conn.close()
                    return response(201, {'salon': dict(salon)})
            except jwt.InvalidTokenError:
                conn.close()
                return response(401, {'error': 'Неверный токен'})
        
        # PUT / - обновить профиль салона
        if method == 'PUT':
            if not token:
                conn.close()
                return response(401, {'error': 'Требуется авторизация'})
            
            try:
                jwt_secret = os.environ.get('JWT_SECRET', 'your-secret-key')
                decoded = jwt.decode(token, jwt_secret, algorithms=['HS256'])
                user_id = decoded.get('user_id')
                
                body = json.loads(event.get('body', '{}'))
                
                with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
                    # Получаем текущий салон
                    cur.execute("""
                        SELECT id FROM t_p46047379_doc_dialog_ecosystem.salons WHERE user_id = %s
                    """, (user_id,))
                    salon = cur.fetchone()
                    
                    if not salon:
                        conn.close()
                        return response(404, {'error': 'Салон не найден'})
                    
                    # Обновляем только переданные поля
                    update_fields = []
                    values = []
                    
                    if 'name' in body:
                        update_fields.append('name = %s')
                        values.append(body['name'])
                    if 'description' in body:
                        update_fields.append('description = %s')
                        values.append(body['description'])
                    if 'logo_url' in body:
                        update_fields.append('logo_url = %s')
                        values.append(body['logo_url'])
                    if 'website' in body:
                        update_fields.append('website = %s')
                        values.append(body['website'])
                    if 'phone' in body:
                        update_fields.append('phone = %s')
                        values.append(body['phone'])
                    if 'email' in body:
                        update_fields.append('email = %s')
                        values.append(body['email'])
                    if 'city' in body:
                        update_fields.append('city = %s')
                        values.append(body['city'])
                    if 'address' in body:
                        update_fields.append('address = %s')
                        values.append(body['address'])
                    
                    if not update_fields:
                        conn.close()
                        return response(400, {'error': 'Нет данных для обновления'})
                    
                    values.append(user_id)
                    
                    query = f"""
                        UPDATE t_p46047379_doc_dialog_ecosystem.salons 
                        SET {', '.join(update_fields)}
                        WHERE user_id = %s
                        RETURNING id, user_id, name, description, logo_url, website, phone, email, 
                                  city, address, is_verified, subscription_type, subscription_expires_at, 
                                  created_at
                    """
                    
                    cur.execute(query, values)
                    updated_salon = cur.fetchone()
                    conn.commit()
                    conn.close()
                    return response(200, {'salon': dict(updated_salon)})
            except jwt.InvalidTokenError:
                conn.close()
                return response(401, {'error': 'Неверный токен'})
        
        # GET /?action=requests - получить заявки для салона (specialist_requests)
        if method == 'GET' and event.get('queryStringParameters', {}).get('action') == 'requests':
            if not token:
                conn.close()
                return response(401, {'error': 'Требуется авторизация'})
            
            try:
                jwt_secret = os.environ.get('JWT_SECRET', 'your-secret-key')
                decoded = jwt.decode(token, jwt_secret, algorithms=['HS256'])
                user_id = decoded.get('user_id')
                
                with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
                    # Получаем салон пользователя
                    cur.execute("""
                        SELECT id FROM t_p46047379_doc_dialog_ecosystem.salons WHERE user_id = %s
                    """, (user_id,))
                    salon = cur.fetchone()
                    
                    if not salon:
                        conn.close()
                        return response(404, {'error': 'Салон не найден'})
                    
                    # Получаем заявки (пока все, потом можно фильтровать по specialty)
                    cur.execute("""
                        SELECT sr.id, sr.school_id, s.name as school_name, sr.title, sr.description, 
                               sr.specialty, sr.budget_from, sr.budget_to, sr.currency, sr.location, 
                               sr.deadline_date, sr.status, sr.created_at, sr.updated_at
                        FROM t_p46047379_doc_dialog_ecosystem.specialist_requests sr
                        LEFT JOIN t_p46047379_doc_dialog_ecosystem.schools s ON s.id = sr.school_id
                        WHERE sr.status = 'active'
                        ORDER BY sr.created_at DESC
                    """)
                    requests = cur.fetchall()
                    
                    conn.close()
                    return response(200, {'requests': [dict(r) for r in requests]})
            except jwt.InvalidTokenError:
                conn.close()
                return response(401, {'error': 'Неверный токен'})
        
        conn.close()
        return response(404, {'error': 'Endpoint не найден'})
        
    except Exception as e:
        if conn:
            conn.close()
        return response(500, {'error': f'Ошибка сервера: {str(e)}'})
