import json
import os
import psycopg2
import random
import jwt

def handler(event: dict, context) -> dict:
    """API для работы с отзывами к курсам и мастермайндам"""
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
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
    
    # GET /reviews?entity_type=course&entity_id=1 - Get reviews for entity
    if method == 'GET' and not action:
        entity_type = query_params.get('entity_type')
        entity_id = query_params.get('entity_id')
        
        if not entity_type or not entity_id:
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Missing entity_type or entity_id'}),
                'isBase64Encoded': False
            }
        
        cur.execute(f"""
            SELECT id, user_id, user_email, user_name, rating, comment, is_auto_generated, created_at
            FROM {schema}.course_reviews
            WHERE entity_type = '{entity_type}' AND entity_id = {entity_id}
            ORDER BY created_at DESC
        """)
        
        reviews = cur.fetchall()
        
        result = [{
            'id': r[0],
            'user_id': r[1],
            'user_email': r[2],
            'user_name': r[3],
            'rating': r[4],
            'comment': r[5],
            'is_auto_generated': r[6],
            'created_at': r[7].isoformat() if r[7] else None
        } for r in reviews]
        
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(result),
            'isBase64Encoded': False
        }
    
    # POST /reviews - Add review (requires auth)
    if method == 'POST' and not action:
        print(f"[DEBUG] POST request received. Headers: {event.get('headers', {})}")
        body = json.loads(event.get('body', '{}'))
        print(f"[DEBUG] Body parsed: {body}")
        
        entity_type = body.get('entity_type')
        entity_id = body.get('entity_id')
        rating = body.get('rating')
        comment = body.get('comment', '')
        
        if not all([entity_type, entity_id, rating, comment]):
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Missing required fields'}),
                'isBase64Encoded': False
            }
        
        # Get user from token (headers come in lowercase from proxy)
        headers = event.get('headers', {})
        print(f"[DEBUG] All headers keys: {list(headers.keys())}")
        token = headers.get('x-authorization', headers.get('X-Authorization', '')).replace('Bearer ', '')
        print(f"[DEBUG] Token extracted: {token[:20] if token else 'NO TOKEN'}...")
        
        if not token:
            cur.close()
            conn.close()
            return {
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Unauthorized'}),
                'isBase64Encoded': False
            }
        
        # Validate JWT token and get user
        try:
            secret_key = os.environ.get('JWT_SECRET', 'default_secret_key')
            payload = jwt.decode(token, secret_key, algorithms=['HS256'])
            user_id = payload.get('user_id')
            user_email = payload.get('email')
        except jwt.ExpiredSignatureError:
            cur.close()
            conn.close()
            return {
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Token expired'}),
                'isBase64Encoded': False
            }
        except jwt.InvalidTokenError:
            cur.close()
            conn.close()
            return {
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Invalid token'}),
                'isBase64Encoded': False
            }
        
        # Get user name from email
        user_name = user_email.split('@')[0]
        
        # Insert review
        cur.execute(f"""
            INSERT INTO {schema}.course_reviews (entity_type, entity_id, user_id, user_email, user_name, rating, comment, is_auto_generated)
            VALUES ('{entity_type}', {entity_id}, {user_id}, '{user_email}', '{user_name.replace("'", "''")}', {rating}, '{comment.replace("'", "''")}', FALSE)
            RETURNING id, created_at
        """)
        
        new_review = cur.fetchone()
        
        result = {
            'id': new_review[0],
            'user_name': user_name,
            'rating': rating,
            'comment': comment,
            'created_at': new_review[1].isoformat() if new_review[1] else None
        }
        
        cur.close()
        conn.close()
        return {
            'statusCode': 201,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(result),
            'isBase64Encoded': False
        }
    
    # POST /reviews?action=generate_auto - Generate auto reviews (internal use)
    if method == 'POST' and action == 'generate_auto':
        body = json.loads(event.get('body', '{}'))
        
        entity_type = body.get('entity_type')
        entity_id = body.get('entity_id')
        
        if not entity_type or not entity_id:
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Missing entity_type or entity_id'}),
                'isBase64Encoded': False
            }
        
        # Auto-generated review templates
        templates = [
            {
                'name': 'Анна Петрова',
                'comment': 'Отличный курс! Получила много полезных знаний и практических навыков. Преподаватели настоящие профессионалы своего дела.'
            },
            {
                'name': 'Мария Смирнова',
                'comment': 'Очень довольна обучением. Материал изложен понятно и структурированно. Рекомендую всем, кто хочет развиваться в этой области!'
            },
            {
                'name': 'Елена Иванова',
                'comment': 'Прекрасная программа! После курса я чувствую себя уверенно и готова применять полученные знания на практике.'
            },
            {
                'name': 'Ольга Васильева',
                'comment': 'Спасибо за качественное обучение! Всё было организовано на высшем уровне. Обязательно приду на следующие курсы.'
            },
            {
                'name': 'Татьяна Новикова',
                'comment': 'Замечательный опыт! Узнала много нового и интересного. Атмосфера на занятиях была очень дружелюбная и продуктивная.'
            }
        ]
        
        # Select random 2-3 reviews
        num_reviews = random.randint(2, 3)
        selected_templates = random.sample(templates, num_reviews)
        
        inserted_reviews = []
        for template in selected_templates:
            cur.execute(f"""
                INSERT INTO {schema}.course_reviews (entity_type, entity_id, user_name, rating, comment, is_auto_generated)
                VALUES ('{entity_type}', {entity_id}, '{template['name']}', 5, '{template['comment']}', TRUE)
                RETURNING id, user_name, rating, comment, created_at
            """)
            review = cur.fetchone()
            inserted_reviews.append({
                'id': review[0],
                'user_name': review[1],
                'rating': review[2],
                'comment': review[3],
                'created_at': review[4].isoformat() if review[4] else None
            })
        
        cur.close()
        conn.close()
        return {
            'statusCode': 201,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'reviews': inserted_reviews}),
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