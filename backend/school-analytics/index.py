import json
import os
import psycopg2
import jwt
from datetime import datetime, timedelta

def handler(event: dict, context) -> dict:
    """API для аналитики школы: статистика по продуктам, просмотры, платежи, баланс"""
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Authorization'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    try:
        dsn = os.environ.get('DATABASE_URL')
        schema = 't_p46047379_doc_dialog_ecosystem'
        
        conn = psycopg2.connect(dsn)
        conn.autocommit = True
        cur = conn.cursor()
        
        headers = event.get('headers', {})
        token = headers.get('X-Authorization', headers.get('Authorization', '')).replace('Bearer ', '')
        
        if not token:
            cur.close()
            conn.close()
            return {
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Требуется авторизация'}),
                'isBase64Encoded': False
            }
        
        try:
            jwt_secret = os.environ.get('JWT_SECRET', 'default-secret-key')
            decoded = jwt.decode(token, jwt_secret, algorithms=['HS256'])
            user_id = decoded.get('user_id')
            user_role = decoded.get('role')
            
            if user_role != 'school':
                cur.close()
                conn.close()
                return {
                    'statusCode': 403,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Доступ только для школ'}),
                    'isBase64Encoded': False
                }
        except jwt.InvalidTokenError:
            cur.close()
            conn.close()
            return {
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Неверный токен'}),
                'isBase64Encoded': False
            }
        
        cur.execute(f"SELECT id FROM {schema}.schools WHERE user_id = {user_id}")
        school = cur.fetchone()
        
        if not school:
            cur.close()
            conn.close()
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Школа не найдена'}),
                'isBase64Encoded': False
            }
        
        school_id = school[0]
        
        products = []
        
        cur.execute(f"""
            SELECT id, title, views_count, 
                   COALESCE(views_day, 0), COALESCE(views_month, 0), COALESCE(views_year, 0)
            FROM {schema}.courses 
            WHERE school_id = {school_id}
        """)
        for row in cur.fetchall():
            products.append({
                'product_id': row[0],
                'product_name': row[1],
                'product_type': 'course',
                'views_total': row[2] or 0,
                'views_day': row[3],
                'views_month': row[4],
                'views_year': row[5]
            })
        
        cur.execute(f"""
            SELECT id, title, views_count,
                   COALESCE(views_day, 0), COALESCE(views_month, 0), COALESCE(views_year, 0)
            FROM {schema}.masterminds 
            WHERE school_id = {school_id}
        """)
        for row in cur.fetchall():
            products.append({
                'product_id': row[0],
                'product_name': row[1],
                'product_type': 'mastermind',
                'views_total': row[2] or 0,
                'views_day': row[3],
                'views_month': row[4],
                'views_year': row[5]
            })
        
        cur.execute(f"""
            SELECT id, title, views_count,
                   COALESCE(views_day, 0), COALESCE(views_month, 0), COALESCE(views_year, 0)
            FROM {schema}.offline_training 
            WHERE school_id = {school_id}
        """)
        for row in cur.fetchall():
            products.append({
                'product_id': row[0],
                'product_name': row[1],
                'product_type': 'offline',
                'views_total': row[2] or 0,
                'views_day': row[3],
                'views_month': row[4],
                'views_year': row[5]
            })
        
        for product in products:
            cur.execute(f"""
                SELECT COALESCE(SUM(amount), 0), COUNT(*)
                FROM {schema}.product_payments
                WHERE school_id = {school_id} 
                  AND product_type = '{product['product_type']}'
                  AND product_id = {product['product_id']}
            """)
            payment_data = cur.fetchone()
            product['payments_total'] = float(payment_data[0]) if payment_data else 0
            payment_count = payment_data[1] if payment_data else 0
            
            if product['views_total'] > 0:
                product['conversion_rate'] = (payment_count / product['views_total']) * 100
            else:
                product['conversion_rate'] = 0
        
        cur.execute(f"""
            SELECT 
                COALESCE(SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END), 0) as total_added,
                COALESCE(SUM(CASE WHEN amount < 0 THEN ABS(amount) ELSE 0 END), 0) as total_spent,
                COALESCE(SUM(amount), 0) as current_balance
            FROM {schema}.balance_transactions
            WHERE school_id = {school_id}
        """)
        balance_row = cur.fetchone()
        
        balance_stats = {
            'total_added': float(balance_row[0]) if balance_row else 0,
            'total_spent': float(balance_row[1]) if balance_row else 0,
            'current_balance': float(balance_row[2]) if balance_row else 0
        }
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'products': products,
                'balance': balance_stats
            }),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        if 'cur' in locals():
            cur.close()
        if 'conn' in locals():
            conn.close()
        
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
