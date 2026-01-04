import json
import os
import psycopg2
from datetime import datetime

def handler(event: dict, context) -> dict:
    """API для управления курсами, мастермайндами и запросами на специалистов от школ"""
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Authorization'
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
    action = query_params.get('action', '')
    entity_type = query_params.get('type', 'courses')
    course_id = query_params.get('id')
    slug = query_params.get('slug')
    
    # GET /courses?slug=X - Get course by slug with full landing data
    if method == 'GET' and slug and not action:
        cur.execute(f"""
            SELECT id, slug, title, short_description, hero_title, hero_subtitle, 
                   category, type, price, duration_text, about_course, for_whom, expectations,
                   what_you_learn, program_modules, author_name, author_position, 
                   author_bio, author_photo, author_experience, benefits, 
                   testimonials, faq, cta_button_text, cta_button_url
            FROM {schema}.courses
            WHERE slug = '{slug}' AND status = 'approved'
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
        
        result = {
            'id': course[0],
            'slug': course[1],
            'title': course[2],
            'short_description': course[3],
            'hero_title': course[4],
            'hero_subtitle': course[5],
            'category': course[6],
            'type': course[7],
            'price': float(course[8]) if course[8] else None,
            'duration_text': course[9],
            'about_course': course[10],
            'for_whom': course[11],
            'expectations': course[12],
            'what_you_learn': course[13] if course[13] else [],
            'program_modules': course[14] if course[14] else [],
            'author_name': course[15],
            'author_position': course[16],
            'author_bio': course[17],
            'author_photo': course[18],
            'author_experience': course[19],
            'benefits': course[20] if course[20] else [],
            'testimonials': course[21] if course[21] else [],
            'faq': course[22] if course[22] else [],
            'cta_button_text': course[23],
            'cta_button_url': course[24]
        }
        
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(result),
            'isBase64Encoded': False
        }
    
    # GET /courses?id=X - Get single course with full details + increment view counter
    if method == 'GET' and course_id and not action:
        cur.execute(f"""
            SELECT c.id, c.school_id, COALESCE(c.school_name, s.name) as school_name, c.title, c.description, 
                   c.category, c.course_type, c.price, c.currency, c.duration_hours, 
                   c.image_url, c.external_url, c.status, c.original_price, c.discount_price,
                   c.author_name, c.author_photo, c.course_content, c.view_count, c.author_position, c.co_authors, c.created_at
            FROM {schema}.courses c
            LEFT JOIN {schema}.schools s ON c.school_id = s.id
            WHERE c.id = {course_id} AND c.status = 'approved'
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
        
        cur.execute(f"UPDATE {schema}.courses SET view_count = view_count + 1 WHERE id = {course_id}")
        
        result = {
            'id': course[0],
            'school_id': course[1],
            'school_name': course[2],
            'title': course[3],
            'description': course[4],
            'category': course[5],
            'course_type': course[6],
            'price': float(course[7]) if course[7] else None,
            'currency': course[8],
            'duration_hours': course[9],
            'image_url': course[10],
            'external_url': course[11],
            'status': course[12],
            'original_price': float(course[13]) if course[13] else None,
            'discount_price': float(course[14]) if course[14] else None,
            'author_name': course[15],
            'author_photo': course[16],
            'course_content': course[17],
            'view_count': course[18],
            'author_position': course[19],
            'co_authors': course[20],
            'created_at': course[21].isoformat() if course[21] else None
        }
        
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(result),
            'isBase64Encoded': False
        }
    
    # GET /courses - List courses (public or by school)
    if method == 'GET' and not action:
        school_id = query_params.get('school_id')
        status_filter = query_params.get('status', 'approved')
        category = query_params.get('category')
        
        query = f"""
            SELECT c.id, c.school_id, c.title, c.description, c.category, c.course_type, 
                   c.price, c.currency, c.duration_hours, c.image_url, c.external_url, 
                   c.status, c.moderation_comment, c.original_price, c.discount_price, 
                   c.view_count, c.created_at, c.slug,
                   cp.promoted_until, cp.promotion_type
            FROM {schema}.courses c
            LEFT JOIN {schema}.course_promotions cp ON c.id = cp.course_id 
                AND cp.promoted_until > NOW()
        """
        
        conditions = ["1=1"]
        if school_id:
            conditions.append(f"c.school_id = {school_id}")
        if status_filter and status_filter != 'all':
            conditions.append(f"c.status = '{status_filter}'")
        if category:
            conditions.append(f"c.category = '{category}'")
            
        if len(conditions) > 0:
            query += " WHERE " + " AND ".join(conditions)
        
        # Сортировка: сначала промо (по дате окончания DESC), потом обычные (по created_at DESC)
        query += " ORDER BY cp.promoted_until DESC NULLS LAST, c.created_at DESC"
        
        cur.execute(query)
        courses = cur.fetchall()
        
        result = [{
            'id': c[0],
            'school_id': c[1],
            'title': c[2],
            'description': c[3],
            'category': c[4],
            'course_type': c[5],
            'price': float(c[6]) if c[6] else None,
            'currency': c[7],
            'duration_hours': c[8],
            'image_url': c[9],
            'external_url': c[10],
            'status': c[11],
            'moderation_comment': c[12],
            'original_price': float(c[13]) if c[13] else None,
            'discount_price': float(c[14]) if c[14] else None,
            'view_count': c[15] or 0,
            'created_at': c[16].isoformat() if c[16] else None,
            'slug': c[17],
            'is_promoted': c[18] is not None,
            'promoted_until': c[18].isoformat() if c[18] else None,
            'promotion_type': c[19]
        } for c in courses]
        
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(result),
            'isBase64Encoded': False
        }
    
    # GET /courses?action=masterminds&id=X - Get single mastermind with full details + increment view counter
    if method == 'GET' and action == 'masterminds' and course_id:
        cur.execute(f"""
            SELECT m.id, m.school_id, COALESCE(m.school_name, s.name) as school_name, m.title, m.description,
                   m.event_date, m.location, m.max_participants, m.current_participants,
                   m.price, m.currency, m.image_url, m.external_url, m.status,
                   m.original_price, m.discount_price, m.author_name, m.author_photo,
                   m.event_content, m.view_count, m.author_position, m.co_authors, m.created_at
            FROM {schema}.masterminds m
            LEFT JOIN {schema}.schools s ON m.school_id = s.id
            WHERE m.id = {course_id} AND m.status = 'approved'
        """)
        mastermind = cur.fetchone()
        
        if not mastermind:
            cur.close()
            conn.close()
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Mastermind not found'}),
                'isBase64Encoded': False
            }
        
        cur.execute(f"UPDATE {schema}.masterminds SET view_count = view_count + 1 WHERE id = {course_id}")
        
        result = {
            'id': mastermind[0],
            'school_id': mastermind[1],
            'school_name': mastermind[2],
            'title': mastermind[3],
            'description': mastermind[4],
            'event_date': mastermind[5].isoformat() if mastermind[5] else None,
            'location': mastermind[6],
            'max_participants': mastermind[7],
            'current_participants': mastermind[8],
            'price': float(mastermind[9]) if mastermind[9] else None,
            'currency': mastermind[10],
            'image_url': mastermind[11],
            'external_url': mastermind[12],
            'status': mastermind[13],
            'original_price': float(mastermind[14]) if mastermind[14] else None,
            'discount_price': float(mastermind[15]) if mastermind[15] else None,
            'author_name': mastermind[16],
            'author_photo': mastermind[17],
            'event_content': mastermind[18],
            'view_count': mastermind[19],
            'author_position': mastermind[20],
            'co_authors': mastermind[21],
            'created_at': mastermind[22].isoformat() if mastermind[22] else None
        }
        
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(result),
            'isBase64Encoded': False
        }
    
    # GET /courses?action=masterminds - List masterminds
    if method == 'GET' and action == 'masterminds':
        school_id = query_params.get('school_id')
        status_filter = query_params.get('status', 'approved')
        
        query = f"SELECT id, school_id, title, description, event_date, location, max_participants, current_participants, price, currency, image_url, external_url, status, original_price, discount_price, view_count, created_at FROM {schema}.masterminds WHERE 1=1"
        
        if school_id:
            query += f" AND school_id = {school_id}"
        if status_filter and status_filter != 'all':
            query += f" AND status = '{status_filter}'"
        
        query += " ORDER BY event_date ASC"
        
        cur.execute(query)
        masterminds = cur.fetchall()
        
        result = [{
            'id': m[0],
            'school_id': m[1],
            'title': m[2],
            'description': m[3],
            'event_date': m[4].isoformat() if m[4] else None,
            'location': m[5],
            'max_participants': m[6],
            'current_participants': m[7],
            'price': float(m[8]) if m[8] else None,
            'currency': m[9],
            'image_url': m[10],
            'external_url': m[11],
            'status': m[12],
            'original_price': float(m[13]) if m[13] else None,
            'discount_price': float(m[14]) if m[14] else None,
            'view_count': m[15] or 0,
            'created_at': m[16].isoformat() if m[16] else None
        } for m in masterminds]
        
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(result),
            'isBase64Encoded': False
        }
    
    # GET /courses?action=specialists - List specialist requests
    if method == 'GET' and action == 'specialists':
        school_id = query_params.get('school_id')
        status_filter = query_params.get('status', 'active')
        
        query = f"SELECT id, school_id, title, description, specialty, budget_from, budget_to, currency, location, deadline_date, status, created_at FROM {schema}.specialist_requests WHERE 1=1"
        
        if school_id:
            query += f" AND school_id = {school_id}"
        if status_filter and status_filter != 'all':
            query += f" AND status = '{status_filter}'"
        
        query += " ORDER BY created_at DESC"
        
        cur.execute(query)
        requests = cur.fetchall()
        
        result = [{
            'id': r[0],
            'school_id': r[1],
            'title': r[2],
            'description': r[3],
            'specialty': r[4],
            'budget_from': float(r[5]) if r[5] else None,
            'budget_to': float(r[6]) if r[6] else None,
            'currency': r[7],
            'location': r[8],
            'deadline_date': r[9].isoformat() if r[9] else None,
            'status': r[10],
            'created_at': r[11].isoformat() if r[11] else None
        } for r in requests]
        
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(result),
            'isBase64Encoded': False
        }
    
    # POST /courses - Create new course with full landing data
    if method == 'POST' and entity_type == 'courses':
        body = json.loads(event.get('body', '{}'))
        
        school_id = body.get('school_id', 1)
        title = body.get('title')
        description = body.get('description', '')
        category = body.get('category')
        course_type = body.get('type', 'online')
        price_str = body.get('price', '').replace('₽', '').replace(' ', '').strip()
        price = float(price_str) if price_str and price_str.replace('.', '').isdigit() else None
        currency = 'RUB'
        short_description = body.get('shortDescription', '')
        
        # Новые поля лендинга
        hero_title = body.get('heroTitle', '')
        hero_subtitle = body.get('heroSubtitle', '')
        about_course = body.get('aboutCourse', '')
        what_you_learn = json.dumps(body.get('whatYouLearn', []))
        program_modules = json.dumps(body.get('programModules', []))
        author_data = body.get('author', {})
        author_name = author_data.get('name', '')
        author_photo = author_data.get('photo', '')
        author_bio = author_data.get('bio', '')
        author_experience = author_data.get('experience', '')
        author_position = author_data.get('position', '')
        benefits = json.dumps(body.get('benefits', []))
        testimonials = json.dumps(body.get('testimonials', []))
        faq = json.dumps(body.get('faq', []))
        cta_button_text = body.get('ctaButtonText', 'Записаться на курс')
        cta_button_url = body.get('ctaButtonUrl', '')
        duration_text = body.get('duration', '')
        
        # Генерация slug
        import re
        slug = re.sub(r'[^a-zA-Z0-9а-яА-Я\-]', '-', title.lower()).strip('-')
        slug = re.sub(r'-+', '-', slug)
        base_slug = slug
        counter = 1
        while True:
            cur.execute(f"SELECT id FROM {schema}.courses WHERE slug = '{slug}'")
            if not cur.fetchone():
                break
            slug = f"{base_slug}-{counter}"
            counter += 1
        
        if not all([title, category, cta_button_url]):
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Missing required fields'}),
                'isBase64Encoded': False
            }
        
        # Создаём баланс для школы, если его нет
        cur.execute(f"""
            INSERT INTO {schema}.school_balance (school_id, balance)
            VALUES ({school_id}, 0.00)
            ON CONFLICT (school_id) DO NOTHING
        """)
        
        cur.execute(f"""
            INSERT INTO {schema}.courses (
                school_id, title, description, short_description, category, course_type, type,
                price, currency, duration_text, external_url, slug,
                hero_title, hero_subtitle, about_course,
                what_you_learn, program_modules, benefits, testimonials, faq,
                author_name, author_photo, author_bio, author_experience, author_position,
                cta_button_text, cta_button_url, status
            )
            VALUES (
                {school_id}, '{title.replace("'", "''")}', '{description.replace("'", "''")}',
                '{short_description.replace("'", "''")}', '{category}', '{course_type}', '{course_type}',
                {price if price else 'NULL'}, '{currency}', '{duration_text.replace("'", "''")}',
                '{cta_button_url}', '{slug}',
                '{hero_title.replace("'", "''")}', '{hero_subtitle.replace("'", "''")}',
                '{about_course.replace("'", "''")}', '{what_you_learn}', '{program_modules}',
                '{benefits}', '{testimonials}', '{faq}',
                '{author_name.replace("'", "''")}', {f"'{author_photo}'" if author_photo else 'NULL'},
                '{author_bio.replace("'", "''")}', '{author_experience.replace("'", "''")}',
                '{author_position.replace("'", "''")}',
                '{cta_button_text.replace("'", "''")}', '{cta_button_url}', 'pending'
            )
            RETURNING id, title, slug, status, created_at
        """)
        
        new_course = cur.fetchone()
        
        result = {
            'id': new_course[0],
            'title': new_course[1],
            'slug': new_course[2],
            'status': new_course[3],
            'created_at': new_course[4].isoformat() if new_course[4] else None
        }
        
        cur.close()
        conn.close()
        return {
            'statusCode': 201,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(result),
            'isBase64Encoded': False
        }
    
    # POST /courses?type=masterminds - Create mastermind
    if method == 'POST' and entity_type == 'masterminds':
        body = json.loads(event.get('body', '{}'))
        
        school_id = body.get('school_id')
        title = body.get('title')
        description = body.get('description', '')
        event_date = body.get('event_date')
        location = body.get('location')
        max_participants = body.get('max_participants')
        price = body.get('price')
        currency = body.get('currency', 'RUB')
        image_url = body.get('image_url')
        external_url = body.get('external_url')
        original_price = body.get('original_price')
        discount_price = body.get('discount_price')
        author_name = body.get('author_name', '')
        author_photo = body.get('author_photo')
        event_content = body.get('event_content', '')
        school_name = body.get('school_name', '')
        
        if not all([school_id, title, event_date, external_url]):
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Missing required fields'}),
                'isBase64Encoded': False
            }
        
        cur.execute(f"""
            INSERT INTO {schema}.masterminds (school_id, title, description, event_date, location, max_participants, price, currency, image_url, external_url, original_price, discount_price, author_name, author_photo, event_content, school_name, status)
            VALUES ({school_id}, '{title.replace("'", "''")}', '{description.replace("'", "''")}', '{event_date}', {f"'{location}'" if location else 'NULL'}, {max_participants if max_participants else 'NULL'}, {price if price else 'NULL'}, '{currency}', {f"'{image_url}'" if image_url else 'NULL'}, '{external_url}', {original_price if original_price else 'NULL'}, {discount_price if discount_price else 'NULL'}, '{author_name.replace("'", "''")}', {f"'{author_photo}'" if author_photo else 'NULL'}, '{event_content.replace("'", "''")}', '{school_name.replace("'", "''")}', 'pending')
            RETURNING id, title, status, created_at
        """)
        
        new_mastermind = cur.fetchone()
        
        result = {
            'id': new_mastermind[0],
            'title': new_mastermind[1],
            'status': new_mastermind[2],
            'created_at': new_mastermind[3].isoformat() if new_mastermind[3] else None
        }
        
        cur.close()
        conn.close()
        return {
            'statusCode': 201,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(result),
            'isBase64Encoded': False
        }
    
    # POST /courses?type=specialists - Create specialist request
    if method == 'POST' and entity_type == 'specialists':
        body = json.loads(event.get('body', '{}'))
        
        school_id = body.get('school_id')
        title = body.get('title')
        description = body.get('description')
        specialty = body.get('specialty')
        budget_from = body.get('budget_from')
        budget_to = body.get('budget_to')
        currency = body.get('currency', 'RUB')
        location = body.get('location')
        deadline_date = body.get('deadline_date')
        
        if not all([school_id, title, description, specialty]):
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Missing required fields'}),
                'isBase64Encoded': False
            }
        
        cur.execute(f"""
            INSERT INTO {schema}.specialist_requests (school_id, title, description, specialty, budget_from, budget_to, currency, location, deadline_date, status)
            VALUES ({school_id}, '{title.replace("'", "''")}', '{description.replace("'", "''")}', '{specialty}', {budget_from if budget_from else 'NULL'}, {budget_to if budget_to else 'NULL'}, '{currency}', {f"'{location}'" if location else 'NULL'}, {f"'{deadline_date}'" if deadline_date else 'NULL'}, 'active')
            RETURNING id, title, status, created_at
        """)
        
        new_request = cur.fetchone()
        
        result = {
            'id': new_request[0],
            'title': new_request[1],
            'status': new_request[2],
            'created_at': new_request[3].isoformat() if new_request[3] else None
        }
        
        cur.close()
        conn.close()
        return {
            'statusCode': 201,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(result),
            'isBase64Encoded': False
        }
    
    # PUT /courses?type=courses&id=X - Update course (sends to moderation)
    if method == 'PUT' and entity_type == 'courses':
        course_id = query_params.get('id')
        if not course_id:
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Missing course id'}),
                'isBase64Encoded': False
            }
        
        body = json.loads(event.get('body', '{}'))
        
        title = body.get('title')
        description = body.get('description', '')
        category = body.get('category')
        course_type = body.get('course_type')
        price = body.get('price')
        currency = body.get('currency', 'RUB')
        duration_hours = body.get('duration_hours')
        image_url = body.get('image_url')
        external_url = body.get('external_url')
        original_price = body.get('original_price')
        discount_price = body.get('discount_price')
        author_name = body.get('author_name', '')
        author_photo = body.get('author_photo')
        course_content = body.get('course_content', '')
        school_name = body.get('school_name', '')
        
        if not all([title, category, course_type, external_url]):
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Missing required fields'}),
                'isBase64Encoded': False
            }
        
        cur.execute(f"""
            UPDATE {schema}.courses
            SET title = '{title.replace("'", "''")}',
                description = '{description.replace("'", "''")}',
                category = '{category}',
                course_type = '{course_type}',
                price = {price if price else 'NULL'},
                currency = '{currency}',
                duration_hours = {duration_hours if duration_hours else 'NULL'},
                image_url = {f"'{image_url}'" if image_url else 'NULL'},
                external_url = '{external_url}',
                original_price = {original_price if original_price else 'NULL'},
                discount_price = {discount_price if discount_price else 'NULL'},
                author_name = '{author_name.replace("'", "''")}',
                author_photo = {f"'{author_photo}'" if author_photo else 'NULL'},
                course_content = '{course_content.replace("'", "''")}',
                school_name = '{school_name.replace("'", "''")}',
                status = 'pending',
                updated_at = NOW()
            WHERE id = {course_id}
            RETURNING id, title, status
        """)
        
        updated_course = cur.fetchone()
        
        if not updated_course:
            cur.close()
            conn.close()
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Course not found'}),
                'isBase64Encoded': False
            }
        
        result = {
            'id': updated_course[0],
            'title': updated_course[1],
            'status': updated_course[2]
        }
        
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(result),
            'isBase64Encoded': False
        }
    
    # DELETE /courses?type=courses&id=X - Delete course
    if method == 'DELETE' and entity_type == 'courses':
        course_id = query_params.get('id')
        if not course_id:
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Missing course id'}),
                'isBase64Encoded': False
            }
        
        cur.execute(f"DELETE FROM {schema}.courses WHERE id = {course_id} RETURNING id")
        deleted = cur.fetchone()
        
        if not deleted:
            cur.close()
            conn.close()
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Course not found'}),
                'isBase64Encoded': False
            }
        
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'message': 'Course deleted successfully'}),
            'isBase64Encoded': False
        }
    
    # PUT /courses?type=masterminds&id=X - Update mastermind
    if method == 'PUT' and entity_type == 'masterminds':
        mastermind_id = query_params.get('id')
        if not mastermind_id:
            cur.close()
            conn.close()
            return {'statusCode': 400, 'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'error': 'Missing mastermind id'}), 'isBase64Encoded': False}
        
        body = json.loads(event.get('body', '{}'))
        title = body.get('title')
        description = body.get('description', '')
        event_date = body.get('event_date')
        location = body.get('location')
        max_participants = body.get('max_participants')
        price = body.get('price')
        currency = body.get('currency', 'RUB')
        image_url = body.get('image_url')
        external_url = body.get('external_url')
        original_price = body.get('original_price')
        discount_price = body.get('discount_price')
        author_name = body.get('author_name', '')
        author_photo = body.get('author_photo')
        event_content = body.get('event_content', '')
        school_name = body.get('school_name', '')
        
        if not all([title, event_date, external_url]):
            cur.close()
            conn.close()
            return {'statusCode': 400, 'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'error': 'Missing required fields'}), 'isBase64Encoded': False}
        
        cur.execute(f"""
            UPDATE {schema}.masterminds
            SET title = '{title.replace("'", "''")}', description = '{description.replace("'", "''")}', event_date = '{event_date}', 
                location = {f"'{location}'" if location else 'NULL'}, max_participants = {max_participants if max_participants else 'NULL'}, 
                price = {price if price else 'NULL'}, currency = '{currency}', image_url = {f"'{image_url}'" if image_url else 'NULL'}, 
                external_url = '{external_url}', original_price = {original_price if original_price else 'NULL'}, 
                discount_price = {discount_price if discount_price else 'NULL'}, author_name = '{author_name.replace("'", "''")}', 
                author_photo = {f"'{author_photo}'" if author_photo else 'NULL'}, event_content = '{event_content.replace("'", "''")}', 
                school_name = '{school_name.replace("'", "''")}', status = 'pending', updated_at = NOW()
            WHERE id = {mastermind_id}
            RETURNING id, title, status
        """)
        updated = cur.fetchone()
        if not updated:
            cur.close()
            conn.close()
            return {'statusCode': 404, 'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'error': 'Mastermind not found'}), 'isBase64Encoded': False}
        
        cur.close()
        conn.close()
        return {'statusCode': 200, 'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'id': updated[0], 'title': updated[1], 'status': updated[2]}), 'isBase64Encoded': False}
    
    # DELETE /courses?type=masterminds&id=X - Delete mastermind
    if method == 'DELETE' and entity_type == 'masterminds':
        mastermind_id = query_params.get('id')
        if not mastermind_id:
            cur.close()
            conn.close()
            return {'statusCode': 400, 'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'error': 'Missing mastermind id'}), 'isBase64Encoded': False}
        
        cur.execute(f"DELETE FROM {schema}.masterminds WHERE id = {mastermind_id} RETURNING id")
        deleted = cur.fetchone()
        if not deleted:
            cur.close()
            conn.close()
            return {'statusCode': 404, 'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'error': 'Mastermind not found'}), 'isBase64Encoded': False}
        
        cur.close()
        conn.close()
        return {'statusCode': 200, 'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'message': 'Mastermind deleted'}), 'isBase64Encoded': False}
    
    # PUT /courses?type=specialists&id=X - Update specialist request
    if method == 'PUT' and entity_type == 'specialists':
        spec_id = query_params.get('id')
        if not spec_id:
            cur.close()
            conn.close()
            return {'statusCode': 400, 'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'error': 'Missing specialist id'}), 'isBase64Encoded': False}
        
        body = json.loads(event.get('body', '{}'))
        title = body.get('title')
        description = body.get('description', '')
        specialty = body.get('specialty')
        budget_from = body.get('budget_from')
        budget_to = body.get('budget_to')
        currency = body.get('currency', 'RUB')
        location = body.get('location')
        deadline_date = body.get('deadline_date')
        
        if not all([title, description, specialty]):
            cur.close()
            conn.close()
            return {'statusCode': 400, 'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'error': 'Missing required fields'}), 'isBase64Encoded': False}
        
        cur.execute(f"""
            UPDATE {schema}.specialist_requests
            SET title = '{title.replace("'", "''")}', description = '{description.replace("'", "''")}', specialty = '{specialty}',
                budget_from = {budget_from if budget_from else 'NULL'}, budget_to = {budget_to if budget_to else 'NULL'}, currency = '{currency}',
                location = {f"'{location}'" if location else 'NULL'}, deadline_date = {f"'{deadline_date}'" if deadline_date else 'NULL'}
            WHERE id = {spec_id}
            RETURNING id, title, status
        """)
        updated = cur.fetchone()
        if not updated:
            cur.close()
            conn.close()
            return {'statusCode': 404, 'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'error': 'Specialist request not found'}), 'isBase64Encoded': False}
        
        cur.close()
        conn.close()
        return {'statusCode': 200, 'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'id': updated[0], 'title': updated[1], 'status': updated[2]}), 'isBase64Encoded': False}
    
    # DELETE /courses?type=specialists&id=X - Delete specialist request
    if method == 'DELETE' and entity_type == 'specialists':
        spec_id = query_params.get('id')
        if not spec_id:
            cur.close()
            conn.close()
            return {'statusCode': 400, 'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'error': 'Missing specialist id'}), 'isBase64Encoded': False}
        
        cur.execute(f"DELETE FROM {schema}.specialist_requests WHERE id = {spec_id} RETURNING id")
        deleted = cur.fetchone()
        if not deleted:
            cur.close()
            conn.close()
            return {'statusCode': 404, 'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'error': 'Specialist request not found'}), 'isBase64Encoded': False}
        
        cur.close()
        conn.close()
        return {'statusCode': 200, 'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'message': 'Specialist request deleted'}), 'isBase64Encoded': False}
    
    cur.close()
    conn.close()
    return {
        'statusCode': 404,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Endpoint not found'}),
        'isBase64Encoded': False
    }