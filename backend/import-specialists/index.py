import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
import re


def handler(event: dict, context) -> dict:
    """Backend функция для массового импорта специалистов из Excel таблицы в базу данных"""
    
    method = event.get('httpMethod', 'POST')
    query_params = event.get('queryStringParameters', {}) or {}
    action = query_params.get('action', 'import')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'GET' and action == 'list':
        try:
            dsn = os.environ.get('DATABASE_URL')
            conn = psycopg2.connect(dsn)
            cur = conn.cursor(cursor_factory=RealDictCursor)
            
            cur.execute("SELECT * FROM imported_specialists ORDER BY created_at DESC")
            specialists = cur.fetchall()
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'specialists': specialists}, default=str, ensure_ascii=False),
                'isBase64Encoded': False
            }
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': str(e)}),
                'isBase64Encoded': False
            }
    
    if method == 'PUT' and action == 'move-to-catalog':
        try:
            specialist_id = query_params.get('id')
            if not specialist_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'ID не указан'}),
                    'isBase64Encoded': False
                }
            
            dsn = os.environ.get('DATABASE_URL')
            conn = psycopg2.connect(dsn)
            cur = conn.cursor(cursor_factory=RealDictCursor)
            
            # Получаем данные импортированного специалиста
            cur.execute("SELECT * FROM imported_specialists WHERE id = %s", (specialist_id,))
            specialist = cur.fetchone()
            
            if not specialist:
                cur.close()
                conn.close()
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Специалист не найден'}),
                    'isBase64Encoded': False
                }
            
            # Генерируем email из имени
            name_parts = specialist['name'].lower().replace(' ', '_')
            email = f"{name_parts}_{specialist['id']}@imported.local"
            
            # Создаём пользователя
            cur.execute("""
                INSERT INTO users (email, password_hash, role, created_at)
                VALUES (%s, %s, %s, NOW())
                RETURNING id
            """, (email, 'imported_specialist', 'masseur'))
            user_id = cur.fetchone()['id']
            
            # Парсим опыт работы
            experience_years = 5
            exp_str = specialist.get('experience', '').strip()
            if exp_str:
                numbers = re.findall(r'\d+', exp_str)
                if numbers:
                    experience_years = int(numbers[0])
            
            # Создаём специализации
            specializations = [specialist['specialization']] if specialist.get('specialization') else []
            
            # Создаём профиль массажиста
            cur.execute("""
                INSERT INTO masseur_profiles 
                (user_id, full_name, city, experience_years, specializations, about, 
                 avatar_url, phone, rating, reviews_count, created_at, address)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NOW(), %s)
                RETURNING id
            """, (
                user_id,
                specialist['name'],
                specialist.get('location', 'Не указан'),
                experience_years,
                specializations,
                specialist.get('description', ''),
                specialist.get('photo_url', ''),
                specialist.get('phone', ''),
                float(specialist.get('rating', 0)) if specialist.get('rating') else 0.0,
                int(specialist.get('reviews_count', 0)) if specialist.get('reviews_count') else 0,
                specialist.get('location', '')
            ))
            
            masseur_id = cur.fetchone()['id']
            
            # Удаляем из импортированных
            cur.execute("DELETE FROM imported_specialists WHERE id = %s", (specialist_id,))
            
            conn.commit()
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'user_id': user_id,
                    'masseur_id': masseur_id,
                    'message': 'Специалист добавлен в каталог'
                }),
                'isBase64Encoded': False
            }
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': f'Ошибка переноса: {str(e)}'}),
                'isBase64Encoded': False
            }
    
    if method == 'DELETE':
        try:
            specialist_id = query_params.get('id')
            if not specialist_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'ID not provided'}),
                    'isBase64Encoded': False
                }
            
            dsn = os.environ.get('DATABASE_URL')
            conn = psycopg2.connect(dsn)
            cur = conn.cursor()
            
            cur.execute("DELETE FROM imported_specialists WHERE id = %s", (specialist_id,))
            conn.commit()
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': True}),
                'isBase64Encoded': False
            }
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': str(e)}),
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
        cur = conn.cursor()
        
        imported_count = 0
        skipped_count = 0
        errors = []
        
        for specialist in specialists_data:
            try:
                name = specialist.get('name', '').strip()
                specialization = specialist.get('specialization', '').strip()
                experience = specialist.get('experience', '').strip()
                description = specialist.get('description', '').strip()
                
                if not all([name, specialization, experience, description]):
                    skipped_count += 1
                    errors.append(f"Пропущен {name or 'Unknown'}: отсутствуют обязательные поля")
                    continue
                
                cur.execute("""
                    INSERT INTO imported_specialists 
                    (name, specialization, experience, description, photo_url, location, 
                     phone, email, price, schedule, rating, reviews_count, created_at)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NOW())
                """, (
                    name,
                    specialization,
                    experience,
                    description,
                    specialist.get('photo_url', ''),
                    specialist.get('location', ''),
                    specialist.get('phone', ''),
                    specialist.get('email', ''),
                    specialist.get('price', ''),
                    specialist.get('schedule', ''),
                    specialist.get('rating', 0.0),
                    specialist.get('reviews_count', 0)
                ))
                
                imported_count += 1
                
            except Exception as e:
                skipped_count += 1
                errors.append(f"Ошибка при импорте {specialist.get('name', 'Unknown')}: {str(e)}")
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