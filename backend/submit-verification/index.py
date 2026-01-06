import json
import os
import psycopg2
import jwt
from datetime import datetime

def handler(event: dict, context) -> dict:
    """
    API для отправки верификации массажистом.
    
    POST: отправить ссылку на документы для верификации
    GET: получить текущий статус верификаций пользователя
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
    
    # Проверка авторизации - декодируем JWT
    token = event.get('headers', {}).get('X-Authorization', '').replace('Bearer ', '')
    if not token:
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Требуется авторизация'}),
            'isBase64Encoded': False
        }
    
    try:
        jwt_secret = os.environ['JWT_SECRET']
        payload = jwt.decode(token, jwt_secret, algorithms=['HS256'])
        user_id = payload.get('user_id')
        
        if not user_id:
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
            # Получить текущий статус верификаций
            cur.execute("""
                SELECT 
                    education_verified,
                    experience_verified,
                    identity_verified,
                    insurance_verified,
                    education_status,
                    experience_status,
                    identity_status,
                    insurance_status,
                    education_comment,
                    experience_comment,
                    identity_comment,
                    insurance_comment,
                    education_folder_url,
                    experience_folder_url,
                    identity_folder_url,
                    insurance_folder_url
                FROM t_p46047379_doc_dialog_ecosystem.masseur_verifications
                WHERE user_id = %s
            """, (user_id,))
            
            row = cur.fetchone()
            if row:
                status = {
                    'education_verified': row[0],
                    'experience_verified': row[1],
                    'identity_verified': row[2],
                    'insurance_verified': row[3],
                    'education_status': row[4],
                    'experience_status': row[5],
                    'identity_status': row[6],
                    'insurance_status': row[7],
                    'education_comment': row[8],
                    'experience_comment': row[9],
                    'identity_comment': row[10],
                    'insurance_comment': row[11],
                    'education_folder_url': row[12],
                    'experience_folder_url': row[13],
                    'identity_folder_url': row[14],
                    'insurance_folder_url': row[15]
                }
            else:
                status = None
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(status),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            # Отправить верификацию
            body = json.loads(event.get('body', '{}'))
            verification_type = body.get('type')
            folder_url = body.get('folder_url', '').strip()
            
            if not verification_type or not folder_url:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Не указан тип или ссылка'}),
                    'isBase64Encoded': False
                }
            
            # Проверяем, есть ли уже запись верификации
            cur.execute("""
                SELECT id FROM t_p46047379_doc_dialog_ecosystem.masseur_verifications
                WHERE user_id = %s
            """, (user_id,))
            
            existing = cur.fetchone()
            
            if existing:
                # Обновляем существующую запись
                verification_id = existing[0]
                
                if verification_type == 'education':
                    cur.execute("""
                        UPDATE t_p46047379_doc_dialog_ecosystem.masseur_verifications
                        SET education_folder_url = %s,
                            education_status = 'pending',
                            education_verified = FALSE,
                            education_comment = NULL,
                            updated_at = NOW()
                        WHERE id = %s
                    """, (folder_url, verification_id))
                elif verification_type == 'experience':
                    cur.execute("""
                        UPDATE t_p46047379_doc_dialog_ecosystem.masseur_verifications
                        SET experience_folder_url = %s,
                            experience_status = 'pending',
                            experience_verified = FALSE,
                            experience_comment = NULL,
                            updated_at = NOW()
                        WHERE id = %s
                    """, (folder_url, verification_id))
                elif verification_type == 'identity':
                    cur.execute("""
                        UPDATE t_p46047379_doc_dialog_ecosystem.masseur_verifications
                        SET identity_folder_url = %s,
                            identity_status = 'pending',
                            identity_verified = FALSE,
                            identity_comment = NULL,
                            updated_at = NOW()
                        WHERE id = %s
                    """, (folder_url, verification_id))
                elif verification_type == 'insurance':
                    cur.execute("""
                        UPDATE t_p46047379_doc_dialog_ecosystem.masseur_verifications
                        SET insurance_folder_url = %s,
                            insurance_status = 'pending',
                            insurance_verified = FALSE,
                            insurance_comment = NULL,
                            updated_at = NOW()
                        WHERE id = %s
                    """, (folder_url, verification_id))
            else:
                # Создаем новую запись
                if verification_type == 'education':
                    cur.execute("""
                        INSERT INTO t_p46047379_doc_dialog_ecosystem.masseur_verifications
                        (user_id, education_folder_url, education_status, created_at, updated_at)
                        VALUES (%s, %s, 'pending', NOW(), NOW())
                    """, (user_id, folder_url))
                elif verification_type == 'experience':
                    cur.execute("""
                        INSERT INTO t_p46047379_doc_dialog_ecosystem.masseur_verifications
                        (user_id, experience_folder_url, experience_status, created_at, updated_at)
                        VALUES (%s, %s, 'pending', NOW(), NOW())
                    """, (user_id, folder_url))
                elif verification_type == 'identity':
                    cur.execute("""
                        INSERT INTO t_p46047379_doc_dialog_ecosystem.masseur_verifications
                        (user_id, identity_folder_url, identity_status, created_at, updated_at)
                        VALUES (%s, %s, 'pending', NOW(), NOW())
                    """, (user_id, folder_url))
                elif verification_type == 'insurance':
                    cur.execute("""
                        INSERT INTO t_p46047379_doc_dialog_ecosystem.masseur_verifications
                        (user_id, insurance_folder_url, insurance_status, created_at, updated_at)
                        VALUES (%s, %s, 'pending', NOW(), NOW())
                    """, (user_id, folder_url))
            
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