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
        
        query_params = event.get('queryStringParameters', {}) or {}
        token = query_params.get('token', '')
        
        if not token:
            headers = event.get('headers', {})
            token = headers.get('X-Authorization', headers.get('Authorization', '')).replace('Bearer ', '')
        
        print(f"DEBUG: Query params keys: {list(query_params.keys())}")
        print(f"DEBUG: Token length: {len(token) if token else 0}")
        
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
            decoded = jwt.decode(token, options={"verify_signature": False})
            user_id = decoded.get('user_id')
            user_role = decoded.get('role')
            
            print(f"DEBUG: Decoded user_id={user_id}, role={user_role}")
            
            if user_role != 'school':
                cur.close()
                conn.close()
                return {
                    'statusCode': 403,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Доступ только для школ'}),
                    'isBase64Encoded': False
                }
        except jwt.InvalidTokenError as e:
            print(f"DEBUG: JWT decode error: {str(e)}")
            cur.close()
            conn.close()
            return {
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Неверный токен', 'detail': str(e)}),
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
            SELECT id, title, 
                   COALESCE(view_count, 0), 
                   COALESCE(views_day, 0),
                   COALESCE(views_month, 0),
                   COALESCE(views_year, 0)
            FROM {schema}.courses 
            WHERE school_id = {school_id} AND status != 'draft'
        """)
        for row in cur.fetchall():
            products.append({
                'product_id': row[0],
                'product_name': row[1],
                'product_type': 'course',
                'views_total': row[2],
                'views_day': row[3],
                'views_month': row[4],
                'views_year': row[5]
            })
        
        cur.execute(f"""
            SELECT id, title,
                   COALESCE(view_count, 0),
                   COALESCE(views_day, 0),
                   COALESCE(views_month, 0),
                   COALESCE(views_year, 0)
            FROM {schema}.masterminds 
            WHERE school_id = {school_id} AND status != 'draft'
        """)
        for row in cur.fetchall():
            products.append({
                'product_id': row[0],
                'product_name': row[1],
                'product_type': 'mastermind',
                'views_total': row[2],
                'views_day': row[3],
                'views_month': row[4],
                'views_year': row[5]
            })
        
        cur.execute(f"""
            SELECT id, title,
                   COALESCE(view_count, 0),
                   COALESCE(views_day, 0),
                   COALESCE(views_month, 0),
                   COALESCE(views_year, 0)
            FROM {schema}.offline_training 
            WHERE school_id = {school_id} AND status != 'draft'
        """)
        for row in cur.fetchall():
            products.append({
                'product_id': row[0],
                'product_name': row[1],
                'product_type': 'offline_training',
                'views_total': row[2],
                'views_day': row[3],
                'views_month': row[4],
                'views_year': row[5]
            })
        
        for product in products:
            cur.execute(f"""
                SELECT COALESCE(SUM(ABS(bt.amount)), 0)
                FROM {schema}.balance_transactions bt
                LEFT JOIN {schema}.item_promotions ip ON bt.related_entity_id = ip.id
                WHERE bt.school_id = {school_id}
                  AND bt.type = 'withdrawal'
                  AND bt.related_entity_type = 'promotion'
                  AND ip.item_type = '{product['product_type']}'
                  AND ip.item_id = {product['product_id']}
            """)
            spent_row = cur.fetchone()
            product['spent_total'] = float(spent_row[0]) if spent_row else 0
            
            if product['spent_total'] > 0 and product['views_total'] > 0:
                product['cost_per_view'] = round(product['spent_total'] / product['views_total'], 2)
            else:
                product['cost_per_view'] = 0
        
        cur.execute(f"""
            SELECT COALESCE(SUM(CASE WHEN type = 'deposit' THEN amount ELSE 0 END), 0) as total_added,
                   COALESCE(SUM(CASE WHEN type = 'withdrawal' THEN ABS(amount) ELSE 0 END), 0) as total_spent
            FROM {schema}.balance_transactions
            WHERE school_id = {school_id}
        """)
        balance_row = cur.fetchone()
        
        cur.execute(f"""
            SELECT COALESCE(balance, 0)
            FROM {schema}.school_balance
            WHERE school_id = {school_id}
        """)
        current_balance_row = cur.fetchone()
        
        balance_stats = {
            'total_added': float(balance_row[0]) if balance_row else 0,
            'total_spent': float(balance_row[1]) if balance_row else 0,
            'current_balance': float(current_balance_row[0]) if current_balance_row else 0
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
        print(f"ERROR: Exception occurred: {type(e).__name__}: {str(e)}")
        import traceback
        print(f"ERROR: Traceback: {traceback.format_exc()}")
        
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