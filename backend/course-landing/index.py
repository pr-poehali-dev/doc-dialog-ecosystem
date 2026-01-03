import json
import os
import psycopg2
from datetime import datetime

def handler(event: dict, context) -> dict:
    """API для управления лендингами курсов"""
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Authorization'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    dsn = os.environ.get('DATABASE_URL')
    schema = 't_p46047379_doc_dialog_ecosystem'
    
    conn = psycopg2.connect(dsn)
    conn.autocommit = True
    cur = conn.cursor()
    
    query_params = event.get('queryStringParameters', {}) or {}
    landing_id = query_params.get('id')
    slug = query_params.get('slug')
    school_id = query_params.get('school_id')
    
    # GET /course-landing?slug=X - Публичный просмотр лендинга
    if method == 'GET' and slug:
        cur.execute(f"""
            SELECT id, school_id, title, short_description, format, category, cover_url, 
                   cta_button_text, author_name, author_photo_url, author_position, 
                   author_description, author_experience, duration, lesson_format, 
                   support_info, access_period, city, location, event_dates, days_count,
                   price_text, payment_format, discount_info, partner_link,
                   promo_description, notification_email, notification_text,
                   seo_title, seo_description, slug, status, created_at, updated_at
            FROM {schema}.course_landings
            WHERE slug = %s AND status = 'published'
        """, (slug,))
        
        landing = cur.fetchone()
        
        if not landing:
            cur.close()
            conn.close()
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Landing not found'}),
                'isBase64Encoded': False
            }
        
        # Получаем данные школы
        cur.execute(f"SELECT name, logo, description, students_count FROM {schema}.schools WHERE id = %s", (landing[1],))
        school = cur.fetchone()
        
        # Получаем связанные данные
        cur.execute(f"SELECT title, description, icon_url FROM {schema}.course_landing_target_audience WHERE landing_id = %s ORDER BY sort_order", (landing[0],))
        target_audience = cur.fetchall()
        
        cur.execute(f"SELECT result_text FROM {schema}.course_landing_results WHERE landing_id = %s ORDER BY sort_order", (landing[0],))
        results = cur.fetchall()
        
        cur.execute(f"SELECT module_name, description FROM {schema}.course_landing_program WHERE landing_id = %s ORDER BY sort_order", (landing[0],))
        program = cur.fetchall()
        
        cur.execute(f"SELECT bonus_name, description FROM {schema}.course_landing_bonuses WHERE landing_id = %s ORDER BY sort_order", (landing[0],))
        bonuses = cur.fetchall()
        
        result = {
            'id': landing[0],
            'school': {
                'id': landing[1],
                'name': school[0] if school else None,
                'logo': school[1] if school else None,
                'description': school[2] if school else None,
                'students_count': school[3] if school else None
            },
            'title': landing[2],
            'short_description': landing[3],
            'format': landing[4],
            'category': landing[5],
            'cover_url': landing[6],
            'cta_button_text': landing[7],
            'author': {
                'name': landing[8],
                'photo_url': landing[9],
                'position': landing[10],
                'description': landing[11],
                'experience': landing[12]
            },
            'learning_format': {
                'duration': landing[13],
                'lesson_format': landing[14],
                'support_info': landing[15],
                'access_period': landing[16],
                'city': landing[17],
                'location': landing[18],
                'event_dates': landing[19],
                'days_count': landing[20]
            },
            'pricing': {
                'price_text': landing[21],
                'payment_format': landing[22],
                'discount_info': landing[23],
                'partner_link': landing[24]
            },
            'promo': {
                'description': landing[25],
                'notification_email': landing[26],
                'notification_text': landing[27]
            },
            'seo': {
                'title': landing[28],
                'description': landing[29],
                'slug': landing[30]
            },
            'target_audience': [{'title': t[0], 'description': t[1], 'icon_url': t[2]} for t in target_audience],
            'results': [r[0] for r in results],
            'program': [{'module_name': p[0], 'description': p[1]} for p in program],
            'bonuses': [{'bonus_name': b[0], 'description': b[1]} for b in bonuses]
        }
        
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(result),
            'isBase64Encoded': False
        }
    
    # GET /course-landing?school_id=X - Список лендингов школы
    if method == 'GET' and school_id:
        auth_header = event.get('headers', {}).get('X-Authorization', '')
        token = auth_header.replace('Bearer ', '') if auth_header else None
        
        if not token:
            cur.close()
            conn.close()
            return {
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Unauthorized'}),
                'isBase64Encoded': False
            }
        
        cur.execute(f"""
            SELECT id, title, short_description, format, category, cover_url, 
                   status, slug, created_at, updated_at
            FROM {schema}.course_landings
            WHERE school_id = %s
            ORDER BY created_at DESC
        """, (school_id,))
        
        landings = cur.fetchall()
        
        result = [{
            'id': l[0],
            'title': l[1],
            'short_description': l[2],
            'format': l[3],
            'category': l[4],
            'cover_url': l[5],
            'status': l[6],
            'slug': l[7],
            'created_at': l[8].isoformat() if l[8] else None,
            'updated_at': l[9].isoformat() if l[9] else None
        } for l in landings]
        
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(result),
            'isBase64Encoded': False
        }
    
    # GET /course-landing?id=X - Получить конкретный лендинг для редактирования
    if method == 'GET' and landing_id:
        auth_header = event.get('headers', {}).get('X-Authorization', '')
        token = auth_header.replace('Bearer ', '') if auth_header else None
        
        if not token:
            cur.close()
            conn.close()
            return {
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Unauthorized'}),
                'isBase64Encoded': False
            }
        
        cur.execute(f"""
            SELECT id, school_id, title, short_description, format, category, cover_url, 
                   cta_button_text, author_name, author_photo_url, author_position, 
                   author_description, author_experience, duration, lesson_format, 
                   support_info, access_period, city, location, event_dates, days_count,
                   price_text, payment_format, discount_info, partner_link,
                   promo_description, notification_email, notification_text,
                   seo_title, seo_description, slug, status
            FROM {schema}.course_landings
            WHERE id = %s
        """, (landing_id,))
        
        landing = cur.fetchone()
        
        if not landing:
            cur.close()
            conn.close()
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Landing not found'}),
                'isBase64Encoded': False
            }
        
        # Получаем связанные данные
        cur.execute(f"SELECT id, title, description, icon_url, sort_order FROM {schema}.course_landing_target_audience WHERE landing_id = %s ORDER BY sort_order", (landing[0],))
        target_audience = cur.fetchall()
        
        cur.execute(f"SELECT id, result_text, sort_order FROM {schema}.course_landing_results WHERE landing_id = %s ORDER BY sort_order", (landing[0],))
        results = cur.fetchall()
        
        cur.execute(f"SELECT id, module_name, description, sort_order FROM {schema}.course_landing_program WHERE landing_id = %s ORDER BY sort_order", (landing[0],))
        program = cur.fetchall()
        
        cur.execute(f"SELECT id, bonus_name, description, sort_order FROM {schema}.course_landing_bonuses WHERE landing_id = %s ORDER BY sort_order", (landing[0],))
        bonuses = cur.fetchall()
        
        result = {
            'id': landing[0],
            'school_id': landing[1],
            'title': landing[2],
            'short_description': landing[3],
            'format': landing[4],
            'category': landing[5],
            'cover_url': landing[6],
            'cta_button_text': landing[7],
            'author_name': landing[8],
            'author_photo_url': landing[9],
            'author_position': landing[10],
            'author_description': landing[11],
            'author_experience': landing[12],
            'duration': landing[13],
            'lesson_format': landing[14],
            'support_info': landing[15],
            'access_period': landing[16],
            'city': landing[17],
            'location': landing[18],
            'event_dates': landing[19],
            'days_count': landing[20],
            'price_text': landing[21],
            'payment_format': landing[22],
            'discount_info': landing[23],
            'partner_link': landing[24],
            'promo_description': landing[25],
            'notification_email': landing[26],
            'notification_text': landing[27],
            'seo_title': landing[28],
            'seo_description': landing[29],
            'slug': landing[30],
            'status': landing[31],
            'target_audience': [{'id': t[0], 'title': t[1], 'description': t[2], 'icon_url': t[3], 'sort_order': t[4]} for t in target_audience],
            'results': [{'id': r[0], 'result_text': r[1], 'sort_order': r[2]} for r in results],
            'program': [{'id': p[0], 'module_name': p[1], 'description': p[2], 'sort_order': p[3]} for p in program],
            'bonuses': [{'id': b[0], 'bonus_name': b[1], 'description': b[2], 'sort_order': b[3]} for b in bonuses]
        }
        
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(result),
            'isBase64Encoded': False
        }
    
    # POST /course-landing - Создать новый лендинг
    if method == 'POST':
        auth_header = event.get('headers', {}).get('X-Authorization', '')
        token = auth_header.replace('Bearer ', '') if auth_header else None
        
        if not token:
            cur.close()
            conn.close()
            return {
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Unauthorized'}),
                'isBase64Encoded': False
            }
        
        body = json.loads(event.get('body', '{}'))
        
        cur.execute(f"""
            INSERT INTO {schema}.course_landings (
                school_id, title, short_description, format, category, cover_url, 
                cta_button_text, author_name, author_photo_url, author_position, 
                author_description, author_experience, duration, lesson_format, 
                support_info, access_period, city, location, event_dates, days_count,
                price_text, payment_format, discount_info, partner_link,
                promo_description, notification_email, notification_text,
                seo_title, seo_description, slug, status
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id
        """, (
            body.get('school_id'),
            body.get('title'),
            body.get('short_description'),
            body.get('format'),
            body.get('category'),
            body.get('cover_url'),
            body.get('cta_button_text', 'Записаться на курс'),
            body.get('author_name'),
            body.get('author_photo_url'),
            body.get('author_position'),
            body.get('author_description'),
            body.get('author_experience'),
            body.get('duration'),
            body.get('lesson_format'),
            body.get('support_info'),
            body.get('access_period'),
            body.get('city'),
            body.get('location'),
            body.get('event_dates'),
            body.get('days_count'),
            body.get('price_text'),
            body.get('payment_format'),
            body.get('discount_info'),
            body.get('partner_link'),
            body.get('promo_description'),
            body.get('notification_email'),
            body.get('notification_text'),
            body.get('seo_title'),
            body.get('seo_description'),
            body.get('slug'),
            body.get('status', 'draft')
        ))
        
        landing_id = cur.fetchone()[0]
        
        # Добавляем связанные данные
        for item in body.get('target_audience', []):
            cur.execute(f"""
                INSERT INTO {schema}.course_landing_target_audience (landing_id, title, description, icon_url, sort_order)
                VALUES (%s, %s, %s, %s, %s)
            """, (landing_id, item.get('title'), item.get('description'), item.get('icon_url'), item.get('sort_order', 0)))
        
        for idx, result_text in enumerate(body.get('results', [])):
            cur.execute(f"""
                INSERT INTO {schema}.course_landing_results (landing_id, result_text, sort_order)
                VALUES (%s, %s, %s)
            """, (landing_id, result_text, idx))
        
        for item in body.get('program', []):
            cur.execute(f"""
                INSERT INTO {schema}.course_landing_program (landing_id, module_name, description, sort_order)
                VALUES (%s, %s, %s, %s)
            """, (landing_id, item.get('module_name'), item.get('description'), item.get('sort_order', 0)))
        
        for item in body.get('bonuses', []):
            cur.execute(f"""
                INSERT INTO {schema}.course_landing_bonuses (landing_id, bonus_name, description, sort_order)
                VALUES (%s, %s, %s, %s)
            """, (landing_id, item.get('bonus_name'), item.get('description'), item.get('sort_order', 0)))
        
        cur.close()
        conn.close()
        return {
            'statusCode': 201,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'id': landing_id, 'message': 'Landing created'}),
            'isBase64Encoded': False
        }
    
    # PUT /course-landing?id=X - Обновить лендинг
    if method == 'PUT' and landing_id:
        auth_header = event.get('headers', {}).get('X-Authorization', '')
        token = auth_header.replace('Bearer ', '') if auth_header else None
        
        if not token:
            cur.close()
            conn.close()
            return {
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Unauthorized'}),
                'isBase64Encoded': False
            }
        
        body = json.loads(event.get('body', '{}'))
        
        cur.execute(f"""
            UPDATE {schema}.course_landings
            SET title = %s, short_description = %s, format = %s, category = %s, cover_url = %s,
                cta_button_text = %s, author_name = %s, author_photo_url = %s, author_position = %s,
                author_description = %s, author_experience = %s, duration = %s, lesson_format = %s,
                support_info = %s, access_period = %s, city = %s, location = %s, event_dates = %s,
                days_count = %s, price_text = %s, payment_format = %s, discount_info = %s,
                partner_link = %s, promo_description = %s, notification_email = %s, notification_text = %s,
                seo_title = %s, seo_description = %s, slug = %s, status = %s, updated_at = CURRENT_TIMESTAMP
            WHERE id = %s
        """, (
            body.get('title'),
            body.get('short_description'),
            body.get('format'),
            body.get('category'),
            body.get('cover_url'),
            body.get('cta_button_text'),
            body.get('author_name'),
            body.get('author_photo_url'),
            body.get('author_position'),
            body.get('author_description'),
            body.get('author_experience'),
            body.get('duration'),
            body.get('lesson_format'),
            body.get('support_info'),
            body.get('access_period'),
            body.get('city'),
            body.get('location'),
            body.get('event_dates'),
            body.get('days_count'),
            body.get('price_text'),
            body.get('payment_format'),
            body.get('discount_info'),
            body.get('partner_link'),
            body.get('promo_description'),
            body.get('notification_email'),
            body.get('notification_text'),
            body.get('seo_title'),
            body.get('seo_description'),
            body.get('slug'),
            body.get('status'),
            landing_id
        ))
        
        # Удаляем старые связанные данные (простое решение)
        cur.execute(f"DELETE FROM {schema}.course_landing_target_audience WHERE landing_id = %s", (landing_id,))
        cur.execute(f"DELETE FROM {schema}.course_landing_results WHERE landing_id = %s", (landing_id,))
        cur.execute(f"DELETE FROM {schema}.course_landing_program WHERE landing_id = %s", (landing_id,))
        cur.execute(f"DELETE FROM {schema}.course_landing_bonuses WHERE landing_id = %s", (landing_id,))
        
        # Добавляем новые связанные данные
        for item in body.get('target_audience', []):
            cur.execute(f"""
                INSERT INTO {schema}.course_landing_target_audience (landing_id, title, description, icon_url, sort_order)
                VALUES (%s, %s, %s, %s, %s)
            """, (landing_id, item.get('title'), item.get('description'), item.get('icon_url'), item.get('sort_order', 0)))
        
        for idx, result_text in enumerate(body.get('results', [])):
            cur.execute(f"""
                INSERT INTO {schema}.course_landing_results (landing_id, result_text, sort_order)
                VALUES (%s, %s, %s)
            """, (landing_id, result_text, idx))
        
        for item in body.get('program', []):
            cur.execute(f"""
                INSERT INTO {schema}.course_landing_program (landing_id, module_name, description, sort_order)
                VALUES (%s, %s, %s, %s)
            """, (landing_id, item.get('module_name'), item.get('description'), item.get('sort_order', 0)))
        
        for item in body.get('bonuses', []):
            cur.execute(f"""
                INSERT INTO {schema}.course_landing_bonuses (landing_id, bonus_name, description, sort_order)
                VALUES (%s, %s, %s, %s)
            """, (landing_id, item.get('bonus_name'), item.get('description'), item.get('sort_order', 0)))
        
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'message': 'Landing updated'}),
            'isBase64Encoded': False
        }
    
    cur.close()
    conn.close()
    return {
        'statusCode': 400,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Bad request'}),
        'isBase64Encoded': False
    }
