import json
import os
import psycopg2
from datetime import datetime

def handler(event: dict, context) -> dict:
    """API для управления очными обучениями от школ"""
    
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
    
    conn = psycopg2.connect(dsn)
    conn.autocommit = True
    cur = conn.cursor()
    
    query_params = event.get('queryStringParameters', {}) or {}
    training_id = query_params.get('id')
    
    # GET /offline-training - List all trainings
    if method == 'GET' and not training_id:
        auth_header = event.get('headers', {}).get('X-Authorization', '')
        token = auth_header.replace('Bearer ', '') if auth_header else None
        
        user_id = None
        is_admin = False
        
        if token:
            cur.execute("SELECT id, role FROM users WHERE token = %s", (token,))
            user = cur.fetchone()
            if user:
                user_id = user[0]
                is_admin = user[1] in ('admin', 'moderator')
        
        if is_admin:
            cur.execute("""
                SELECT id, user_id, school_name, title, description, event_date, location,
                       max_participants, price, image_url, external_url, is_moderated, created_at,
                       original_price, discount_price, author_name, author_photo, event_content
                FROM offline_training
                ORDER BY created_at DESC
            """)
        else:
            cur.execute("""
                SELECT id, user_id, school_name, title, description, event_date, location,
                       max_participants, price, image_url, external_url, is_moderated, created_at,
                       original_price, discount_price, author_name, author_photo, event_content
                FROM offline_training
                WHERE is_moderated = true
                ORDER BY created_at DESC
            """)
        
        trainings = cur.fetchall()
        
        result = [{
            'id': t[0],
            'user_id': t[1],
            'school_name': t[2],
            'title': t[3],
            'description': t[4],
            'event_date': t[5].isoformat() if t[5] else None,
            'location': t[6],
            'max_participants': t[7],
            'price': float(t[8]) if t[8] else None,
            'image_url': t[9],
            'external_url': t[10],
            'is_moderated': t[11],
            'created_at': t[12].isoformat() if t[12] else None,
            'original_price': float(t[13]) if t[13] else None,
            'discount_price': float(t[14]) if t[14] else None,
            'author_name': t[15],
            'author_photo': t[16],
            'event_content': t[17]
        } for t in trainings]
        
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(result),
            'isBase64Encoded': False
        }
    
    # GET /offline-training?id=X - Get single training
    if method == 'GET' and training_id:
        cur.execute("""
            SELECT id, user_id, school_name, title, description, event_date, location,
                   max_participants, price, image_url, external_url, is_moderated, created_at,
                   original_price, discount_price, author_name, author_photo, event_content
            FROM offline_training
            WHERE id = %s
        """, (training_id,))
        
        training = cur.fetchone()
        
        if not training:
            cur.close()
            conn.close()
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Training not found'}),
                'isBase64Encoded': False
            }
        
        result = {
            'id': training[0],
            'user_id': training[1],
            'school_name': training[2],
            'title': training[3],
            'description': training[4],
            'event_date': training[5].isoformat() if training[5] else None,
            'location': training[6],
            'max_participants': training[7],
            'price': float(training[8]) if training[8] else None,
            'image_url': training[9],
            'external_url': training[10],
            'is_moderated': training[11],
            'created_at': training[12].isoformat() if training[12] else None,
            'original_price': float(training[13]) if training[13] else None,
            'discount_price': float(training[14]) if training[14] else None,
            'author_name': training[15],
            'author_photo': training[16],
            'event_content': training[17]
        }
        
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(result),
            'isBase64Encoded': False
        }
    
    # POST /offline-training - Create new training
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
        
        cur.execute("SELECT id FROM users WHERE token = %s", (token,))
        user = cur.fetchone()
        
        if not user:
            cur.close()
            conn.close()
            return {
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Invalid token'}),
                'isBase64Encoded': False
            }
        
        user_id = user[0]
        body = json.loads(event.get('body', '{}'))
        
        cur.execute("""
            INSERT INTO offline_training (
                user_id, school_name, title, description, event_date, location,
                max_participants, price, image_url, external_url, original_price,
                discount_price, author_name, author_photo, event_content
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id
        """, (
            user_id,
            body.get('school_name'),
            body.get('title'),
            body.get('description'),
            body.get('event_date'),
            body.get('location'),
            body.get('max_participants'),
            body.get('price'),
            body.get('image_url'),
            body.get('external_url'),
            body.get('original_price'),
            body.get('discount_price'),
            body.get('author_name'),
            body.get('author_photo'),
            body.get('event_content')
        ))
        
        training_id = cur.fetchone()[0]
        
        cur.close()
        conn.close()
        return {
            'statusCode': 201,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'id': training_id, 'message': 'Training created'}),
            'isBase64Encoded': False
        }
    
    # PUT /offline-training?id=X - Update training
    if method == 'PUT' and training_id:
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
        
        cur.execute("SELECT id, role FROM users WHERE token = %s", (token,))
        user = cur.fetchone()
        
        if not user:
            cur.close()
            conn.close()
            return {
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Invalid token'}),
                'isBase64Encoded': False
            }
        
        user_id = user[0]
        user_role = user[1]
        is_admin = user_role in ('admin', 'moderator')
        
        body = json.loads(event.get('body', '{}'))
        
        if 'is_moderated' in body and is_admin:
            cur.execute("""
                UPDATE offline_training
                SET is_moderated = %s
                WHERE id = %s
            """, (body['is_moderated'], training_id))
        else:
            cur.execute("""
                UPDATE offline_training
                SET school_name = COALESCE(%s, school_name),
                    title = COALESCE(%s, title),
                    description = COALESCE(%s, description),
                    event_date = COALESCE(%s, event_date),
                    location = COALESCE(%s, location),
                    max_participants = COALESCE(%s, max_participants),
                    price = COALESCE(%s, price),
                    image_url = COALESCE(%s, image_url),
                    external_url = COALESCE(%s, external_url),
                    original_price = COALESCE(%s, original_price),
                    discount_price = COALESCE(%s, discount_price),
                    author_name = COALESCE(%s, author_name),
                    author_photo = COALESCE(%s, author_photo),
                    event_content = COALESCE(%s, event_content)
                WHERE id = %s AND user_id = %s
            """, (
                body.get('school_name'),
                body.get('title'),
                body.get('description'),
                body.get('event_date'),
                body.get('location'),
                body.get('max_participants'),
                body.get('price'),
                body.get('image_url'),
                body.get('external_url'),
                body.get('original_price'),
                body.get('discount_price'),
                body.get('author_name'),
                body.get('author_photo'),
                body.get('event_content'),
                training_id,
                user_id
            ))
        
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'message': 'Training updated'}),
            'isBase64Encoded': False
        }
    
    # DELETE /offline-training?id=X - Delete training
    if method == 'DELETE' and training_id:
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
        
        cur.execute("SELECT id, role FROM users WHERE token = %s", (token,))
        user = cur.fetchone()
        
        if not user:
            cur.close()
            conn.close()
            return {
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Invalid token'}),
                'isBase64Encoded': False
            }
        
        user_id = user[0]
        user_role = user[1]
        is_admin = user_role in ('admin', 'moderator')
        
        if is_admin:
            cur.execute("DELETE FROM offline_training WHERE id = %s", (training_id,))
        else:
            cur.execute("DELETE FROM offline_training WHERE id = %s AND user_id = %s", (training_id, user_id))
        
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'message': 'Training deleted'}),
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
