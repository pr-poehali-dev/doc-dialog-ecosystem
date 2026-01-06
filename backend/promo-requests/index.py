import json
import os
import psycopg2
import jwt
from datetime import datetime, timedelta
from urllib.parse import unquote

def handler(event: dict, context) -> dict:
    """API для работы с запросами промокодов от массажистов к школам"""
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
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
    
    # Проверка авторизации
    headers = event.get('headers', {})
    token = headers.get('x-authorization', headers.get('X-Authorization', '')).replace('Bearer ', '')
    
    if not token:
        cur.close()
        conn.close()
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Unauthorized'}),
            'isBase64Encoded': False
        }
    
    # Decode JWT
    try:
        # Handle impersonated tokens BEFORE URL decode
        if token.endswith('.impersonated'):
            token = token[:-len('.impersonated')]
        
        # URL decode token if needed (handles %3D etc)
        token = unquote(token)
        
        secret_key = os.environ.get('JWT_SECRET', 'default_secret_key')
        payload = jwt.decode(token, secret_key, algorithms=['HS256'], options={'verify_signature': False})
        user_id = payload.get('user_id')
        user_email = payload.get('email')
        user_role = payload.get('role', 'user')
    except Exception as e:
        cur.close()
        conn.close()
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'Invalid token: {str(e)}'}),
            'isBase64Encoded': False
        }
    
    # POST /promo-requests - Массажист запрашивает промокод
    if method == 'POST' and not action:
        if user_role != 'masseur':
            cur.close()
            conn.close()
            return {
                'statusCode': 403,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Только массажисты могут запрашивать промокоды'}),
                'isBase64Encoded': False
            }
        
        body = json.loads(event.get('body', '{}'))
        school_id = body.get('school_id')
        course_id = body.get('course_id')
        course_title = body.get('course_title')
        entity_type = body.get('entity_type', 'course')
        
        if not all([school_id, course_id, course_title]):
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Missing required fields'}),
                'isBase64Encoded': False
            }
        
        # Получаем email школы
        cur.execute(f"SELECT email, school_name FROM {schema}.users WHERE id = {school_id} AND role = 'school'")
        school_data = cur.fetchone()
        
        if not school_data:
            cur.close()
            conn.close()
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Школа не найдена'}),
                'isBase64Encoded': False
            }
        
        school_email, school_name = school_data
        
        # Используем email как имя массажиста
        masseur_name = user_email.split('@')[0] if user_email else 'Массажист'
        
        # Проверяем, нет ли активного запроса
        cur.execute(f"""
            SELECT id FROM {schema}.promo_requests 
            WHERE masseur_id = {user_id} 
            AND course_id = {course_id} 
            AND entity_type = '{entity_type}'
            AND status IN ('pending', 'approved')
        """)
        
        existing = cur.fetchone()
        if existing:
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'У вас уже есть активный запрос на этот курс'}),
                'isBase64Encoded': False
            }
        
        # Создаём запрос
        cur.execute(f"""
            INSERT INTO {schema}.promo_requests 
            (masseur_id, masseur_email, masseur_name, school_id, school_email, course_id, course_title, entity_type, status)
            VALUES ({user_id}, '{user_email}', '{masseur_name.replace("'", "''")}', {school_id}, '{school_email}', {course_id}, '{course_title.replace("'", "''")}', '{entity_type}', 'pending')
            RETURNING id, created_at
        """)
        
        result = cur.fetchone()
        
        cur.close()
        conn.close()
        return {
            'statusCode': 201,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'id': result[0],
                'created_at': result[1].isoformat() if result[1] else None,
                'message': 'Запрос отправлен школе'
            }),
            'isBase64Encoded': False
        }
    
    # GET /promo-requests?action=my_requests - Массажист получает свои запросы
    if method == 'GET' and action == 'my_requests':
        if user_role != 'masseur':
            cur.close()
            conn.close()
            return {
                'statusCode': 403,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Только для массажистов'}),
                'isBase64Encoded': False
            }
        
        cur.execute(f"""
            SELECT id, school_id, school_email, course_id, course_title, entity_type, status, 
                   promo_code, purchase_url, discount_percentage, expires_at, opened_at, created_at, responded_at
            FROM {schema}.promo_requests
            WHERE masseur_id = {user_id}
            ORDER BY created_at DESC
        """)
        
        requests = cur.fetchall()
        result = [{
            'id': r[0],
            'school_id': r[1],
            'school_email': r[2],
            'course_id': r[3],
            'course_title': r[4],
            'entity_type': r[5],
            'status': r[6],
            'promo_code': r[7],
            'purchase_url': r[8],
            'discount_percentage': r[9],
            'expires_at': r[10].isoformat() if r[10] else None,
            'opened_at': r[11].isoformat() if r[11] else None,
            'created_at': r[12].isoformat() if r[12] else None,
            'responded_at': r[13].isoformat() if r[13] else None
        } for r in requests]
        
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(result),
            'isBase64Encoded': False
        }
    
    # GET /promo-requests?action=school_requests - Школа получает запросы к ней
    if method == 'GET' and action == 'school_requests':
        if user_role != 'school':
            cur.close()
            conn.close()
            return {
                'statusCode': 403,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Только для школ'}),
                'isBase64Encoded': False
            }
        
        cur.execute(f"""
            SELECT id, masseur_id, masseur_email, masseur_name, course_id, course_title, entity_type, 
                   status, promo_code, purchase_url, discount_percentage, created_at, responded_at
            FROM {schema}.promo_requests
            WHERE school_id = {user_id}
            ORDER BY created_at DESC
        """)
        
        requests = cur.fetchall()
        result = [{
            'id': r[0],
            'masseur_id': r[1],
            'masseur_email': r[2],
            'masseur_name': r[3],
            'course_id': r[4],
            'course_title': r[5],
            'entity_type': r[6],
            'status': r[7],
            'promo_code': r[8],
            'purchase_url': r[9],
            'discount_percentage': r[10],
            'created_at': r[11].isoformat() if r[11] else None,
            'responded_at': r[12].isoformat() if r[12] else None
        } for r in requests]
        
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(result),
            'isBase64Encoded': False
        }
    
    # PUT /promo-requests - Школа отвечает на запрос
    if method == 'PUT':
        if user_role != 'school':
            cur.close()
            conn.close()
            return {
                'statusCode': 403,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Только школы могут отвечать на запросы'}),
                'isBase64Encoded': False
            }
        
        body = json.loads(event.get('body', '{}'))
        request_id = body.get('request_id')
        action_type = body.get('action')  # 'approve' or 'reject'
        promo_code = body.get('promo_code')
        purchase_url = body.get('purchase_url')
        discount_percentage = body.get('discount_percentage')
        
        if not request_id or not action_type:
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Missing required fields'}),
                'isBase64Encoded': False
            }
        
        if action_type == 'approve':
            if not promo_code or not purchase_url:
                cur.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Промокод и ссылка обязательны'}),
                    'isBase64Encoded': False
                }
            
            # Обновляем запрос
            cur.execute(f"""
                UPDATE {schema}.promo_requests
                SET status = 'approved',
                    promo_code = '{promo_code.replace("'", "''")}',
                    purchase_url = '{purchase_url.replace("'", "''")}',
                    discount_percentage = {discount_percentage if discount_percentage else 'NULL'},
                    responded_at = NOW()
                WHERE id = {request_id} AND school_id = {user_id}
                RETURNING id, masseur_email
            """)
        else:
            # Отклоняем запрос
            cur.execute(f"""
                UPDATE {schema}.promo_requests
                SET status = 'rejected',
                    responded_at = NOW()
                WHERE id = {request_id} AND school_id = {user_id}
                RETURNING id, masseur_email
            """)
        
        result = cur.fetchone()
        
        if not result:
            cur.close()
            conn.close()
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Запрос не найден'}),
                'isBase64Encoded': False
            }
        
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'id': result[0], 'message': 'Запрос обработан'}),
            'isBase64Encoded': False
        }
    
    # POST /promo-requests?action=open - Массажист открывает промокод (запускается таймер)
    if method == 'POST' and action == 'open':
        body = json.loads(event.get('body', '{}'))
        request_id = body.get('request_id')
        
        if not request_id:
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Missing request_id'}),
                'isBase64Encoded': False
            }
        
        # Устанавливаем opened_at и expires_at (1 час с момента открытия)
        cur.execute(f"""
            UPDATE {schema}.promo_requests
            SET opened_at = NOW(),
                expires_at = NOW() + INTERVAL '1 hour'
            WHERE id = {request_id} AND masseur_id = {user_id} AND opened_at IS NULL
            RETURNING id, promo_code, purchase_url, expires_at
        """)
        
        result = cur.fetchone()
        
        if not result:
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Промокод уже был открыт или не найден'}),
                'isBase64Encoded': False
            }
        
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'id': result[0],
                'promo_code': result[1],
                'purchase_url': result[2],
                'expires_at': result[3].isoformat() if result[3] else None
            }),
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