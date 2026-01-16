import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context) -> dict:
    """API для работы с заявками на лендинги"""
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Authorization'
            },
            'body': ''
        }
    
    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
    
    try:
        dsn = os.environ.get('DATABASE_URL')
        if not dsn:
            return {
                'statusCode': 500,
                'headers': headers,
                'body': json.dumps({'error': 'Database not configured'})
            }
        
        conn = psycopg2.connect(dsn)
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        auth_header = event.get('headers', {}).get('X-Authorization', '')
        user_id = auth_header.replace('Bearer ', '') if auth_header else None
        
        if not user_id:
            cursor.close()
            conn.close()
            return {
                'statusCode': 401,
                'headers': headers,
                'body': json.dumps({'error': 'Unauthorized'})
            }
        
        if method == 'GET':
            cursor.execute("""
                SELECT * FROM t_p46047379_doc_dialog_ecosystem.landing_orders
                WHERE user_id = %s
                ORDER BY created_at DESC
            """, (user_id,))
            orders = cursor.fetchall()
            
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps([dict(order) for order in orders], default=str)
            }
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            
            cursor.execute("""
                INSERT INTO t_p46047379_doc_dialog_ecosystem.landing_orders 
                (user_id, course_name, course_type, description, target_audience, 
                 unique_selling_points, price, course_duration, what_students_get, 
                 program, author_name, author_bio, school_name, contact_email, 
                 contact_phone, external_form_url, additional_info, status)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING *
            """, (
                user_id,
                body.get('courseName'),
                body.get('courseType'),
                body.get('description'),
                body.get('targetAudience'),
                body.get('uniqueSellingPoints'),
                body.get('price'),
                body.get('courseDuration'),
                body.get('whatStudentsGet'),
                body.get('program'),
                body.get('authorName'),
                body.get('authorBio'),
                body.get('schoolName'),
                body.get('contactEmail'),
                body.get('contactPhone'),
                body.get('externalFormUrl'),
                body.get('additionalInfo'),
                'pending'
            ))
            
            order = cursor.fetchone()
            conn.commit()
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps(dict(order), default=str)
            }
        
        elif method == 'DELETE':
            order_id = event.get('queryStringParameters', {}).get('id')
            if not order_id:
                cursor.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'body': json.dumps({'error': 'Missing order id'})
                }
            
            cursor.execute("""
                DELETE FROM t_p46047379_doc_dialog_ecosystem.landing_orders
                WHERE id = %s AND user_id = %s
            """, (order_id, user_id))
            
            conn.commit()
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({'success': True})
            }
        
        cursor.close()
        conn.close()
        return {
            'statusCode': 405,
            'headers': headers,
            'body': json.dumps({'error': 'Method not allowed'})
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'error': str(e)})
        }
