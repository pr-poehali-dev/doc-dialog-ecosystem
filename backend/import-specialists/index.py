import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
import re


def handler(event: dict, context) -> dict:
    """Backend функция для массового импорта специалистов из Excel таблицы в базу данных"""
    
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        body = json.loads(event.get('body', '{}'))
        specialists_data = body.get('specialists', [])
        
        if not specialists_data:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'No specialists data provided'}),
                'isBase64Encoded': False
            }
        
        dsn = os.environ.get('DATABASE_URL')
        if not dsn:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Database connection not configured'}),
                'isBase64Encoded': False
            }
        
        conn = psycopg2.connect(dsn)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        imported_count = 0
        skipped_count = 0
        errors = []
        
        for specialist in specialists_data:
            try:
                external_id = specialist.get('id', '')
                full_name = specialist.get('name', '').strip()
                profile_url = specialist.get('url', '')
                specialization = specialist.get('specialization', '')
                experience_info = specialist.get('experience', '')
                address = specialist.get('address', '')
                phones = specialist.get('phones', '')
                
                if not full_name:
                    skipped_count += 1
                    errors.append(f"Пропущен специалист ID {external_id}: нет имени")
                    continue
                
                # Генерируем email из имени или используем временный
                email_base = re.sub(r'[^a-zA-Z0-9]', '', full_name.lower().replace(' ', '.'))
                if not email_base:
                    email_base = f"specialist_{external_id}"
                email = f"{email_base}@imported.prodoctorov.ru"
                
                # Проверяем, существует ли пользователь с таким email
                cur.execute(
                    "SELECT id FROM t_p46047379_doc_dialog_ecosystem.users WHERE email = %s",
                    (email,)
                )
                existing_user = cur.fetchone()
                
                if existing_user:
                    skipped_count += 1
                    errors.append(f"Пропущен {full_name}: пользователь уже существует")
                    continue
                
                # Создаём пользователя
                cur.execute("""
                    INSERT INTO t_p46047379_doc_dialog_ecosystem.users 
                    (email, password_hash, role, created_at)
                    VALUES (%s, %s, %s, NOW())
                    RETURNING id
                """, (
                    email,
                    'imported_no_password',  # Временный пароль, пользователь сможет восстановить
                    'masseur'
                ))
                user_id = cur.fetchone()['id']
                
                # Парсим телефоны
                phone_list = []
                if phones:
                    phone_list = [p.strip() for p in re.split(r'[|,]', phones) if p.strip()]
                
                # Парсим специализации
                specializations = []
                if specialization:
                    specializations = [s.strip() for s in specialization.split(',')]
                
                # Извлекаем опыт работы из строки (если есть число лет)
                experience_years = None
                if experience_info:
                    match = re.search(r'опыт\s+(\d+)', experience_info, re.IGNORECASE)
                    if match:
                        experience_years = int(match.group(1))
                
                # Формируем описание
                about_parts = []
                if profile_url:
                    about_parts.append(f"Источник: {profile_url}")
                if experience_info:
                    about_parts.append(f"Образование и опыт: {experience_info}")
                if address:
                    about_parts.append(f"Адреса приёма: {address}")
                
                about = '\n'.join(about_parts) if about_parts else None
                
                # Основной телефон (первый из списка)
                main_phone = phone_list[0] if phone_list else None
                
                # Создаём профиль массажиста
                cur.execute("""
                    INSERT INTO t_p46047379_doc_dialog_ecosystem.masseur_profiles
                    (user_id, full_name, phone, specializations, about, experience_years, address, created_at)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, NOW())
                """, (
                    user_id,
                    full_name,
                    main_phone,
                    specializations if specializations else None,
                    about,
                    experience_years,
                    address
                ))
                
                imported_count += 1
                
            except Exception as e:
                skipped_count += 1
                errors.append(f"Ошибка при импорте {specialist.get('name', 'Unknown')}: {str(e)}")
                conn.rollback()
                continue
        
        conn.commit()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'success': True,
                'imported': imported_count,
                'skipped': skipped_count,
                'errors': errors[:10]  # Первые 10 ошибок
            }, ensure_ascii=False),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'Import failed: {str(e)}'}),
            'isBase64Encoded': False
        }
