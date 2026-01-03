"""API для управления лендингами школ и каталогом школ"""
import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Any
import jwt


def get_db_connection():
    """Подключение к БД через переменную окружения DATABASE_URL"""
    dsn = os.environ.get('DATABASE_URL')
    if not dsn:
        raise ValueError('DATABASE_URL не найден в переменных окружения')
    return psycopg2.connect(dsn, cursor_factory=RealDictCursor)


def cors_headers():
    """Базовые CORS заголовки"""
    return {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, Authorization, X-Authorization',
        'Content-Type': 'application/json'
    }


def response(status_code: int, body: Any) -> dict:
    """Формирование ответа"""
    return {
        'statusCode': status_code,
        'headers': cors_headers(),
        'body': json.dumps(body, ensure_ascii=False, default=str),
        'isBase64Encoded': False
    }


def get_school_by_slug(conn, slug: str) -> dict:
    """Получение полного лендинга школы по slug для публичного отображения"""
    with conn.cursor() as cur:
        # Основная информация о школе
        cur.execute("""
            SELECT id, name, short_description, description, logo_url, cover_url,
                   city, address, phone, email, website, whatsapp, telegram, vk, instagram,
                   license_number, is_author_school, founded_year, students_count, teachers_count,
                   mission, about_school, why_choose_us, cta_button_text, cta_button_url,
                   rating, reviews_count, seo_title, seo_description, is_verified
            FROM t_p46047379_doc_dialog_ecosystem.schools
            WHERE slug = %s AND is_verified = true
        """, (slug,))
        school = cur.fetchone()
        
        if not school:
            return None
        
        school_id = school['id']
        
        # Достижения
        cur.execute("""
            SELECT title, description, icon_name
            FROM t_p46047379_doc_dialog_ecosystem.school_achievements
            WHERE school_id = %s
            ORDER BY sort_order, id
        """, (school_id,))
        school['achievements'] = cur.fetchall()
        
        # Преподаватели
        cur.execute("""
            SELECT name, position, bio, photo_url, experience_years, specialization
            FROM t_p46047379_doc_dialog_ecosystem.school_teachers
            WHERE school_id = %s
            ORDER BY sort_order, id
        """, (school_id,))
        school['teachers'] = cur.fetchall()
        
        # Отзывы
        cur.execute("""
            SELECT author_name, author_photo_url, rating, review_text, course_name, created_at
            FROM t_p46047379_doc_dialog_ecosystem.school_reviews
            WHERE school_id = %s AND is_verified = true
            ORDER BY created_at DESC
            LIMIT 20
        """, (school_id,))
        school['reviews'] = cur.fetchall()
        
        # Галерея
        cur.execute("""
            SELECT image_url, caption
            FROM t_p46047379_doc_dialog_ecosystem.school_gallery
            WHERE school_id = %s
            ORDER BY sort_order, id
        """, (school_id,))
        school['gallery'] = cur.fetchall()
        
        return dict(school)


def get_catalog(conn, city: str = None, limit: int = 50) -> list:
    """Получение каталога школ для публичного отображения"""
    with conn.cursor() as cur:
        query = """
            SELECT id, name, short_description, logo_url, city, rating, reviews_count, slug,
                   students_count, founded_year
            FROM t_p46047379_doc_dialog_ecosystem.schools
            WHERE is_verified = true
        """
        params = []
        
        if city:
            query += " AND city = %s"
            params.append(city)
        
        query += " ORDER BY rating DESC, reviews_count DESC LIMIT %s"
        params.append(limit)
        
        cur.execute(query, params)
        return cur.fetchall()


def create_school(conn, user_id: int, data: dict) -> dict:
    """Создание новой школы"""
    with conn.cursor() as cur:
        # Генерируем slug из названия
        import re
        slug = re.sub(r'[^a-zA-Z0-9а-яА-Я\-]', '-', data['name'].lower()).strip('-')
        slug = re.sub(r'-+', '-', slug)
        
        # Проверяем уникальность slug
        base_slug = slug
        counter = 1
        while True:
            cur.execute("""
                SELECT id FROM t_p46047379_doc_dialog_ecosystem.schools WHERE slug = %s
            """, (slug,))
            if not cur.fetchone():
                break
            slug = f"{base_slug}-{counter}"
            counter += 1
        
        # Создаем школу
        cur.execute("""
            INSERT INTO t_p46047379_doc_dialog_ecosystem.schools (
                user_id, name, short_description, description, logo_url, cover_url,
                slug, learning_direction, format, city, phone, email, website,
                is_verified, created_at
            ) VALUES (
                %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, false, NOW()
            ) RETURNING id, slug
        """, (
            user_id, data['name'], data.get('short_description', ''), data.get('description', ''),
            data.get('logo_url', ''), data.get('cover_url', ''),
            slug, data.get('learning_direction', ''), data.get('format', 'hybrid'),
            data.get('city', ''), data.get('phone', ''), data.get('email', ''), data.get('website', '')
        ))
        result = cur.fetchone()
        conn.commit()
        return {'id': result['id'], 'slug': result['slug']}


def get_user_schools(conn, user_id: int) -> list:
    """Получение списка школ пользователя"""
    with conn.cursor() as cur:
        cur.execute("""
            SELECT id, name, logo_url, slug, is_verified, created_at
            FROM t_p46047379_doc_dialog_ecosystem.schools
            WHERE user_id = %s
            ORDER BY created_at DESC
        """, (user_id,))
        return cur.fetchall()


def get_school_for_edit(conn, school_id: int, user_id: int) -> dict:
    """Получение данных школы для редактирования в админке"""
    with conn.cursor() as cur:
        # Проверяем права доступа
        cur.execute("""
            SELECT * FROM t_p46047379_doc_dialog_ecosystem.schools
            WHERE id = %s AND user_id = %s
        """, (school_id, user_id))
        school = cur.fetchone()
        
        if not school:
            return None
        
        # Достижения
        cur.execute("""
            SELECT id, title, description, icon_name, sort_order
            FROM t_p46047379_doc_dialog_ecosystem.school_achievements
            WHERE school_id = %s
            ORDER BY sort_order, id
        """, (school_id,))
        school['achievements'] = cur.fetchall()
        
        # Преподаватели
        cur.execute("""
            SELECT id, name, position, bio, photo_url, experience_years, specialization, sort_order
            FROM t_p46047379_doc_dialog_ecosystem.school_teachers
            WHERE school_id = %s
            ORDER BY sort_order, id
        """, (school_id,))
        school['teachers'] = cur.fetchall()
        
        # Галерея
        cur.execute("""
            SELECT id, image_url, caption, sort_order
            FROM t_p46047379_doc_dialog_ecosystem.school_gallery
            WHERE school_id = %s
            ORDER BY sort_order, id
        """, (school_id,))
        school['gallery'] = cur.fetchall()
        
        return dict(school)


def update_school_landing(conn, school_id: int, user_id: int, data: dict) -> bool:
    """Обновление лендинга школы"""
    with conn.cursor() as cur:
        # Проверяем права
        cur.execute("""
            SELECT id FROM t_p46047379_doc_dialog_ecosystem.schools
            WHERE id = %s AND user_id = %s
        """, (school_id, user_id))
        
        if not cur.fetchone():
            return False
        
        # Обновляем основную информацию
        cur.execute("""
            UPDATE t_p46047379_doc_dialog_ecosystem.schools
            SET name = %s, short_description = %s, description = %s, slug = %s,
                logo_url = %s, cover_url = %s, city = %s, address = %s,
                phone = %s, email = %s, website = %s, whatsapp = %s, telegram = %s, vk = %s, instagram = %s,
                license_number = %s, is_author_school = %s, founded_year = %s,
                students_count = %s, teachers_count = %s, mission = %s,
                about_school = %s, why_choose_us = %s, cta_button_text = %s, cta_button_url = %s,
                seo_title = %s, seo_description = %s, learning_direction = %s, format = %s
            WHERE id = %s
        """, (
            data.get('name'), data.get('short_description'), data.get('description'), data.get('slug'),
            data.get('logo_url'), data.get('cover_url'), data.get('city'), data.get('address'),
            data.get('phone'), data.get('email'), data.get('website'),
            data.get('whatsapp'), data.get('telegram'), data.get('vk'), data.get('instagram'),
            data.get('license_number'), data.get('is_author_school', False), data.get('founded_year'),
            data.get('students_count'), data.get('teachers_count'), data.get('mission'),
            data.get('about_school'), data.get('why_choose_us'),
            data.get('cta_button_text', 'Оставить заявку'), data.get('cta_button_url'),
            data.get('seo_title'), data.get('seo_description'),
            data.get('learning_direction', ''), data.get('format', 'hybrid'),
            school_id
        ))
        
        # Обновляем курсы этой школы (автопривязка логотипа и названия)
        if data.get('logo_url') or data.get('name'):
            cur.execute("""
                UPDATE t_p46047379_doc_dialog_ecosystem.courses
                SET school_name = %s, school_logo_url = %s
                WHERE school_id = %s
            """, (data.get('name'), data.get('logo_url'), school_id))
        
        # Обновляем достижения (удаляем старые, добавляем новые)
        if 'achievements' in data:
            cur.execute("SELECT id FROM t_p46047379_doc_dialog_ecosystem.school_achievements WHERE school_id = %s", (school_id,))
            existing_ids = [row['id'] for row in cur.fetchall()]
            
            new_ids = []
            for idx, ach in enumerate(data['achievements']):
                if ach.get('id') and ach['id'] in existing_ids:
                    # Обновляем существующий
                    cur.execute("""
                        UPDATE t_p46047379_doc_dialog_ecosystem.school_achievements
                        SET title = %s, description = %s, icon_name = %s, sort_order = %s
                        WHERE id = %s
                    """, (ach['title'], ach.get('description'), ach.get('icon_name'), idx, ach['id']))
                    new_ids.append(ach['id'])
                else:
                    # Создаем новый
                    cur.execute("""
                        INSERT INTO t_p46047379_doc_dialog_ecosystem.school_achievements
                        (school_id, title, description, icon_name, sort_order)
                        VALUES (%s, %s, %s, %s, %s)
                    """, (school_id, ach['title'], ach.get('description'), ach.get('icon_name'), idx))
        
        # Обновляем преподавателей
        if 'teachers' in data:
            cur.execute("SELECT id FROM t_p46047379_doc_dialog_ecosystem.school_teachers WHERE school_id = %s", (school_id,))
            existing_ids = [row['id'] for row in cur.fetchall()]
            
            new_ids = []
            for idx, teacher in enumerate(data['teachers']):
                if teacher.get('id') and teacher['id'] in existing_ids:
                    cur.execute("""
                        UPDATE t_p46047379_doc_dialog_ecosystem.school_teachers
                        SET name = %s, position = %s, bio = %s, photo_url = %s, 
                            experience_years = %s, specialization = %s, sort_order = %s
                        WHERE id = %s
                    """, (teacher['name'], teacher.get('position'), teacher.get('bio'), teacher.get('photo_url'),
                          teacher.get('experience_years'), teacher.get('specialization'), idx, teacher['id']))
                    new_ids.append(teacher['id'])
                else:
                    cur.execute("""
                        INSERT INTO t_p46047379_doc_dialog_ecosystem.school_teachers
                        (school_id, name, position, bio, photo_url, experience_years, specialization, sort_order)
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                    """, (school_id, teacher['name'], teacher.get('position'), teacher.get('bio'),
                          teacher.get('photo_url'), teacher.get('experience_years'), 
                          teacher.get('specialization'), idx))
        
        # Обновляем галерею
        if 'gallery' in data:
            cur.execute("SELECT id FROM t_p46047379_doc_dialog_ecosystem.school_gallery WHERE school_id = %s", (school_id,))
            existing_ids = [row['id'] for row in cur.fetchall()]
            
            new_ids = []
            for idx, img in enumerate(data['gallery']):
                if img.get('id') and img['id'] in existing_ids:
                    cur.execute("""
                        UPDATE t_p46047379_doc_dialog_ecosystem.school_gallery
                        SET image_url = %s, caption = %s, sort_order = %s
                        WHERE id = %s
                    """, (img['image_url'], img.get('caption'), idx, img['id']))
                    new_ids.append(img['id'])
                else:
                    cur.execute("""
                        INSERT INTO t_p46047379_doc_dialog_ecosystem.school_gallery
                        (school_id, image_url, caption, sort_order)
                        VALUES (%s, %s, %s, %s)
                    """, (school_id, img['image_url'], img.get('caption'), idx))
        
        conn.commit()
        return True


def handler(event: dict, context) -> dict:
    """Обработчик запросов для управления лендингами школ"""
    method = event.get('httpMethod', 'GET')
    
    # CORS preflight
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': cors_headers(),
            'body': '',
            'isBase64Encoded': False
        }
    
    try:
        conn = get_db_connection()
        
        # GET /catalog - публичный каталог школ
        if method == 'GET' and event.get('queryStringParameters', {}).get('action') == 'catalog':
            city = event.get('queryStringParameters', {}).get('city')
            limit = int(event.get('queryStringParameters', {}).get('limit', 50))
            schools = get_catalog(conn, city, limit)
            conn.close()
            return response(200, {'schools': schools})
        
        # GET /?action=my_schools - список школ пользователя
        if method == 'GET' and event.get('queryStringParameters', {}).get('action') == 'my_schools':
            user_id = event.get('headers', {}).get('X-User-Id')
            if not user_id:
                conn.close()
                return response(401, {'error': 'Требуется авторизация'})
            schools = get_user_schools(conn, int(user_id))
            conn.close()
            return response(200, {'schools': schools})
        
        # GET /?action=all_schools - все школы для админов
        if method == 'GET' and event.get('queryStringParameters', {}).get('action') == 'all_schools':
            headers = event.get('headers', {})
            auth_header = headers.get('X-Authorization') or headers.get('Authorization', '')
            token = auth_header.replace('Bearer ', '').strip()
            
            if not token:
                conn.close()
                return response(401, {'error': 'Требуется авторизация'})
            
            try:
                jwt_secret = os.environ.get('JWT_SECRET', 'your-secret-key')
                decoded = jwt.decode(token, jwt_secret, algorithms=['HS256'])
                user_role = decoded.get('role')
                
                if user_role not in ('admin', 'moderator'):
                    conn.close()
                    return response(403, {'error': 'Доступ запрещён'})
                
                with conn.cursor() as cur:
                    cur.execute("""
                        SELECT s.id, s.user_id, u.email as user_email, s.name, s.slug, s.logo_url, 
                               s.description, s.students_count, s.learning_direction, s.format, 
                               s.city, s.created_at
                        FROM t_p46047379_doc_dialog_ecosystem.schools s
                        JOIN t_p46047379_doc_dialog_ecosystem.users u ON u.id = s.user_id
                        ORDER BY s.created_at DESC
                    """)
                    schools = cur.fetchall()
                    conn.close()
                    return response(200, {'schools': schools})
            except jwt.InvalidTokenError:
                conn.close()
                return response(401, {'error': 'Неверный токен'})
        
        # POST / - создание новой школы
        if method == 'POST':
            user_id = event.get('headers', {}).get('X-User-Id')
            if not user_id:
                conn.close()
                return response(401, {'error': 'Требуется авторизация'})
            
            data = json.loads(event.get('body', '{}'))
            result = create_school(conn, int(user_id), data)
            conn.close()
            return response(201, result)
        
        # GET /slug/:slug - публичный лендинг школы
        if method == 'GET' and event.get('pathParams', {}).get('slug'):
            slug = event['pathParams']['slug']
            school = get_school_by_slug(conn, slug)
            conn.close()
            
            if not school:
                return response(404, {'error': 'Школа не найдена'})
            
            return response(200, school)
        
        # GET /:id - получение для редактирования (требует авторизации)
        if method == 'GET':
            school_id = event.get('pathParams', {}).get('id')
            user_id = event.get('headers', {}).get('X-User-Id')
            
            if not school_id or not user_id:
                conn.close()
                return response(400, {'error': 'Требуется school_id и X-User-Id'})
            
            school = get_school_for_edit(conn, int(school_id), int(user_id))
            conn.close()
            
            if not school:
                return response(404, {'error': 'Школа не найдена или нет прав доступа'})
            
            return response(200, school)
        
        # PUT /:id - обновление лендинга школы
        if method == 'PUT':
            school_id = event.get('pathParams', {}).get('id')
            user_id = event.get('headers', {}).get('X-User-Id')
            
            if not school_id or not user_id:
                conn.close()
                return response(400, {'error': 'Требуется school_id и X-User-Id'})
            
            data = json.loads(event.get('body', '{}'))
            
            success = update_school_landing(conn, int(school_id), int(user_id), data)
            conn.close()
            
            if not success:
                return response(404, {'error': 'Школа не найдена или нет прав доступа'})
            
            return response(200, {'success': True, 'message': 'Лендинг школы обновлен'})
        
        # DELETE /:id - удаление школы (для админов)
        if method == 'DELETE':
            school_id = event.get('queryStringParameters', {}).get('id')
            headers = event.get('headers', {})
            auth_header = headers.get('X-Authorization') or headers.get('Authorization', '')
            token = auth_header.replace('Bearer ', '').strip()
            
            if not token or not school_id:
                conn.close()
                return response(400, {'error': 'Требуется токен и school_id'})
            
            try:
                jwt_secret = os.environ.get('JWT_SECRET', 'your-secret-key')
                decoded = jwt.decode(token, jwt_secret, algorithms=['HS256'])
                user_role = decoded.get('role')
                
                if user_role not in ('admin', 'moderator'):
                    conn.close()
                    return response(403, {'error': 'Доступ запрещён'})
                
                with conn.cursor() as cur:
                    cur.execute("""
                        DELETE FROM t_p46047379_doc_dialog_ecosystem.schools WHERE id = %s
                    """, (int(school_id),))
                    conn.commit()
                    conn.close()
                    return response(200, {'success': True})
            except jwt.InvalidTokenError:
                conn.close()
                return response(401, {'error': 'Неверный токен'})
        
        conn.close()
        return response(405, {'error': 'Метод не поддерживается'})
        
    except Exception as e:
        import traceback
        error_details = {
            'error': str(e),
            'traceback': traceback.format_exc(),
            'event': event
        }
        print(f"ERROR: {error_details}")
        return response(500, {'error': str(e), 'details': traceback.format_exc()})