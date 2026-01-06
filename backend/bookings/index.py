import json
import os
import jwt
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime

def handler(event: dict, context) -> dict:
    '''API для управления записями клиентов к специалистам'''
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Authorization'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    query_params = event.get('queryStringParameters') or {}
    action = query_params.get('action', '')
    
    token = event.get('headers', {}).get('X-Authorization', '').replace('Bearer ', '')
    
    if not token:
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Требуется авторизация'}),
            'isBase64Encoded': False
        }
    
    try:
        user_data = verify_token(token)
        
        if method == 'GET' and action == 'get-bookings':
            return get_user_bookings(user_data['user_id'])
        
        if method == 'POST':
            body = json.loads(event.get('body', '{}'))
            
            if action == 'create-booking':
                return create_booking(user_data['user_id'], body)
        
        if method == 'PUT' and action == 'update-status':
            body = json.loads(event.get('body', '{}'))
            return update_booking_status(user_data['user_id'], body)
        
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Метод не поддерживается'}),
            'isBase64Encoded': False
        }
    
    except jwt.ExpiredSignatureError:
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Токен истёк'}),
            'isBase64Encoded': False
        }
    except jwt.InvalidTokenError:
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Неверный токен'}),
            'isBase64Encoded': False
        }
    except Exception as e:
        print(f"ERROR in handler: {str(e)}")
        import traceback
        traceback.print_exc()
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }


def get_db_connection():
    '''Подключение к базе данных'''
    db_url = os.environ['DATABASE_URL']
    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
    
    if schema and schema != 'public':
        escaped_schema = schema.replace('"', '""')
        conn = psycopg2.connect(db_url, options=f'-c search_path="{escaped_schema}"')
    else:
        conn = psycopg2.connect(db_url)
    
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    return conn, cursor


def verify_token(token: str) -> dict:
    '''Проверка JWT токена'''
    jwt_secret = os.environ['JWT_SECRET']
    payload = jwt.decode(token, jwt_secret, algorithms=['HS256'])
    return payload


def get_user_bookings(user_id: int) -> dict:
    '''Получение списка записей пользователя'''
    conn, cursor = get_db_connection()
    
    try:
        cursor.execute("""
            SELECT 
                a.id,
                a.masseur_id,
                a.client_id,
                a.appointment_date as date,
                a.appointment_time as time,
                a.service_type as service,
                a.status,
                a.notes,
                a.created_at,
                mp.full_name as masseur_name,
                mp.avatar_url as masseur_avatar
            FROM appointments a
            LEFT JOIN masseur_profiles mp ON a.masseur_id = mp.user_id
            WHERE a.client_id = %s
            ORDER BY a.appointment_date DESC, a.appointment_time DESC
        """, (user_id,))
        
        bookings = cursor.fetchall()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'bookings': [dict(b) for b in bookings]
            }, default=str),
            'isBase64Encoded': False
        }
    
    finally:
        cursor.close()
        conn.close()


def create_booking(user_id: int, data: dict) -> dict:
    '''Создание новой записи'''
    masseur_id = data.get('masseur_id')
    appointment_date = data.get('date')
    appointment_time = data.get('time')
    service_type = data.get('service')
    notes = data.get('notes', '')
    
    if not all([masseur_id, appointment_date, appointment_time, service_type]):
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Заполните все обязательные поля'}),
            'isBase64Encoded': False
        }
    
    conn, cursor = get_db_connection()
    
    try:
        cursor.execute("""
            INSERT INTO appointments 
            (client_id, masseur_id, appointment_date, appointment_time, service_type, notes, status)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            RETURNING id
        """, (user_id, masseur_id, appointment_date, appointment_time, service_type, notes, 'pending'))
        
        booking_id = cursor.fetchone()['id']
        conn.commit()
        
        return {
            'statusCode': 201,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'booking_id': booking_id, 'message': 'Запись создана'}),
            'isBase64Encoded': False
        }
    
    finally:
        cursor.close()
        conn.close()


def update_booking_status(user_id: int, data: dict) -> dict:
    '''Обновление статуса записи'''
    booking_id = data.get('booking_id')
    new_status = data.get('status')
    
    if not booking_id or not new_status:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Укажите ID записи и новый статус'}),
            'isBase64Encoded': False
        }
    
    conn, cursor = get_db_connection()
    
    try:
        cursor.execute("""
            UPDATE appointments 
            SET status = %s
            WHERE id = %s AND (client_id = %s OR masseur_id = %s)
        """, (new_status, booking_id, user_id, user_id))
        
        conn.commit()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'message': 'Статус обновлен'}),
            'isBase64Encoded': False
        }
    
    finally:
        cursor.close()
        conn.close()
