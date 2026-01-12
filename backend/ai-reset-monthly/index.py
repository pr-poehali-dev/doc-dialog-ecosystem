import json
import os
from datetime import datetime
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context) -> dict:
    '''Cron-функция для ежемесячного сброса счётчика использованных AI-диалогов для всех специалистов'''
    
    db_url = os.environ.get('DATABASE_URL')
    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
    
    if not db_url:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Database configuration missing'}),
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(db_url, options=f'-c search_path={schema}')
    conn.autocommit = True
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        # Сбрасываем счётчик использованных диалогов для всех специалистов
        cursor.execute('''
            UPDATE specialists
            SET ai_dialogs_used = 0
            WHERE ai_dialogs_used > 0
        ''')
        
        affected_rows = cursor.rowcount
        
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({
                'success': True,
                'reset_count': affected_rows,
                'timestamp': datetime.now().isoformat(),
                'message': f'Сброшено счётчиков: {affected_rows}'
            }),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({
                'error': str(e),
                'message': 'Ошибка при сбросе счётчиков'
            }),
            'isBase64Encoded': False
        }
