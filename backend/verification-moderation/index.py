import json
import os
import psycopg2
import jwt
from datetime import datetime

def handler(event: dict, context) -> dict:
    """
    API для модерации верификаций массажистов администратором (с JWT).
    
    GET: получить список всех pending верификаций
    POST: одобрить или отклонить верификацию
    """
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Authorization'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    # Проверка авторизации администратора
    token = event.get('headers', {}).get('X-Authorization', '').replace('Bearer ', '')
    if not token:
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Требуется авторизация'}),
            'isBase64Encoded': False
        }
    
    # Декодируем JWT токен
    try:
        jwt_secret = os.environ['JWT_SECRET']
        payload = jwt.decode(token, jwt_secret, algorithms=['HS256'])
        admin_id = payload.get('user_id')
        
        if not admin_id:
            return {
                'statusCode': 403,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Недействительный токен'}),
                'isBase64Encoded': False
            }
    except (jwt.InvalidTokenError, jwt.DecodeError, jwt.ExpiredSignatureError):
        return {
            'statusCode': 403,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Недействительный токен'}),
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    
    try:
        if method == 'GET':
            # Получить все pending верификации с использованием masseur_profiles вместо users
            cur.execute("""
                SELECT 
                    mv.id,
                    mv.user_id,
                    COALESCE(mp.full_name, 'Пользователь') as masseur_name,
                    COALESCE(mp.phone, 'Нет данных') as masseur_contact,
                    'education' as type,
                    mv.education_folder_url as folder_url,
                    mv.education_status as status,
                    mv.created_at as submitted_at,
                    mv.education_comment as moderator_comment
                FROM t_p46047379_doc_dialog_ecosystem.masseur_verifications mv
                LEFT JOIN t_p46047379_doc_dialog_ecosystem.masseur_profiles mp ON mv.user_id = mp.user_id
                WHERE mv.education_status = 'pending' AND mv.education_folder_url IS NOT NULL
                
                UNION ALL
                
                SELECT 
                    mv.id,
                    mv.user_id,
                    COALESCE(mp.full_name, 'Пользователь') as masseur_name,
                    COALESCE(mp.phone, 'Нет данных') as masseur_contact,
                    'experience' as type,
                    mv.experience_folder_url as folder_url,
                    mv.experience_status as status,
                    mv.created_at as submitted_at,
                    mv.experience_comment as moderator_comment
                FROM t_p46047379_doc_dialog_ecosystem.masseur_verifications mv
                LEFT JOIN t_p46047379_doc_dialog_ecosystem.masseur_profiles mp ON mv.user_id = mp.user_id
                WHERE mv.experience_status = 'pending' AND mv.experience_folder_url IS NOT NULL
                
                UNION ALL
                
                SELECT 
                    mv.id,
                    mv.user_id,
                    COALESCE(mp.full_name, 'Пользователь') as masseur_name,
                    COALESCE(mp.phone, 'Нет данных') as masseur_contact,
                    'identity' as type,
                    mv.identity_folder_url as folder_url,
                    mv.identity_status as status,
                    mv.created_at as submitted_at,
                    mv.identity_comment as moderator_comment
                FROM t_p46047379_doc_dialog_ecosystem.masseur_verifications mv
                LEFT JOIN t_p46047379_doc_dialog_ecosystem.masseur_profiles mp ON mv.user_id = mp.user_id
                WHERE mv.identity_status = 'pending' AND mv.identity_folder_url IS NOT NULL
                
                UNION ALL
                
                SELECT 
                    mv.id,
                    mv.user_id,
                    COALESCE(mp.full_name, 'Пользователь') as masseur_name,
                    COALESCE(mp.phone, 'Нет данных') as masseur_contact,
                    'insurance' as type,
                    mv.insurance_folder_url as folder_url,
                    mv.insurance_status as status,
                    mv.created_at as submitted_at,
                    mv.insurance_comment as moderator_comment
                FROM t_p46047379_doc_dialog_ecosystem.masseur_verifications mv
                LEFT JOIN t_p46047379_doc_dialog_ecosystem.masseur_profiles mp ON mv.user_id = mp.user_id
                WHERE mv.insurance_status = 'pending' AND mv.insurance_folder_url IS NOT NULL
                
                ORDER BY submitted_at DESC
            """)
            
            rows = cur.fetchall()
            requests = []
            for row in rows:
                requests.append({
                    'id': f"{row[0]}_{row[4]}", # verification_id + type
                    'verification_id': row[0],
                    'user_id': row[1],
                    'masseur_name': row[2],
                    'masseur_email': row[3],  # phone будет вместо email
                    'type': row[4],
                    'folder_url': row[5],
                    'status': row[6],
                    'submitted_at': row[7].isoformat() if row[7] else None,
                    'moderator_comment': row[8]
                })
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(requests),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            # Модерация верификации
            body = json.loads(event.get('body', '{}'))
            verification_id = body.get('verification_id')
            verification_type = body.get('type')
            action = body.get('action')  # 'approve' или 'reject'
            comment = body.get('comment', '')
            
            if not all([verification_id, verification_type, action]):
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Не хватает обязательных полей'}),
                    'isBase64Encoded': False
                }
            
            if action == 'approve':
                # Одобрить верификацию
                if verification_type == 'education':
                    cur.execute("""
                        UPDATE t_p46047379_doc_dialog_ecosystem.masseur_verifications
                        SET education_verified = TRUE,
                            education_status = 'approved',
                            verified_by = %s,
                            verified_at = NOW(),
                            updated_at = NOW()
                        WHERE id = %s
                    """, (admin_id, verification_id))
                elif verification_type == 'experience':
                    cur.execute("""
                        UPDATE t_p46047379_doc_dialog_ecosystem.masseur_verifications
                        SET experience_verified = TRUE,
                            experience_status = 'approved',
                            verified_by = %s,
                            verified_at = NOW(),
                            updated_at = NOW()
                        WHERE id = %s
                    """, (admin_id, verification_id))
                elif verification_type == 'identity':
                    cur.execute("""
                        UPDATE t_p46047379_doc_dialog_ecosystem.masseur_verifications
                        SET identity_verified = TRUE,
                            identity_status = 'approved',
                            verified_by = %s,
                            verified_at = NOW(),
                            updated_at = NOW()
                        WHERE id = %s
                    """, (admin_id, verification_id))
                elif verification_type == 'insurance':
                    cur.execute("""
                        UPDATE t_p46047379_doc_dialog_ecosystem.masseur_verifications
                        SET insurance_verified = TRUE,
                            insurance_status = 'approved',
                            verified_by = %s,
                            verified_at = NOW(),
                            updated_at = NOW()
                        WHERE id = %s
                    """, (admin_id, verification_id))
                
                # Получаем user_id для обновления badges
                cur.execute("""
                    SELECT user_id, education_verified, experience_verified, identity_verified, insurance_verified
                    FROM t_p46047379_doc_dialog_ecosystem.masseur_verifications
                    WHERE id = %s
                """, (verification_id,))
                
                ver_data = cur.fetchone()
                if ver_data:
                    user_id = ver_data[0]
                    badges = []
                    if ver_data[1]: badges.append('education')
                    if ver_data[2]: badges.append('experience')
                    if ver_data[3]: badges.append('identity')
                    if ver_data[4]: badges.append('insurance')
                    
                    # Обновляем badges в masseur_profiles (users недоступна)
                    cur.execute("""
                        UPDATE t_p46047379_doc_dialog_ecosystem.masseur_profiles
                        SET verification_badges = %s
                        WHERE user_id = %s
                    """, (json.dumps(badges), user_id))
                    
                    # Проверяем premium статус (все 3 бейджа)
                    if len(badges) == 3:
                        cur.execute("""
                            UPDATE t_p46047379_doc_dialog_ecosystem.masseur_verifications
                            SET is_premium = TRUE,
                                premium_until = NOW() + INTERVAL '1 year'
                            WHERE id = %s
                        """, (verification_id,))
                        
                        cur.execute("""
                            UPDATE t_p46047379_doc_dialog_ecosystem.masseur_profiles
                            SET is_premium = TRUE
                            WHERE user_id = %s
                        """, (user_id,))
            
            elif action == 'reject':
                # Отклонить верификацию
                if verification_type == 'education':
                    cur.execute("""
                        UPDATE t_p46047379_doc_dialog_ecosystem.masseur_verifications
                        SET education_verified = FALSE,
                            education_status = 'rejected',
                            education_comment = %s,
                            updated_at = NOW()
                        WHERE id = %s
                    """, (comment, verification_id))
                elif verification_type == 'experience':
                    cur.execute("""
                        UPDATE t_p46047379_doc_dialog_ecosystem.masseur_verifications
                        SET experience_verified = FALSE,
                            experience_status = 'rejected',
                            experience_comment = %s,
                            updated_at = NOW()
                        WHERE id = %s
                    """, (comment, verification_id))
                elif verification_type == 'identity':
                    cur.execute("""
                        UPDATE t_p46047379_doc_dialog_ecosystem.masseur_verifications
                        SET identity_verified = FALSE,
                            identity_status = 'rejected',
                            identity_comment = %s,
                            updated_at = NOW()
                        WHERE id = %s
                    """, (comment, verification_id))
                elif verification_type == 'insurance':
                    cur.execute("""
                        UPDATE t_p46047379_doc_dialog_ecosystem.masseur_verifications
                        SET insurance_verified = FALSE,
                            insurance_status = 'rejected',
                            insurance_comment = %s,
                            updated_at = NOW()
                        WHERE id = %s
                    """, (comment, verification_id))
            
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': True}),
                'isBase64Encoded': False
            }
        
    except Exception as e:
        conn.rollback()
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
    finally:
        cur.close()
        conn.close()