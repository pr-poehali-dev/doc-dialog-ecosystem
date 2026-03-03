import json
import os
import psycopg2

SCHEMA = 't_p46047379_doc_dialog_ecosystem'

def handler(event: dict, context) -> dict:
    """API для получения списка массажистов или одного профиля"""
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
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Метод не поддерживается'}),
            'isBase64Encoded': False
        }
    
    query_params = event.get('queryStringParameters') or {}
    masseur_id = query_params.get('id')
    user_id = query_params.get('user_id')
    ids = query_params.get('ids')

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    
    try:
        if masseur_id:
            return get_single_masseur(cur, 'mp.id', int(masseur_id))
        elif user_id:
            return get_single_masseur(cur, 'mp.user_id', int(user_id))
        elif ids:
            return get_masseurs_by_ids(cur, ids)
        else:
            return get_all_masseurs(cur)
    finally:
        cur.close()
        conn.close()


def get_single_masseur(cur, field: str, value: int) -> dict:
    cur.execute(f"""
        SELECT 
            mp.id, mp.full_name, mp.user_id, mp.city, mp.address,
            mp.phone, mp.about, mp.avatar_url, mp.experience_years,
            mp.specializations, mp.rating, mp.reviews_count,
            COALESCE(mp.verification_badges, '[]'::jsonb) as verification_badges,
            COALESCE(mp.is_premium, false) as is_premium,
            mp.premium_until, mp.promoted_until, mp.created_at,
            CASE WHEN u.email LIKE '%%@imported.local' THEN true ELSE false END as is_imported
        FROM {SCHEMA}.masseur_profiles mp
        INNER JOIN {SCHEMA}.users u ON mp.user_id = u.id
        WHERE {field} = %s
        LIMIT 1
    """, (value,))
    
    row = cur.fetchone()
    if not row:
        return {
            'statusCode': 404,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Массажист не найден'}),
            'isBase64Encoded': False
        }
    
    masseur = format_masseur(row)
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'masseur': masseur}),
        'isBase64Encoded': False
    }


def get_masseurs_by_ids(cur, ids_str: str) -> dict:
    try:
        id_list = [int(x.strip()) for x in ids_str.split(',') if x.strip()]
    except ValueError:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Неверный формат ids'}),
            'isBase64Encoded': False
        }
    
    if not id_list or len(id_list) > 100:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Укажите от 1 до 100 id'}),
            'isBase64Encoded': False
        }
    
    placeholders = ','.join(['%s'] * len(id_list))
    cur.execute(f"""
        SELECT 
            mp.id, mp.full_name, mp.user_id, mp.city, mp.address,
            mp.phone, mp.about, mp.avatar_url, mp.experience_years,
            mp.specializations, mp.rating, mp.reviews_count,
            COALESCE(mp.verification_badges, '[]'::jsonb) as verification_badges,
            COALESCE(mp.is_premium, false) as is_premium,
            mp.premium_until, mp.promoted_until, mp.created_at,
            CASE WHEN u.email LIKE '%%@imported.local' THEN true ELSE false END as is_imported
        FROM {SCHEMA}.masseur_profiles mp
        INNER JOIN {SCHEMA}.users u ON mp.user_id = u.id
        WHERE mp.id IN ({placeholders})
    """, id_list)
    
    rows = cur.fetchall()
    masseurs = [format_masseur(row) for row in rows]
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'masseurs': masseurs}),
        'isBase64Encoded': False
    }


def get_all_masseurs(cur) -> dict:
    cur.execute(f"""
        SELECT 
            mp.id, mp.full_name, mp.user_id, mp.city, mp.address,
            mp.phone, mp.about, mp.avatar_url, mp.experience_years,
            mp.specializations, mp.rating, mp.reviews_count,
            COALESCE(mp.verification_badges, '[]'::jsonb) as verification_badges,
            COALESCE(mp.is_premium, false) as is_premium,
            mp.premium_until, mp.promoted_until, mp.created_at,
            CASE WHEN u.email LIKE '%@imported.local' THEN true ELSE false END as is_imported
        FROM {SCHEMA}.masseur_profiles mp
        INNER JOIN {SCHEMA}.users u ON mp.user_id = u.id
        WHERE mp.user_id NOT IN (1, 2)
            AND COALESCE(mp.is_visible, true) = true
            AND (
                u.email LIKE '%@imported.local'
                OR (
                    mp.full_name IS NOT NULL AND mp.full_name != ''
                    AND mp.city IS NOT NULL AND mp.city != ''
                    AND mp.address IS NOT NULL AND mp.address != ''
                    AND mp.education IS NOT NULL AND mp.education != ''
                    AND mp.about IS NOT NULL AND mp.about != ''
                    AND mp.avatar_url IS NOT NULL AND mp.avatar_url != ''
                    AND mp.specializations IS NOT NULL AND array_length(mp.specializations, 1) > 0
                )
            )
        ORDER BY 
            CASE WHEN mp.promoted_until > NOW() THEN 0 ELSE 1 END,
            mp.is_premium DESC NULLS LAST,
            CASE WHEN u.email NOT LIKE '%@imported.local' THEN 0 ELSE 1 END,
            COALESCE(mp.published_at, mp.created_at) DESC NULLS LAST,
            mp.rating DESC NULLS LAST
    """)
    
    rows = cur.fetchall()
    masseurs = [format_masseur(row) for row in rows]
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'masseurs': masseurs}),
        'isBase64Encoded': False
    }


def format_masseur(row) -> dict:
    badges = row[12] if row[12] else []
    if isinstance(badges, str):
        try:
            badges = json.loads(badges)
        except:
            badges = []
    
    specializations = row[9] if row[9] else []
    if isinstance(specializations, str):
        try:
            specializations = json.loads(specializations)
        except:
            specializations = []
    
    return {
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
        'promoted_until': row[15].isoformat() if row[15] else None,
        'is_imported': row[17] if len(row) > 17 else False
    }