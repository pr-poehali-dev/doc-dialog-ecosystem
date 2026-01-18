"""
Наполнение форума темами и обсуждениями
"""
import os
import json
import psycopg2

def handler(event: dict, context) -> dict:
    """Добавить темы и посты в форум"""
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }
    
    try:
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor()
        
        # Читаем SQL файлы
        with open('/var/task/db_migrations/V0123__populate_forum_topics.sql', 'r', encoding='utf-8') as f:
            topics_sql = f.read()
        
        with open('/var/task/db_migrations/V0124__populate_forum_posts.sql', 'r', encoding='utf-8') as f:
            posts_sql = f.read()
        
        # Применяем
        cur.execute(topics_sql)
        topics_added = cur.rowcount
        
        cur.execute(posts_sql)
        posts_added = cur.rowcount
        
        conn.commit()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'success': True,
                'topics_added': topics_added,
                'posts_added': posts_added
            })
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }
