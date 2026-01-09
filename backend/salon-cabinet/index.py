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

def is_admin_user(conn, user_id: int) -> bool:
    """Проверка является ли пользователь администратором"""
    with conn.cursor() as cur:
        cur.execute("""
            SELECT role, is_admin FROM t_p46047379_doc_dialog_ecosystem.users
            WHERE id = %s
        """, (user_id,))
        user = cur.fetchone()
        if user:
            return user[0] == 'admin' or user[1] is True
        return False

def handler(event: dict, context) -> dict:
    '''API личного кабинета для салонов красоты - управление профилем и заявками'''
    
    method = event.get('httpMethod', 'GET')
    action = event.get('queryStringParameters', {}).get('action', '')
    
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
        # GET /?action=admin_list - список всех салонов для админа
        if method == 'GET' and action == 'admin_list':
            if not token:
                conn.close()
                return response(401, {'error': 'Требуется авторизация'})
            
            try:
                jwt_secret = os.environ.get('JWT_SECRET', 'your-secret-key')
                decoded = jwt.decode(token, jwt_secret, algorithms=['HS256'])
                user_id = decoded.get('user_id')
                
                if not is_admin_user(conn, user_id):
                    conn.close()
                    return response(403, {'error': 'Доступ запрещен'})
                
                with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
                    cur.execute("""
                        SELECT s.id, s.user_id, s.name, s.description, s.logo_url, s.website, 
                               s.phone, s.email, s.city, s.address, s.is_verified, 
                               s.subscription_type, s.photos, s.created_at, s.updated_at,
                               u.email as owner_email
                        FROM t_p46047379_doc_dialog_ecosystem.salons s
                        LEFT JOIN t_p46047379_doc_dialog_ecosystem.users u ON s.user_id = u.id
                        ORDER BY s.is_verified ASC, s.created_at DESC
                    """)
                    salons = cur.fetchall()
                    conn.close()
                    return response(200, {'salons': [dict(s) for s in salons]})
            except jwt.InvalidTokenError:
                conn.close()
                return response(401, {'error': 'Неверный токен'})
        
        # POST /?action=verify - верифицировать/отменить верификацию салона (админ)
        if method == 'POST' and action == 'verify':
            if not token:
                conn.close()
                return response(401, {'error': 'Требуется авторизация'})
            
            try:
                jwt_secret = os.environ.get('JWT_SECRET', 'your-secret-key')
                decoded = jwt.decode(token, jwt_secret, algorithms=['HS256'])
                user_id = decoded.get('user_id')
                
                if not is_admin_user(conn, user_id):
                    conn.close()
                    return response(403, {'error': 'Доступ запрещен'})
                
                body = json.loads(event.get('body', '{}'))
                salon_id = body.get('salon_id')
                verify = body.get('verify', True)
                
                if not salon_id:
                    conn.close()
                    return response(400, {'error': 'salon_id обязателен'})
                
                with conn.cursor() as cur:
                    cur.execute("""
                        UPDATE t_p46047379_doc_dialog_ecosystem.salons
                        SET is_verified = %s, updated_at = NOW()
                        WHERE id = %s
                    """, (verify, salon_id))
                    conn.commit()
                    conn.close()
                    return response(200, {'success': True, 'verified': verify})
            except jwt.InvalidTokenError:
                conn.close()
                return response(401, {'error': 'Неверный токен'})
        
        # GET /?action=salon_profile - получить профиль салона текущего пользователя
        if method == 'GET' and action == 'salon_profile':
            if not token:
                conn.close()
                return response(401, {'error': 'Требуется авторизация'})
            
            try:
                jwt_secret = os.environ.get('JWT_SECRET', 'your-secret-key')
                decoded = jwt.decode(token, jwt_secret, algorithms=['HS256'])
                user_id = decoded.get('user_id')
                
                with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
                    # Админ видит все салоны, обычный пользователь - только свой
                    if is_admin_user(conn, user_id):
                        cur.execute("""
                            SELECT id, user_id, name, description, logo_url, website, phone, email, 
                                   city, address, is_verified, subscription_type, subscription_expires_at, 
                                   photos, created_at
                            FROM t_p46047379_doc_dialog_ecosystem.salons
                            ORDER BY created_at DESC
                        """)
                        salons = cur.fetchall()
                        salon = salons[0] if salons else None
                    else:
                        cur.execute("""
                            SELECT id, user_id, name, description, logo_url, website, phone, email, 
                                   city, address, is_verified, subscription_type, subscription_expires_at, 
                                   photos, created_at
                            FROM t_p46047379_doc_dialog_ecosystem.salons
                            WHERE user_id = %s
                        """, (user_id,))
                        salon = cur.fetchone()
                    
                    if not salon:
                        conn.close()
                        return response(404, {'error': 'Салон не найден'})
                    
                    cur.execute("""
                        SELECT id, specializations, schedule, salary_from, salary_to, 
                               salary_currency, requirements, requires_partner_courses, 
                               is_active, created_at
                        FROM t_p46047379_doc_dialog_ecosystem.salon_vacancies
                        WHERE salon_id = %s AND is_active = true
                    """, (salon['id'],))
                    vacancies = cur.fetchall()
                    
                    conn.close()
                    return response(200, {
                        'salon': dict(salon),
                        'vacancies': [dict(v) for v in vacancies]
                    })
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
                photos = body.get('photos', [])
                vacancies = body.get('vacancies', [])
                
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
                         photos, is_verified, subscription_type, created_at)
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, false, 'free', NOW())
                        RETURNING id, user_id, name, description, logo_url, website, phone, email, 
                                  city, address, photos, is_verified, subscription_type, created_at
                    """, (user_id, name, description, logo_url, website, phone, email, city, address, photos))
                    
                    salon = cur.fetchone()
                    salon_id = salon['id']
                    
                    for vac in vacancies:
                        cur.execute("""
                            INSERT INTO t_p46047379_doc_dialog_ecosystem.salon_vacancies
                            (salon_id, specializations, schedule, salary_from, salary_to, 
                             salary_currency, requirements, requires_partner_courses, is_active)
                            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, true)
                        """, (
                            salon_id,
                            vac.get('specializations', []),
                            vac.get('schedule', ''),
                            vac.get('salary_from'),
                            vac.get('salary_to'),
                            vac.get('salary_currency', 'RUB'),
                            vac.get('requirements', ''),
                            vac.get('requires_partner_courses', True)
                        ))
                    
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
                    # Получаем текущий салон (админ может редактировать любой салон)
                    if is_admin_user(conn, user_id):
                        # Для админа - берем первый салон или салон из параметра
                        salon_id = body.get('salon_id')
                        if salon_id:
                            cur.execute("""
                                SELECT id FROM t_p46047379_doc_dialog_ecosystem.salons WHERE id = %s
                            """, (salon_id,))
                        else:
                            cur.execute("""
                                SELECT id FROM t_p46047379_doc_dialog_ecosystem.salons ORDER BY created_at DESC LIMIT 1
                            """)
                    else:
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
                    if 'photos' in body:
                        update_fields.append('photos = %s')
                        values.append(body['photos'])
                    
                    salon_id = salon['id']
                    
                    if update_fields:
                        values.append(user_id)
                        query = f"""
                            UPDATE t_p46047379_doc_dialog_ecosystem.salons 
                            SET {', '.join(update_fields)}
                            WHERE user_id = %s
                            RETURNING id, user_id, name, description, logo_url, website, phone, email, 
                                      city, address, photos, is_verified, subscription_type, 
                                      subscription_expires_at, created_at
                        """
                        cur.execute(query, values)
                        updated_salon = cur.fetchone()
                    else:
                        cur.execute("""
                            SELECT id, user_id, name, description, logo_url, website, phone, email, 
                                   city, address, photos, is_verified, subscription_type, 
                                   subscription_expires_at, created_at
                            FROM t_p46047379_doc_dialog_ecosystem.salons
                            WHERE user_id = %s
                        """, (user_id,))
                        updated_salon = cur.fetchone()
                    
                    if 'vacancies' in body:
                        cur.execute("""
                            UPDATE t_p46047379_doc_dialog_ecosystem.salon_vacancies
                            SET is_active = false
                            WHERE salon_id = %s
                        """, (salon_id,))
                        
                        for vac in body['vacancies']:
                            cur.execute("""
                                INSERT INTO t_p46047379_doc_dialog_ecosystem.salon_vacancies
                                (salon_id, specializations, schedule, salary_from, salary_to, 
                                 salary_currency, requirements, requires_partner_courses, is_active)
                                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, true)
                            """, (
                                salon_id,
                                vac.get('specializations', []),
                                vac.get('schedule', ''),
                                vac.get('salary_from'),
                                vac.get('salary_to'),
                                vac.get('salary_currency', 'RUB'),
                                vac.get('requirements', ''),
                                vac.get('requires_partner_courses', True)
                            ))
                    
                    conn.commit()
                    conn.close()
                    return response(200, {'salon': dict(updated_salon)})
            except jwt.InvalidTokenError:
                conn.close()
                return response(401, {'error': 'Неверный токен'})
        
        # POST /?action=add_vacancy - добавить вакансию
        if method == 'POST' and action == 'add_vacancy':
            if not token:
                conn.close()
                return response(401, {'error': 'Требуется авторизация'})
            
            try:
                jwt_secret = os.environ.get('JWT_SECRET', 'your-secret-key')
                decoded = jwt.decode(token, jwt_secret, algorithms=['HS256'])
                user_id = decoded.get('user_id')
                
                body = json.loads(event.get('body', '{}'))
                
                with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
                    # Получаем салон пользователя
                    cur.execute("""
                        SELECT id FROM t_p46047379_doc_dialog_ecosystem.salons WHERE user_id = %s
                    """, (user_id,))
                    salon = cur.fetchone()
                    
                    if not salon:
                        conn.close()
                        return response(404, {'error': 'Сначала создайте профиль салона'})
                    
                    salon_id = salon['id']
                    
                    # Добавляем вакансию
                    cur.execute("""
                        INSERT INTO t_p46047379_doc_dialog_ecosystem.salon_vacancies
                        (salon_id, specializations, schedule, salary_from, salary_to, 
                         salary_currency, requirements, requires_partner_courses, is_active)
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, true)
                        RETURNING id
                    """, (
                        salon_id,
                        body.get('specializations', []),
                        body.get('schedule', ''),
                        body.get('salary_from'),
                        body.get('salary_to'),
                        body.get('salary_currency', 'RUB'),
                        body.get('requirements', ''),
                        body.get('requires_partner_courses', False)
                    ))
                    
                    vacancy = cur.fetchone()
                    conn.commit()
                    conn.close()
                    return response(201, {'vacancy_id': vacancy['id'], 'message': 'Вакансия добавлена'})
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