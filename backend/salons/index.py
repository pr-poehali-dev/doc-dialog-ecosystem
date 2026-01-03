"""
API для работы с салонами: регистрация, обновление профиля, получение списка вакансий
"""
import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor


def handler(event: dict, context) -> dict:
    """API для работы с салонами и вакансиями"""
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    try:
        dsn = os.environ.get('DATABASE_URL')
        conn = psycopg2.connect(dsn)
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        path = event.get('path', '')
        
        # GET /salons - список всех салонов с вакансиями
        if method == 'GET':
            city = event.get('queryStringParameters', {}).get('city')
            specialization = event.get('queryStringParameters', {}).get('specialization')
            
            query = '''
                SELECT 
                    s.id, s.name, s.description, s.city, s.address, 
                    s.phone, s.email, s.website, s.photos, s.is_verified,
                    COALESCE(
                        json_agg(
                            json_build_object(
                                'id', v.id,
                                'specializations', v.specializations,
                                'schedule', v.schedule,
                                'salary_from', v.salary_from,
                                'salary_to', v.salary_to,
                                'salary_currency', v.salary_currency,
                                'requirements', v.requirements,
                                'requires_partner_courses', v.requires_partner_courses
                            )
                        ) FILTER (WHERE v.id IS NOT NULL), '[]'
                    ) as vacancies
                FROM salons s
                LEFT JOIN salon_vacancies v ON s.id = v.salon_id
                WHERE 1=1
            '''
            
            params = []
            if city:
                query += ' AND LOWER(s.city) = LOWER(%s)'
                params.append(city)
            
            if specialization:
                query += ' AND EXISTS (SELECT 1 FROM salon_vacancies WHERE salon_id = s.id AND %s = ANY(specializations))'
                params.append(specialization)
            
            query += ' GROUP BY s.id ORDER BY s.is_verified DESC, s.created_at DESC'
            
            cursor.execute(query, params)
            salons = cursor.fetchall()
            
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps([dict(s) for s in salons], default=str),
                'isBase64Encoded': False
            }
        
        # POST /salons - создать новый салон
        if method == 'POST' and '/salons' in path:
            body = json.loads(event.get('body', '{}'))
            
            cursor.execute('''
                INSERT INTO salons (name, description, city, address, phone, email, website, photos)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING id
            ''', (
                body.get('name'),
                body.get('description'),
                body.get('city'),
                body.get('address'),
                body.get('phone'),
                body.get('email'),
                body.get('website'),
                json.dumps(body.get('photos', []))
            ))
            
            salon_id = cursor.fetchone()['id']
            conn.commit()
            
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'id': salon_id, 'message': 'Salon created'}),
                'isBase64Encoded': False
            }
        
        # PUT /salons/{id} - обновить салон
        if method == 'PUT' and path.startswith('/salons/'):
            salon_id = path.split('/')[-1]
            body = json.loads(event.get('body', '{}'))
            
            cursor.execute('''
                UPDATE salons 
                SET name = %s, description = %s, city = %s, address = %s, 
                    phone = %s, email = %s, website = %s, photos = %s
                WHERE id = %s
            ''', (
                body.get('name'),
                body.get('description'),
                body.get('city'),
                body.get('address'),
                body.get('phone'),
                body.get('email'),
                body.get('website'),
                json.dumps(body.get('photos', [])),
                salon_id
            ))
            
            # Удалить старые вакансии и добавить новые
            cursor.execute('DELETE FROM salon_vacancies WHERE salon_id = %s', (salon_id,))
            
            vacancies = body.get('vacancies', [])
            for vac in vacancies:
                cursor.execute('''
                    INSERT INTO salon_vacancies 
                    (salon_id, specializations, schedule, salary_from, salary_to, 
                     salary_currency, requirements, requires_partner_courses)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                ''', (
                    salon_id,
                    vac.get('specializations', []),
                    vac.get('schedule'),
                    vac.get('salary_from'),
                    vac.get('salary_to'),
                    vac.get('salary_currency', 'RUB'),
                    vac.get('requirements'),
                    vac.get('requires_partner_courses', False)
                ))
            
            conn.commit()
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'message': 'Salon updated'}),
                'isBase64Encoded': False
            }
        
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }