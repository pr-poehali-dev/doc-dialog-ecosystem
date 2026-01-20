import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context) -> dict:
    """Получение истории платежей для админки"""
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Authorization'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Метод не поддерживается'}),
            'isBase64Encoded': False
        }
    
    try:
        # Проверяем авторизацию
        headers = event.get('headers', {})
        auth_header = headers.get('X-Authorization', headers.get('x-authorization', ''))
        
        if not auth_header:
            return {
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Требуется авторизация'}),
                'isBase64Encoded': False
            }
        
        token = auth_header.replace('Bearer ', '')
        
        dsn = os.environ.get('DATABASE_URL')
        schema = os.environ.get('MAIN_DB_SCHEMA', 't_p46047379_doc_dialog_ecosystem')
        
        conn = psycopg2.connect(dsn)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        # Проверяем, что пользователь - администратор
        cur.execute(f"""
            SELECT id, role FROM {schema}.users
            WHERE token = %s
        """, (token,))
        
        user = cur.fetchone()
        
        if not user or user['role'] != 'admin':
            cur.close()
            conn.close()
            return {
                'statusCode': 403,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Доступ запрещён'}),
                'isBase64Encoded': False
            }
        
        # Получаем все платежи с информацией о пользователях
        cur.execute(f"""
            SELECT 
                p.id,
                p.user_id,
                p.payment_id,
                p.amount,
                p.type,
                p.status,
                p.metadata,
                p.created_at,
                p.updated_at,
                u.email as user_email
            FROM {schema}.payment_logs p
            LEFT JOIN {schema}.users u ON p.user_id = u.id
            ORDER BY p.created_at DESC
            LIMIT 500
        """)
        
        payments = cur.fetchall()
        
        # Преобразуем в список словарей
        result = []
        for payment in payments:
            payment_dict = dict(payment)
            # Преобразуем datetime в строку
            if payment_dict.get('created_at'):
                payment_dict['created_at'] = payment_dict['created_at'].isoformat()
            if payment_dict.get('updated_at'):
                payment_dict['updated_at'] = payment_dict['updated_at'].isoformat()
            # Преобразуем Decimal в строку
            if payment_dict.get('amount'):
                payment_dict['amount'] = str(payment_dict['amount'])
            result.append(payment_dict)
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(result),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        print(f"Error: {str(e)}")
        import traceback
        traceback.print_exc()
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
