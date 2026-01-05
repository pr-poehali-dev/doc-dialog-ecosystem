import json
import os
import psycopg2
import jwt
from datetime import datetime

def handler(event: dict, context) -> dict:
    """API для управления балансом школы: просмотр, пополнение, история транзакций"""
    
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
        
        if method == 'GET':
            action = query_params.get('action', 'get')
            
            if action == 'get':
                cur.execute(f"""
                    SELECT COALESCE(balance, 0)
                    FROM {schema}.school_balance
                    WHERE school_id = {school_id}
                """)
                balance_row = cur.fetchone()
                current_balance = float(balance_row[0]) if balance_row else 0
                
                cur.execute(f"""
                    SELECT COALESCE(SUM(CASE WHEN type = 'credit' THEN amount ELSE 0 END), 0) as total_added,
                           COALESCE(SUM(CASE WHEN type = 'debit' THEN amount ELSE 0 END), 0) as total_spent
                    FROM {schema}.balance_transactions
                    WHERE school_id = {school_id}
                """)
                stats_row = cur.fetchone()
                
                cur.execute(f"""
                    SELECT id, amount, type, description, related_entity_type, related_entity_id, created_at
                    FROM {schema}.balance_transactions
                    WHERE school_id = {school_id}
                    ORDER BY created_at DESC
                    LIMIT 50
                """)
                
                transactions = []
                for row in cur.fetchall():
                    transactions.append({
                        'id': row[0],
                        'amount': float(row[1]),
                        'type': row[2],
                        'description': row[3],
                        'related_entity_type': row[4],
                        'related_entity_id': row[5],
                        'created_at': row[6].isoformat() if row[6] else None
                    })
                
                cur.close()
                conn.close()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'current_balance': current_balance,
                        'total_added': float(stats_row[0]) if stats_row else 0,
                        'total_spent': float(stats_row[1]) if stats_row else 0,
                        'transactions': transactions
                    }),
                    'isBase64Encoded': False
                }
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            action = body.get('action')
            
            if action == 'add':
                amount = body.get('amount')
                description = body.get('description', 'Пополнение баланса')
                
                if not amount or amount <= 0:
                    cur.close()
                    conn.close()
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Некорректная сумма'}),
                        'isBase64Encoded': False
                    }
                
                description_escaped = description.replace("'", "''")
                
                cur.execute(f"""
                    INSERT INTO {schema}.balance_transactions 
                    (school_id, amount, type, description, created_at)
                    VALUES ({school_id}, {amount}, 'credit', '{description_escaped}', NOW())
                """)
                
                cur.execute(f"""
                    SELECT id FROM {schema}.school_balance WHERE school_id = {school_id}
                """)
                balance_exists = cur.fetchone()
                
                if balance_exists:
                    cur.execute(f"""
                        UPDATE {schema}.school_balance
                        SET balance = balance + {amount}, updated_at = NOW()
                        WHERE school_id = {school_id}
                    """)
                else:
                    cur.execute(f"""
                        INSERT INTO {schema}.school_balance (school_id, balance, currency, created_at, updated_at)
                        VALUES ({school_id}, {amount}, 'RUB', NOW(), NOW())
                    """)
                
                cur.close()
                conn.close()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'success': True, 'message': 'Баланс пополнен'}),
                    'isBase64Encoded': False
                }
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Неверный запрос'}),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        print(f"ERROR: {type(e).__name__}: {str(e)}")
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
