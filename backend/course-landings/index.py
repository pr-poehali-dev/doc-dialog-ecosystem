import json
import os
import psycopg2

def handler(event: dict, context) -> dict:
    """API для управления курсами-лендингами (1 курс = 1 лендинг-страница)"""
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Authorization'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    dsn = os.environ.get('DATABASE_URL')
    schema = 't_p46047379_doc_dialog_ecosystem'
    
    conn = psycopg2.connect(dsn)
    conn.autocommit = False
    cur = conn.cursor()
    
    try:
        query_params = event.get('queryStringParameters', {}) or {}
        course_id = query_params.get('id')
        slug = query_params.get('slug')
        school_id = query_params.get('school_id')
        preview = query_params.get('preview', 'false').lower() == 'true'
        
        # GET /course-landings?slug=X - Публичный просмотр курса-лендинга (preview для непроверенных)
        if method == 'GET' and slug:
            status_filter = "" if preview else "AND c.status IN ('published', 'approved', 'active')"
            cur.execute(f"""
                SELECT c.id, c.school_id, c.title, c.short_description, c.type, c.category, c.cover_url, 
                       c.cta_button_text, c.author_name, c.author_photo, c.author_position, 
                       c.author_description, c.author_experience, c.duration, c.lesson_format, 
                       c.support_available, c.access_period, c.city, c.location, c.event_dates, c.days_count,
                       c.price_text, c.payment_format, c.discount_info, c.partner_link,
                       c.promo_description, c.notification_email, c.notification_template,
                       c.seo_title, c.seo_description, c.slug,
                       s.name, s.logo_url, s.description, s.students_count
                FROM {schema}.courses c
                LEFT JOIN {schema}.schools s ON c.school_id = s.id
                WHERE c.slug = '{slug}' {status_filter}
            """)
            
            course = cur.fetchone()
            
            if not course:
                cur.close()
                conn.close()
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Course not found'}),
                    'isBase64Encoded': False
                }
            
            # Получаем связанные данные
            cur.execute(f"SELECT title, description, icon_url FROM {schema}.course_target_audience WHERE course_id = {course[0]} ORDER BY sort_order")
            target_audience = cur.fetchall()
            
            cur.execute(f"SELECT result_text FROM {schema}.course_results WHERE course_id = {course[0]} ORDER BY sort_order")
            results = cur.fetchall()
            
            cur.execute(f"SELECT module_name, description FROM {schema}.course_program WHERE course_id = {course[0]} ORDER BY sort_order")
            program = cur.fetchall()
            
            cur.execute(f"SELECT bonus_name, description FROM {schema}.course_bonuses WHERE course_id = {course[0]} ORDER BY sort_order")
            bonuses = cur.fetchall()
            
            # Получаем отзывы и рейтинг
            cur.execute(f"""
                SELECT AVG(rating)::DECIMAL(3,2), COUNT(*) 
                FROM {schema}.course_reviews 
                WHERE course_id = {course[0]} AND moderated = true
            """)
            rating_data = cur.fetchone()
            avg_rating = float(rating_data[0]) if rating_data[0] else 0.0
            reviews_count = rating_data[1] if rating_data[1] else 0
            
            cur.execute(f"""
                SELECT user_name, user_avatar_url, rating, review_text, created_at
                FROM {schema}.course_reviews
                WHERE course_id = {course[0]} AND moderated = true
                ORDER BY created_at DESC
                LIMIT 20
            """)
            reviews_list = cur.fetchall()
            
            result = {
                'id': course[0],
                'school': {
                    'id': course[1],
                    'name': course[31],
                    'logo': course[32],
                    'description': course[33],
                    'students_count': course[34]
                },
                'title': course[2],
                'short_description': course[3],
                'type': course[4],
                'category': course[5],
                'cover_url': course[6],
                'cta_button_text': course[7],
                'author': {
                    'name': course[8],
                    'photo_url': course[9],
                    'position': course[10],
                    'description': course[11],
                    'experience': course[12]
                },
                'learning_format': {
                    'duration': course[13],
                    'lesson_format': course[14],
                    'support_available': course[15],
                    'access_period': course[16],
                    'city': course[17],
                    'location': course[18],
                    'event_dates': course[19],
                    'days_count': course[20]
                },
                'pricing': {
                    'price_text': course[21],
                    'payment_format': course[22],
                    'discount_info': course[23],
                    'partner_link': course[24]
                },
                'promo': {
                    'description': course[25],
                    'notification_email': course[26],
                    'notification_template': course[27]
                },
                'seo': {
                    'title': course[28],
                    'description': course[29],
                    'slug': course[30]
                },
                'target_audience': [{'title': t[0], 'description': t[1], 'icon_url': t[2]} for t in target_audience],
                'results': [r[0] for r in results],
                'program': [{'module_name': p[0], 'description': p[1]} for p in program],
                'bonuses': [{'bonus_name': b[0], 'description': b[1]} for b in bonuses],
                'rating': {
                    'average': avg_rating,
                    'count': reviews_count,
                    'reviews': [{
                        'user_name': r[0],
                        'user_avatar_url': r[1],
                        'rating': r[2],
                        'review_text': r[3],
                        'created_at': r[4].isoformat() if r[4] else None
                    } for r in reviews_list]
                }
            }
            
            cur.close()
            conn.close()
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(result),
                'isBase64Encoded': False
            }
        
        # GET /course-landings?school_id=X - Список курсов школы
        if method == 'GET' and school_id:
            cur.execute(f"""
                SELECT id, title, short_description, type, category, cover_url, 
                       status, slug, created_at, updated_at, view_count
                FROM {schema}.courses
                WHERE school_id = {school_id}
                ORDER BY created_at DESC
            """)
            
            courses = cur.fetchall()
            
            result = [{
                'id': c[0],
                'title': c[1],
                'short_description': c[2],
                'type': c[3],
                'category': c[4],
                'cover_url': c[5],
                'status': c[6],
                'slug': c[7],
                'created_at': c[8].isoformat() if c[8] else None,
                'updated_at': c[9].isoformat() if c[9] else None,
                'view_count': c[10] or 0
            } for c in courses]
            
            cur.close()
            conn.close()
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(result),
                'isBase64Encoded': False
            }
        
        # GET /course-landings?id=X - Получить курс для редактирования
        if method == 'GET' and course_id:
            cur.execute(f"""
                SELECT id, school_id, title, short_description, type, category, cover_url, 
                       cta_button_text, author_name, author_photo, author_position, 
                       author_description, author_experience, duration, lesson_format, 
                       support_available, access_period, city, location, event_dates, days_count,
                       price_text, payment_format, discount_info, partner_link,
                       promo_description, notification_email, notification_template,
                       seo_title, seo_description, slug, status
                FROM {schema}.courses
                WHERE id = {course_id}
            """)
            
            course = cur.fetchone()
            
            if not course:
                cur.close()
                conn.close()
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Course not found'}),
                    'isBase64Encoded': False
                }
            
            # Получаем связанные данные
            cur.execute(f"SELECT title, description, icon_url, sort_order FROM {schema}.course_target_audience WHERE course_id = {course[0]} ORDER BY sort_order")
            target_audience = cur.fetchall()
            
            cur.execute(f"SELECT result_text FROM {schema}.course_results WHERE course_id = {course[0]} ORDER BY sort_order")
            results = cur.fetchall()
            
            cur.execute(f"SELECT module_name, description, sort_order FROM {schema}.course_program WHERE course_id = {course[0]} ORDER BY sort_order")
            program = cur.fetchall()
            
            cur.execute(f"SELECT bonus_name, description, sort_order FROM {schema}.course_bonuses WHERE course_id = {course[0]} ORDER BY sort_order")
            bonuses = cur.fetchall()
            
            result = {
                'id': course[0],
                'school_id': course[1],
                'title': course[2],
                'short_description': course[3],
                'type': course[4],
                'category': course[5],
                'cover_url': course[6],
                'cta_button_text': course[7],
                'author_name': course[8],
                'author_photo_url': course[9],
                'author_position': course[10],
                'author_description': course[11],
                'author_experience': course[12],
                'duration': course[13],
                'lesson_format': course[14],
                'support_available': course[15],
                'access_period': course[16],
                'city': course[17],
                'location': course[18],
                'event_dates': course[19],
                'days_count': course[20],
                'price_text': course[21],
                'payment_format': course[22],
                'discount_info': course[23],
                'partner_link': course[24],
                'promo_description': course[25],
                'notification_email': course[26],
                'notification_template': course[27],
                'seo_title': course[28],
                'seo_description': course[29],
                'slug': course[30],
                'status': course[31],
                'target_audience': [{'title': t[0], 'description': t[1], 'icon_url': t[2], 'sort_order': t[3]} for t in target_audience],
                'results': [r[0] for r in results],
                'program': [{'module_name': p[0], 'description': p[1], 'sort_order': p[2]} for p in program],
                'bonuses': [{'bonus_name': b[0], 'description': b[1], 'sort_order': b[2]} for b in bonuses]
            }
            
            cur.close()
            conn.close()
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(result),
                'isBase64Encoded': False
            }
        
        # POST /course-landings - Создать новый курс
        if method == 'POST':
            data = json.loads(event.get('body', '{}'))
            
            # Валидация обязательных полей
            if not data.get('title') or not data.get('partner_link') or not data.get('slug'):
                cur.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Missing required fields: title, partner_link, slug'}),
                    'isBase64Encoded': False
                }
            
            # Вставка основных данных курса
            cur.execute(f"""
                INSERT INTO {schema}.courses (
                    school_id, title, short_description, type, category, cover_url, cta_button_text,
                    author_name, author_photo, author_position, author_description, author_experience,
                    duration, lesson_format, support_available, access_period,
                    city, location, event_dates, days_count,
                    price_text, payment_format, discount_info, partner_link,
                    promo_description, notification_email, notification_template,
                    seo_title, seo_description, slug, status
                ) VALUES (
                    {data.get('school_id', 1)}, '{data.get('title', '').replace("'", "''")}', 
                    '{data.get('short_description', '').replace("'", "''")}', '{data.get('type', 'онлайн')}', 
                    '{data.get('category', '').replace("'", "''")}', '{data.get('cover_url', '')}', 
                    '{data.get('cta_button_text', 'Запросить промокод').replace("'", "''")}',
                    '{data.get('author_name', '').replace("'", "''")}', '{data.get('author_photo_url', '')}', 
                    '{data.get('author_position', '').replace("'", "''")}', '{data.get('author_description', '').replace("'", "''")}', 
                    '{data.get('author_experience', '').replace("'", "''")}',
                    '{data.get('duration', '').replace("'", "''")}', '{data.get('lesson_format', '').replace("'", "''")}', 
                    {data.get('support_available', False)}, '{data.get('access_period', '').replace("'", "''")}',
                    '{data.get('city', '').replace("'", "''")}', '{data.get('location', '').replace("'", "''")}', 
                    '{data.get('event_dates', '').replace("'", "''")}', {data.get('days_count') or 'NULL'},
                    '{data.get('price_text', '').replace("'", "''")}', '{data.get('payment_format', '').replace("'", "''")}', 
                    '{data.get('discount_info', '').replace("'", "''")}', '{data.get('partner_link', '').replace("'", "''")}',
                    '{data.get('promo_description', '').replace("'", "''")}', '{data.get('notification_email', '')}', 
                    '{data.get('notification_template', '').replace("'", "''")}',
                    '{data.get('seo_title', '').replace("'", "''")}', '{data.get('seo_description', '').replace("'", "''")}', 
                    '{data.get('slug', '')}', '{data.get('status', 'draft')}'
                ) RETURNING id
            """)
            
            course_id = cur.fetchone()[0]
            
            # Вставка целевой аудитории
            for idx, item in enumerate(data.get('target_audience', [])):
                if item.get('title'):
                    cur.execute(f"""
                        INSERT INTO {schema}.course_target_audience (course_id, title, description, icon_url, sort_order)
                        VALUES ({course_id}, '{item.get('title', '').replace("'", "''")}', '{item.get('description', '').replace("'", "''")}', 
                                '{item.get('icon_url', '')}', {idx})
                    """)
            
            # Вставка результатов
            for idx, result_text in enumerate(data.get('results', [])):
                if result_text:
                    cur.execute(f"""
                        INSERT INTO {schema}.course_results (course_id, result_text, sort_order)
                        VALUES ({course_id}, '{result_text.replace("'", "''")}', {idx})
                    """)
            
            # Вставка программы
            for idx, module in enumerate(data.get('program', [])):
                if module.get('module_name'):
                    cur.execute(f"""
                        INSERT INTO {schema}.course_program (course_id, module_name, description, sort_order)
                        VALUES ({course_id}, '{module.get('module_name', '').replace("'", "''")}', 
                                '{module.get('description', '').replace("'", "''")}', {idx})
                    """)
            
            # Вставка бонусов
            for idx, bonus in enumerate(data.get('bonuses', [])):
                if bonus.get('bonus_name'):
                    cur.execute(f"""
                        INSERT INTO {schema}.course_bonuses (course_id, bonus_name, description, sort_order)
                        VALUES ({course_id}, '{bonus.get('bonus_name', '').replace("'", "''")}', 
                                '{bonus.get('description', '').replace("'", "''")}', {idx})
                    """)
            
            conn.commit()
            
            # Получаем slug созданного курса
            cur.execute(f"SELECT slug FROM {schema}.courses WHERE id = {course_id}")
            course_slug = cur.fetchone()[0]
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 201,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'id': course_id, 'slug': course_slug, 'message': 'Course created successfully'}),
                'isBase64Encoded': False
            }
        
        # PUT /course-landings?id=X - Обновить курс
        if method == 'PUT' and course_id:
            data = json.loads(event.get('body', '{}'))
            
            # Обновление основных данных
            cur.execute(f"""
                UPDATE {schema}.courses SET
                    title = '{data.get('title', '').replace("'", "''")}',
                    short_description = '{data.get('short_description', '').replace("'", "''")}',
                    type = '{data.get('type', 'онлайн')}',
                    category = '{data.get('category', '').replace("'", "''")}',
                    cover_url = '{data.get('cover_url', '')}',
                    cta_button_text = '{data.get('cta_button_text', 'Запросить промокод').replace("'", "''")}',
                    author_name = '{data.get('author_name', '').replace("'", "''")}',
                    author_photo = '{data.get('author_photo_url', '')}',
                    author_position = '{data.get('author_position', '').replace("'", "''")}',
                    author_description = '{data.get('author_description', '').replace("'", "''")}',
                    author_experience = '{data.get('author_experience', '').replace("'", "''")}',
                    duration = '{data.get('duration', '').replace("'", "''")}',
                    lesson_format = '{data.get('lesson_format', '').replace("'", "''")}',
                    support_available = {data.get('support_available', False)},
                    access_period = '{data.get('access_period', '').replace("'", "''")}',
                    city = '{data.get('city', '').replace("'", "''")}',
                    location = '{data.get('location', '').replace("'", "''")}',
                    event_dates = '{data.get('event_dates', '').replace("'", "''")}',
                    days_count = {data.get('days_count') or 'NULL'},
                    price_text = '{data.get('price_text', '').replace("'", "''")}',
                    payment_format = '{data.get('payment_format', '').replace("'", "''")}',
                    discount_info = '{data.get('discount_info', '').replace("'", "''")}',
                    partner_link = '{data.get('partner_link', '').replace("'", "''")}',
                    promo_description = '{data.get('promo_description', '').replace("'", "''")}',
                    notification_email = '{data.get('notification_email', '')}',
                    notification_template = '{data.get('notification_template', '').replace("'", "''")}',
                    seo_title = '{data.get('seo_title', '').replace("'", "''")}',
                    seo_description = '{data.get('seo_description', '').replace("'", "''")}',
                    slug = '{data.get('slug', '')}',
                    status = '{data.get('status', 'draft')}',
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = {course_id}
            """)
            
            # Удаляем старые связанные записи
            cur.execute(f"DELETE FROM {schema}.course_target_audience WHERE course_id = {course_id}")
            cur.execute(f"DELETE FROM {schema}.course_results WHERE course_id = {course_id}")
            cur.execute(f"DELETE FROM {schema}.course_program WHERE course_id = {course_id}")
            cur.execute(f"DELETE FROM {schema}.course_bonuses WHERE course_id = {course_id}")
            
            # Вставка новых данных
            for idx, item in enumerate(data.get('target_audience', [])):
                if item.get('title'):
                    cur.execute(f"""
                        INSERT INTO {schema}.course_target_audience (course_id, title, description, icon_url, sort_order)
                        VALUES ({course_id}, '{item.get('title', '').replace("'", "''")}', '{item.get('description', '').replace("'", "''")}', 
                                '{item.get('icon_url', '')}', {idx})
                    """)
            
            for idx, result_text in enumerate(data.get('results', [])):
                if result_text:
                    cur.execute(f"""
                        INSERT INTO {schema}.course_results (course_id, result_text, sort_order)
                        VALUES ({course_id}, '{result_text.replace("'", "''")}', {idx})
                    """)
            
            for idx, module in enumerate(data.get('program', [])):
                if module.get('module_name'):
                    cur.execute(f"""
                        INSERT INTO {schema}.course_program (course_id, module_name, description, sort_order)
                        VALUES ({course_id}, '{module.get('module_name', '').replace("'", "''")}', 
                                '{module.get('description', '').replace("'", "''")}', {idx})
                    """)
            
            for idx, bonus in enumerate(data.get('bonuses', [])):
                if bonus.get('bonus_name'):
                    cur.execute(f"""
                        INSERT INTO {schema}.course_bonuses (course_id, bonus_name, description, sort_order)
                        VALUES ({course_id}, '{bonus.get('bonus_name', '').replace("'", "''")}', 
                                '{bonus.get('description', '').replace("'", "''")}', {idx})
                    """)
            
            conn.commit()
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'message': 'Course updated successfully'}),
                'isBase64Encoded': False
            }
        
        cur.close()
        conn.close()
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Invalid request'}),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        conn.rollback()
        cur.close()
        conn.close()
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }