import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context) -> dict:
    '''API для сохранения и загрузки лендинга массажиста'''
    
    print(f"[DEBUG] Method: {event.get('httpMethod')}, Headers: {event.get('headers')}")
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Authorization'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    token = event.get('headers', {}).get('X-Authorization', '').replace('Bearer ', '')
    
    if not token:
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Unauthorized'}),
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        cursor.execute("SELECT user_id FROM t_p46047379_doc_dialog_ecosystem.users WHERE auth_token = %s", (token,))
        user = cursor.fetchone()
        
        if not user:
            return {
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Invalid token'}),
                'isBase64Encoded': False
            }
        
        user_id = user['user_id']
        
        if method == 'GET':
            cursor.execute("""
                SELECT * FROM t_p46047379_doc_dialog_ecosystem.masseur_landing_pages
                WHERE user_id = %s
                ORDER BY updated_at DESC
                LIMIT 1
            """, (user_id,))
            
            landing = cursor.fetchone()
            
            if landing:
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'heroTitle': landing['hero_title'],
                        'heroSubtitle': landing['hero_subtitle'],
                        'heroImage': landing['hero_image'],
                        'profilePhoto': landing['profile_photo'],
                        'aboutTitle': landing['about_title'],
                        'aboutText': landing['about_text'],
                        'services': landing['services'],
                        'processTitle': landing['process_title'],
                        'processSteps': landing['process_steps'],
                        'gallery': landing['gallery'],
                        'certificates': landing['certificates'],
                        'reviews': landing['reviews'],
                        'blog': landing['blog'],
                        'videos': landing['videos'],
                        'offers': landing['offers'],
                        'template': landing['template'],
                        'showPhone': landing['show_phone'],
                        'showTelegram': landing['show_telegram'],
                        'colorTheme': landing['color_theme']
                    }),
                    'isBase64Encoded': False
                }
            else:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Landing not found'}),
                    'isBase64Encoded': False
                }
        
        elif method in ['POST', 'PUT']:
            data = json.loads(event.get('body', '{}'))
            print(f"[DEBUG] Saving data for user {user_id}: {data}")
            
            cursor.execute("SELECT id FROM t_p46047379_doc_dialog_ecosystem.masseur_landing_pages WHERE user_id = %s", (user_id,))
            existing = cursor.fetchone()
            
            if existing:
                cursor.execute("""
                    UPDATE t_p46047379_doc_dialog_ecosystem.masseur_landing_pages
                    SET hero_title = %s, hero_subtitle = %s, hero_image = %s, profile_photo = %s,
                        about_title = %s, about_text = %s, services = %s, process_title = %s,
                        process_steps = %s, gallery = %s, certificates = %s, reviews = %s,
                        blog = %s, videos = %s, offers = %s, template = %s, show_phone = %s,
                        show_telegram = %s, color_theme = %s, updated_at = NOW()
                    WHERE user_id = %s
                    RETURNING id
                """, (
                    data.get('heroTitle'), data.get('heroSubtitle'), data.get('heroImage'),
                    data.get('profilePhoto'), data.get('aboutTitle'), data.get('aboutText'),
                    json.dumps(data.get('services', [])), data.get('processTitle'),
                    json.dumps(data.get('processSteps', [])), json.dumps(data.get('gallery', [])),
                    json.dumps(data.get('certificates', [])), json.dumps(data.get('reviews', [])),
                    json.dumps(data.get('blog', [])), json.dumps(data.get('videos', [])),
                    json.dumps(data.get('offers', [])), data.get('template'),
                    data.get('showPhone'), data.get('showTelegram'), data.get('colorTheme'),
                    user_id
                ))
            else:
                cursor.execute("""
                    INSERT INTO t_p46047379_doc_dialog_ecosystem.masseur_landing_pages
                    (user_id, hero_title, hero_subtitle, hero_image, profile_photo, about_title,
                     about_text, services, process_title, process_steps, gallery, certificates,
                     reviews, blog, videos, offers, template, show_phone, show_telegram, color_theme)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING id
                """, (
                    user_id, data.get('heroTitle'), data.get('heroSubtitle'), data.get('heroImage'),
                    data.get('profilePhoto'), data.get('aboutTitle'), data.get('aboutText'),
                    json.dumps(data.get('services', [])), data.get('processTitle'),
                    json.dumps(data.get('processSteps', [])), json.dumps(data.get('gallery', [])),
                    json.dumps(data.get('certificates', [])), json.dumps(data.get('reviews', [])),
                    json.dumps(data.get('blog', [])), json.dumps(data.get('videos', [])),
                    json.dumps(data.get('offers', [])), data.get('template'),
                    data.get('showPhone'), data.get('showTelegram'), data.get('colorTheme')
                ))
            
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': True}),
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