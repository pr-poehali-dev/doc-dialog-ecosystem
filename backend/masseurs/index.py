import json
import os
import psycopg2

def handler(event: dict, context) -> dict:
    """
    API для получения списка массажистов с бейджами верификации и premium статусом
    """
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
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
    
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    
    try:
        # Получить всех массажистов с их бейджами и premium статусом (исключаем тестовых и скрытых)
        cur.execute("""
            SELECT 
                mp.id,
                mp.full_name,
                mp.user_id,
                mp.city,
                mp.address,
                mp.phone,
                mp.about,
                mp.avatar_url,
                mp.experience_years,
                mp.specializations,
                mp.rating,
                mp.reviews_count,
                COALESCE(mp.verification_badges, '[]'::jsonb) as verification_badges,
                COALESCE(mp.is_premium, false) as is_premium,
                mp.premium_until,
                mp.promoted_until,
                mp.created_at
            FROM t_p46047379_doc_dialog_ecosystem.masseur_profiles mp
            INNER JOIN t_p46047379_doc_dialog_ecosystem.users u ON mp.user_id = u.id
            WHERE mp.user_id NOT IN (1, 2)
                AND COALESCE(mp.is_visible, true) = true
            ORDER BY 
                CASE WHEN mp.promoted_until > NOW() THEN 0 ELSE 1 END,
                mp.is_premium DESC NULLS LAST,
                CASE WHEN u.email NOT LIKE '%@imported.local' THEN 0 ELSE 1 END,
                COALESCE(mp.published_at, mp.created_at) DESC NULLS LAST,
                mp.rating DESC NULLS LAST
        """)
        
        rows = cur.fetchall()
        masseurs = []
        
        for row in rows:
            # Парсим verification_badges из JSONB
            badges = row[12] if row[12] else []
            if isinstance(badges, str):
                try:
                    badges = json.loads(badges)
                except:
                    badges = []
            
            # Парсим specializations из массива PostgreSQL
            specializations = row[9] if row[9] else []
            if isinstance(specializations, str):
                try:
                    specializations = json.loads(specializations)
                except:
                    specializations = []
            
            masseurs.append({
                'id': row[0],
                'full_name': row[1],
                'user_id': row[2],
                'city': row[3] or 'Не указан',
                'address': row[4] or '',
                'phone': row[5],
                'about': row[6] or 'Профессиональный массажист',
                'avatar_url': row[7],
                'experience_years': row[8] or 5,
                'specializations': specializations if specializations else ['Классический массаж'],
                'rating': float(row[10]) if row[10] else 0.0,
                'reviews_count': row[11] if row[11] else 0,
                'verification_badges': badges,
                'is_premium': row[13] or False,
                'premium_until': row[14].isoformat() if row[14] else None,
                'promoted_until': row[15].isoformat() if row[15] else None
            })
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'masseurs': masseurs}),
            'isBase64Encoded': False
        }
    
    finally:
        cur.close()
        conn.close()