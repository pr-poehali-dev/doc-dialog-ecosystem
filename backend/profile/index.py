import json
import os
import psycopg2
import jwt
from psycopg2.extras import RealDictCursor

def handler(event: dict, context) -> dict:
    """
    API для получения и обновления профиля массажиста
    GET - получить профиль
    PUT - обновить профиль
    """
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Authorization',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    headers = event.get('headers', {})
    token = headers.get('X-Authorization', headers.get('x-authorization', '')).replace('Bearer ', '')
    
    if not token:
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Не авторизован'}),
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
    
    dsn = os.environ['DATABASE_URL']
    schema = os.environ['MAIN_DB_SCHEMA']
    
    conn = psycopg2.connect(dsn)
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        if method == 'GET':
            cur.execute(f"""
                SELECT 
                    id, user_id, full_name, phone, telegram, max_messenger, city, address,
                    experience_years, specializations, about,
                    avatar_url, education, languages, 
                    certificates, portfolio_images, rating, reviews_count,
                    verification_badges, is_premium, is_visible, service_descriptions
                FROM {schema}.masseur_profiles
                WHERE user_id = {user_id}
            """)
            
            profile = cur.fetchone()
            
            if not profile:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Профиль не найден'}),
                    'isBase64Encoded': False
                }
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(dict(profile), default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'PUT':
            body = json.loads(event.get('body', '{}'))
            
            # If only is_visible is provided, update only that field
            if 'is_visible' in body and len(body) == 1:
                is_visible = body.get('is_visible')
                # When publishing (is_visible = true), set published_at if not set
                if is_visible:
                    cur.execute(f"""
                        UPDATE {schema}.masseur_profiles
                        SET is_visible = {is_visible},
                            published_at = COALESCE(published_at, NOW())
                        WHERE user_id = {user_id}
                    """)
                else:
                    cur.execute(f"""
                        UPDATE {schema}.masseur_profiles
                        SET is_visible = {is_visible}
                        WHERE user_id = {user_id}
                    """)
                conn.commit()
                cur.close()
                conn.close()
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'success': True, 'is_visible': is_visible}),
                    'isBase64Encoded': False
                }
            
            full_name = body.get('full_name', '')
            phone = body.get('phone', '')
            telegram = body.get('telegram', '')
            max_messenger = body.get('max_messenger', '')
            city = body.get('city', '')
            address = body.get('address', '')
            experience_years = body.get('experience_years', 0)
            about = body.get('about', '')
            education = body.get('education', '')
            languages = body.get('languages', [])
            specializations = body.get('specializations', [])
            certificates = body.get('certificates', [])
            avatar_url = body.get('avatar_url', '')
            service_descriptions = body.get('service_descriptions', {})
            
            # Проверка всех обязательных полей
            if not full_name or not phone or not city or not address or not education or not about or not avatar_url or len(specializations) == 0:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Заполните все обязательные поля: имя, телефон, город, адрес, образование, о себе, фото и минимум 1 формат работы'}),
                    'isBase64Encoded': False
                }
            
            cur.execute(f"""
                SELECT id FROM {schema}.masseur_profiles WHERE user_id = {user_id}
            """)
            existing = cur.fetchone()
            
            if existing:
                languages_str = '{' + ','.join([f'"{lang}"' for lang in languages]) + '}'
                specs_str = '{' + ','.join([f'"{spec}"' for spec in specializations]) + '}'
                certs_str = '{' + ','.join([f'"{cert}"' for cert in certificates]) + '}'
                
                first_name = ''
                last_name = ''
                if full_name:
                    name_parts = full_name.strip().split(' ', 1)
                    first_name = name_parts[0]
                    last_name = name_parts[1] if len(name_parts) > 1 else ''
                
                cur.execute(f"""
                    UPDATE {schema}.users
                    SET first_name = '{first_name}', last_name = '{last_name}', phone = '{phone}'
                    WHERE id = {user_id}
                """)
                
                service_desc_json = json.dumps(service_descriptions).replace("'", "''")
                
                cur.execute(f"""
                    UPDATE {schema}.masseur_profiles
                    SET 
                        full_name = '{full_name}',
                        phone = '{phone}',
                        telegram = '{telegram}',
                        max_messenger = '{max_messenger}',
                        city = '{city}',
                        address = '{address}',
                        experience_years = {experience_years},
                        about = '{about}',
                        education = '{education}',
                        avatar_url = '{avatar_url}',
                        languages = '{languages_str}',
                        specializations = '{specs_str}',
                        certificates = '{certs_str}',
                        service_descriptions = '{service_desc_json}'::jsonb
                    WHERE user_id = {user_id}
                    RETURNING id
                """)
            else:
                languages_str = '{' + ','.join([f'"{lang}"' for lang in languages]) + '}'
                specs_str = '{' + ','.join([f'"{spec}"' for spec in specializations]) + '}'
                certs_str = '{' + ','.join([f'"{cert}"' for cert in certificates]) + '}'
                
                first_name = ''
                last_name = ''
                if full_name:
                    name_parts = full_name.strip().split(' ', 1)
                    first_name = name_parts[0]
                    last_name = name_parts[1] if len(name_parts) > 1 else ''
                
                cur.execute(f"""
                    UPDATE {schema}.users
                    SET first_name = '{first_name}', last_name = '{last_name}', phone = '{phone}', telegram = '{telegram}', max_messenger = '{max_messenger}'
                    WHERE id = {user_id}
                """)
                
                service_desc_json = json.dumps(service_descriptions).replace("'", "''")
                
                cur.execute(f"""
                    INSERT INTO {schema}.masseur_profiles 
                    (user_id, full_name, phone, telegram, max_messenger, city, address, experience_years, about, education, avatar_url, languages, specializations, certificates, service_descriptions)
                    VALUES ({user_id}, '{full_name}', '{phone}', '{telegram}', '{max_messenger}', '{city}', '{address}', {experience_years}, '{about}', '{education}', '{avatar_url}',
                            '{languages_str}', '{specs_str}', '{certs_str}', '{service_desc_json}'::jsonb)
                    RETURNING id
                """)
            
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': True, 'message': 'Профиль сохранен'}),
                'isBase64Encoded': False
            }
        
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Метод не поддерживается'}),
            'isBase64Encoded': False
        }
    
    finally:
        cur.close()
        conn.close()