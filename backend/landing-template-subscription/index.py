import json
import os
import jwt
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime, timedelta

def handler(event: dict, context) -> dict:
    '''API для управления подписками на платные шаблоны лендингов'''
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Authorization'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    headers = event.get('headers', {})
    token = headers.get('X-Authorization', headers.get('x-authorization', '')).replace('Bearer ', '')
    
    if not token:
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Unauthorized'}),
            'isBase64Encoded': False
        }
    
    try:
        jwt_secret = os.environ['JWT_SECRET']
        payload = jwt.decode(token, jwt_secret, algorithms=['HS256'])
        user_id = payload['user_id']
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Invalid token'}),
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        if method == 'GET':
            cursor.execute(f"""
                SELECT template_type, expires_at, is_active
                FROM t_p46047379_doc_dialog_ecosystem.landing_template_subscriptions
                WHERE user_id = {user_id}
                    AND is_active = true
                    AND expires_at > NOW()
                ORDER BY expires_at DESC
                LIMIT 1
            """)
            
            subscription = cursor.fetchone()
            
            if subscription:
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'has_subscription': True,
                        'template_type': subscription['template_type'],
                        'expires_at': subscription['expires_at'].isoformat(),
                        'days_left': (subscription['expires_at'] - datetime.now()).days
                    }),
                    'isBase64Encoded': False
                }
            else:
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'has_subscription': False}),
                    'isBase64Encoded': False
                }
        
        elif method == 'POST':
            data = json.loads(event.get('body', '{}'))
            template_type = data.get('template_type')
            amount = data.get('amount')
            
            if not template_type or not amount:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Missing template_type or amount'}),
                    'isBase64Encoded': False
                }
            
            expires_at = datetime.now() + timedelta(days=90)
            
            cursor.execute(f"""
                UPDATE t_p46047379_doc_dialog_ecosystem.landing_template_subscriptions
                SET is_active = false
                WHERE user_id = {user_id} AND is_active = true
            """)
            
            cursor.execute(f"""
                INSERT INTO t_p46047379_doc_dialog_ecosystem.landing_template_subscriptions
                (user_id, template_type, expires_at, payment_amount)
                VALUES ({user_id}, '{template_type}', '{expires_at.isoformat()}', {amount})
                RETURNING id
            """)
            
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'expires_at': expires_at.isoformat(),
                    'template_type': template_type
                }),
                'isBase64Encoded': False
            }
        
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    finally:
        cursor.close()
        conn.close()
