import json
import os
import psycopg2
from datetime import datetime, timedelta

def handler(event: dict, context) -> dict:
    """Утилита для проверки rate limiting на основе PostgreSQL"""
    
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        body = json.loads(event.get('body', '{}'))
        identifier = body.get('identifier')
        max_requests = body.get('max_requests', 30)
        window_seconds = body.get('window_seconds', 60)
        
        if not identifier:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'identifier required'}),
                'isBase64Encoded': False
            }
        
        dsn = os.environ.get('DATABASE_URL')
        schema = 't_p46047379_doc_dialog_ecosystem'
        
        conn = psycopg2.connect(dsn)
        conn.autocommit = True
        cur = conn.cursor()
        
        # Создаём таблицу если не существует
        cur.execute(f"""
            CREATE TABLE IF NOT EXISTS {schema}.rate_limits (
                identifier VARCHAR(255) NOT NULL,
                request_time TIMESTAMP NOT NULL DEFAULT NOW(),
                PRIMARY KEY (identifier, request_time)
            )
        """)
        
        # Удаляем старые записи
        window_start = datetime.utcnow() - timedelta(seconds=window_seconds)
        cur.execute(f"""
            DELETE FROM {schema}.rate_limits 
            WHERE request_time < '{window_start.isoformat()}'::timestamp
        """)
        
        # Проверяем количество запросов в окне
        cur.execute(f"""
            SELECT COUNT(*) FROM {schema}.rate_limits 
            WHERE identifier = '{identifier}' 
            AND request_time >= '{window_start.isoformat()}'::timestamp
        """)
        
        count = cur.fetchone()[0]
        
        if count >= max_requests:
            retry_after = window_seconds
            cur.close()
            conn.close()
            
            return {
                'statusCode': 429,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Retry-After': str(retry_after)
                },
                'body': json.dumps({
                    'allowed': False,
                    'error': 'Слишком много запросов',
                    'retry_after': retry_after,
                    'current_count': count,
                    'limit': max_requests
                }),
                'isBase64Encoded': False
            }
        
        # Добавляем новую запись
        cur.execute(f"""
            INSERT INTO {schema}.rate_limits (identifier, request_time) 
            VALUES ('{identifier}', NOW())
        """)
        
        remaining = max_requests - count - 1
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'X-RateLimit-Limit': str(max_requests),
                'X-RateLimit-Remaining': str(remaining),
                'X-RateLimit-Reset': str(window_seconds)
            },
            'body': json.dumps({
                'allowed': True,
                'remaining': remaining,
                'limit': max_requests,
                'window_seconds': window_seconds
            }),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        print(f"ERROR: {type(e).__name__}: {str(e)}")
        import traceback
        print(f"Traceback: {traceback.format_exc()}")
        
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Internal server error'}),
            'isBase64Encoded': False
        }
