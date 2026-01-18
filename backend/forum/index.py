"""
API для профессионального форума DocDialog
Управление категориями, темами и обсуждениями
"""
import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    """Подключение к базе данных"""
    return psycopg2.connect(os.environ['DATABASE_URL'])

def handler(event: dict, context) -> dict:
    """Главный обработчик API форума"""
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Authorization'
            },
            'body': ''
        }
    
    query_params = event.get('queryStringParameters') or {}
    action = query_params.get('action', '')
    
    try:
        if method == 'GET':
            if action == 'categories':
                return get_categories()
            elif action == 'topics':
                category_id = query_params.get('category_id')
                return get_topics(category_id)
            elif action == 'topic':
                topic_id = query_params.get('topic_id')
                return get_topic_with_posts(topic_id)
            else:
                return get_forum_stats()
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            
            if action == 'topic':
                return create_topic(body)
            elif action == 'post':
                return create_post(body)
        
        return {
            'statusCode': 404,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Not found'})
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }

def get_categories():
    """Получить все категории с количеством тем"""
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    cur.execute("""
        SELECT 
            fc.*,
            COUNT(DISTINCT ft.id) as topics_count,
            COUNT(DISTINCT fp.id) as posts_count
        FROM forum_categories fc
        LEFT JOIN forum_topics ft ON fc.id = ft.category_id
        LEFT JOIN forum_posts fp ON ft.id = fp.topic_id
        GROUP BY fc.id
        ORDER BY fc.order_index, fc.name
    """)
    
    categories = cur.fetchall()
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'categories': categories}, default=str)
    }

def get_topics(category_id=None):
    """Получить темы (с фильтром по категории)"""
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    if category_id:
        cur.execute("""
            SELECT 
                ft.*,
                fu.name as author_name,
                fu.role as author_role,
                fu.avatar_url as author_avatar,
                COUNT(DISTINCT fp.id) as replies_count,
                MAX(COALESCE(fp.created_at, ft.created_at)) as last_activity
            FROM forum_topics ft
            JOIN forum_users fu ON ft.author_id = fu.id
            LEFT JOIN forum_posts fp ON ft.id = fp.topic_id
            WHERE ft.category_id = %s
            GROUP BY ft.id, fu.id
            ORDER BY ft.is_pinned DESC, last_activity DESC
        """, (category_id,))
    else:
        cur.execute("""
            SELECT 
                ft.*,
                fu.name as author_name,
                fu.role as author_role,
                fu.avatar_url as author_avatar,
                fc.name as category_name,
                fc.color as category_color,
                COUNT(DISTINCT fp.id) as replies_count,
                MAX(COALESCE(fp.created_at, ft.created_at)) as last_activity
            FROM forum_topics ft
            JOIN forum_users fu ON ft.author_id = fu.id
            JOIN forum_categories fc ON ft.category_id = fc.id
            LEFT JOIN forum_posts fp ON ft.id = fp.topic_id
            GROUP BY ft.id, fu.id, fc.id
            ORDER BY ft.is_pinned DESC, last_activity DESC
            LIMIT 50
        """)
    
    topics = cur.fetchall()
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'topics': topics}, default=str)
    }

def get_topic_with_posts(topic_id):
    """Получить тему со всеми постами"""
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    # Увеличиваем счётчик просмотров
    cur.execute("UPDATE forum_topics SET views_count = views_count + 1 WHERE id = %s", (topic_id,))
    
    # Получаем тему
    cur.execute("""
        SELECT 
            ft.*,
            fu.name as author_name,
            fu.role as author_role,
            fu.avatar_url as author_avatar,
            fu.bio as author_bio,
            fu.specialization as author_specialization,
            fc.name as category_name,
            fc.color as category_color
        FROM forum_topics ft
        JOIN forum_users fu ON ft.author_id = fu.id
        JOIN forum_categories fc ON ft.category_id = fc.id
        WHERE ft.id = %s
    """, (topic_id,))
    
    topic = cur.fetchone()
    
    if not topic:
        cur.close()
        conn.close()
        return {
            'statusCode': 404,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Topic not found'})
        }
    
    # Получаем посты
    cur.execute("""
        SELECT 
            fp.*,
            fu.name as author_name,
            fu.role as author_role,
            fu.avatar_url as author_avatar,
            fu.bio as author_bio,
            fu.specialization as author_specialization
        FROM forum_posts fp
        JOIN forum_users fu ON fp.author_id = fu.id
        WHERE fp.topic_id = %s
        ORDER BY fp.created_at ASC
    """, (topic_id,))
    
    posts = cur.fetchall()
    
    conn.commit()
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'topic': topic, 'posts': posts}, default=str)
    }

def get_forum_stats():
    """Получить общую статистику форума"""
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    cur.execute("""
        SELECT 
            COUNT(DISTINCT fu.id) as users_count,
            COUNT(DISTINCT ft.id) as topics_count,
            COUNT(DISTINCT fp.id) as posts_count,
            COUNT(DISTINCT fc.id) as categories_count
        FROM forum_categories fc
        LEFT JOIN forum_topics ft ON fc.id = ft.category_id
        LEFT JOIN forum_posts fp ON ft.id = fp.topic_id
        LEFT JOIN forum_users fu ON TRUE
    """)
    
    stats = cur.fetchone()
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'stats': stats}, default=str)
    }

def create_topic(data):
    """Создать новую тему"""
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    cur.execute("""
        INSERT INTO forum_topics (category_id, author_id, title, content)
        VALUES (%s, %s, %s, %s)
        RETURNING id
    """, (data['category_id'], data['author_id'], data['title'], data['content']))
    
    topic_id = cur.fetchone()['id']
    
    conn.commit()
    cur.close()
    conn.close()
    
    return {
        'statusCode': 201,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'topic_id': topic_id})
    }

def create_post(data):
    """Создать новый пост (ответ в теме)"""
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    cur.execute("""
        INSERT INTO forum_posts (topic_id, author_id, content, is_solution)
        VALUES (%s, %s, %s, %s)
        RETURNING id
    """, (data['topic_id'], data['author_id'], data['content'], data.get('is_solution', False)))
    
    post_id = cur.fetchone()['id']
    
    # Обновляем время последнего обновления темы
    cur.execute("UPDATE forum_topics SET updated_at = CURRENT_TIMESTAMP WHERE id = %s", (data['topic_id'],))
    
    conn.commit()
    cur.close()
    conn.close()
    
    return {
        'statusCode': 201,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'post_id': post_id})
    }