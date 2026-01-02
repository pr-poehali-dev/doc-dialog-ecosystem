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
    
    # GET /courses - List courses (public or by school)
    if method == 'GET' and not action:
        school_id = query_params.get('school_id')
        status_filter = query_params.get('status', 'approved')
        category = query_params.get('category')
        
        query = f"SELECT id, school_id, title, description, category, course_type, price, currency, duration_hours, image_url, external_url, status, moderation_comment, original_price, discount_price, created_at FROM {schema}.courses WHERE 1=1"
        
        if school_id:
            query += f" AND school_id = {school_id}"
        if status_filter and status_filter != 'all':
            query += f" AND status = '{status_filter}'"
        if category:
            query += f" AND category = '{category}'"
        
        query += " ORDER BY created_at DESC"
        
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
            'created_at': c[15].isoformat() if c[15] else None
        } for c in courses]
        
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
        
        query = f"SELECT id, school_id, title, description, event_date, location, max_participants, current_participants, price, currency, image_url, external_url, status, created_at FROM {schema}.masterminds WHERE 1=1"
        
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
            'created_at': m[13].isoformat() if m[13] else None
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
    
    # POST /courses - Create new course
    if method == 'POST' and entity_type == 'courses':
        body = json.loads(event.get('body', '{}'))
        
        school_id = body.get('school_id')
        title = body.get('title')
        description = body.get('description', '')
        category = body.get('category')
        course_type = body.get('course_type')
        price = body.get('price')
        currency = body.get('currency', 'RUB')
        duration_hours = body.get('duration_hours')
        image_url = body.get('image_url')
        external_url = body.get('external_url')
        
        if not all([school_id, title, category, course_type, external_url]):
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Missing required fields'}),
                'isBase64Encoded': False
            }
        
        original_price = body.get('original_price')
        discount_price = body.get('discount_price')
        
        cur.execute(f"""
            INSERT INTO {schema}.courses (school_id, title, description, category, course_type, price, currency, duration_hours, image_url, external_url, original_price, discount_price, status)
            VALUES ({school_id}, '{title.replace("'", "''")}', '{description.replace("'", "''")}', '{category}', '{course_type}', {price if price else 'NULL'}, '{currency}', {duration_hours if duration_hours else 'NULL'}, {f"'{image_url}'" if image_url else 'NULL'}, '{external_url}', {original_price if original_price else 'NULL'}, {discount_price if discount_price else 'NULL'}, 'pending')
            RETURNING id, title, status, created_at
        """)
        
        new_course = cur.fetchone()
        
        result = {
            'id': new_course[0],
            'title': new_course[1],
            'status': new_course[2],
            'created_at': new_course[3].isoformat() if new_course[3] else None
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
            INSERT INTO {schema}.masterminds (school_id, title, description, event_date, location, max_participants, price, currency, image_url, external_url, status)
            VALUES ({school_id}, '{title.replace("'", "''")}', '{description.replace("'", "''")}', '{event_date}', {f"'{location}'" if location else 'NULL'}, {max_participants if max_participants else 'NULL'}, {price if price else 'NULL'}, '{currency}', {f"'{image_url}'" if image_url else 'NULL'}, '{external_url}', 'pending')
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
    
    cur.close()
    conn.close()
    return {
        'statusCode': 404,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Endpoint not found'}),
        'isBase64Encoded': False
    }