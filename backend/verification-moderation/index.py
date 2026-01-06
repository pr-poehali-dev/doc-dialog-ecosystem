import json
import os
import psycopg2
from datetime import datetime

def handler(event: dict, context) -> dict:
    """
    API для модерации верификаций массажистов администратором.
    
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
    
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    
    try:
        # Проверяем роль пользователя
        cur.execute("""
            SELECT u.id, u.role 
            FROM t_p46047379_doc_dialog_ecosystem.users u
            JOIN t_p46047379_doc_dialog_ecosystem.user_sessions s ON u.id = s.user_id
            WHERE s.token = %s AND s.expires_at > NOW()
        """, (token,))
        
        user_data = cur.fetchone()
        if not user_data or user_data[1] not in ['admin', 'moderator']:
            return {
                'statusCode': 403,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Недостаточно прав'}),
                'isBase64Encoded': False
            }
        
        admin_id = user_data[0]
        
        if method == 'GET':
            # Получить все pending верификации
            cur.execute("""
                SELECT 
                    mv.id,
                    mv.user_id,
                    u.full_name as masseur_name,
                    u.email as masseur_email,
                    'education' as type,
                    mv.education_folder_url as folder_url,
                    mv.education_status as status,
                    mv.created_at as submitted_at,
                    mv.education_comment as moderator_comment
                FROM t_p46047379_doc_dialog_ecosystem.masseur_verifications mv
                JOIN t_p46047379_doc_dialog_ecosystem.users u ON mv.user_id = u.id
                WHERE mv.education_status = 'pending' AND mv.education_folder_url IS NOT NULL
                
                UNION ALL
                
                SELECT 
                    mv.id,
                    mv.user_id,
                    u.full_name as masseur_name,
                    u.email as masseur_email,
                    'experience' as type,
                    mv.experience_folder_url as folder_url,
                    mv.experience_status as status,
                    mv.created_at as submitted_at,
                    mv.experience_comment as moderator_comment
                FROM t_p46047379_doc_dialog_ecosystem.masseur_verifications mv
                JOIN t_p46047379_doc_dialog_ecosystem.users u ON mv.user_id = u.id
                WHERE mv.experience_status = 'pending' AND mv.experience_folder_url IS NOT NULL
                
                UNION ALL
                
                SELECT 
                    mv.id,
                    mv.user_id,
                    u.full_name as masseur_name,
                    u.email as masseur_email,
                    'identity' as type,
                    mv.identity_folder_url as folder_url,
                    mv.identity_status as status,
                    mv.created_at as submitted_at,
                    mv.identity_comment as moderator_comment
                FROM t_p46047379_doc_dialog_ecosystem.masseur_verifications mv
                JOIN t_p46047379_doc_dialog_ecosystem.users u ON mv.user_id = u.id
                WHERE mv.identity_status = 'pending' AND mv.identity_folder_url IS NOT NULL
                
                UNION ALL
                
                SELECT 
                    mv.id,
                    mv.user_id,
                    u.full_name as masseur_name,
                    u.email as masseur_email,
                    'insurance' as type,
                    mv.insurance_folder_url as folder_url,
                    mv.insurance_status as status,
                    mv.created_at as submitted_at,
                    mv.insurance_comment as moderator_comment
                FROM t_p46047379_doc_dialog_ecosystem.masseur_verifications mv
                JOIN t_p46047379_doc_dialog_ecosystem.users u ON mv.user_id = u.id
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
                    'masseur_email': row[3],
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
                
                # Обновить бейджи в таблице users
                cur.execute("""
                    SELECT user_id, 
                           education_verified, 
                           experience_verified, 
                           identity_verified, 
                           insurance_verified
                    FROM t_p46047379_doc_dialog_ecosystem.masseur_verifications
                    WHERE id = %s
                """, (verification_id,))
                
                verification_data = cur.fetchone()
                if verification_data:
                    user_id = verification_data[0]
                    badges = []
                    if verification_data[1]:  # education_verified
                        badges.append('education')
                    if verification_data[2]:  # experience_verified
                        badges.append('experience')
                    if verification_data[3]:  # identity_verified
                        badges.append('identity')
                    if verification_data[4]:  # insurance_verified
                        badges.append('insurance')
                    
                    # Проверить, все ли 4 верификации одобрены
                    is_premium = len(badges) == 4
                    
                    cur.execute("""
                        UPDATE t_p46047379_doc_dialog_ecosystem.users
                        SET verification_badges = %s,
                            is_premium = %s,
                            updated_at = NOW()
                        WHERE id = %s
                    """, (json.dumps(badges), is_premium, user_id))
                
            elif action == 'reject':
                # Отклонить верификацию
                if verification_type == 'education':
                    cur.execute("""
                        UPDATE t_p46047379_doc_dialog_ecosystem.masseur_verifications
                        SET education_status = 'rejected',
                            education_comment = %s,
                            verified_by = %s,
                            verified_at = NOW(),
                            updated_at = NOW()
                        WHERE id = %s
                    """, (comment, admin_id, verification_id))
                elif verification_type == 'experience':
                    cur.execute("""
                        UPDATE t_p46047379_doc_dialog_ecosystem.masseur_verifications
                        SET experience_status = 'rejected',
                            experience_comment = %s,
                            verified_by = %s,
                            verified_at = NOW(),
                            updated_at = NOW()
                        WHERE id = %s
                    """, (comment, admin_id, verification_id))
                elif verification_type == 'identity':
                    cur.execute("""
                        UPDATE t_p46047379_doc_dialog_ecosystem.masseur_verifications
                        SET identity_status = 'rejected',
                            identity_comment = %s,
                            verified_by = %s,
                            verified_at = NOW(),
                            updated_at = NOW()
                        WHERE id = %s
                    """, (comment, admin_id, verification_id))
                elif verification_type == 'insurance':
                    cur.execute("""
                        UPDATE t_p46047379_doc_dialog_ecosystem.masseur_verifications
                        SET insurance_status = 'rejected',
                            insurance_comment = %s,
                            verified_by = %s,
                            verified_at = NOW(),
                            updated_at = NOW()
                        WHERE id = %s
                    """, (comment, admin_id, verification_id))
            
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': True, 'action': action}),
                'isBase64Encoded': False
            }
        
        else:
            return {
                'statusCode': 405,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Метод не поддерживается'}),
                'isBase64Encoded': False
            }
    
    finally:
        cur.close()
        conn.close()
