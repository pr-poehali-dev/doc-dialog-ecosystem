"""API для медицинских AI-инструментов: расшифровка заключений, анализ боли, сбор анамнеза"""

import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
import requests

def handler(event: dict, context) -> dict:
    """API для медицинских AI-инструментов с оплатой через баланс"""
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    headers = event.get('headers', {})
    user_id = headers.get('X-User-Id', '') or headers.get('x-user-id', '')
    
    if not user_id:
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Требуется авторизация'}),
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        try:
            body = json.loads(event.get('body', '{}'))
            action = body.get('action')
            
            if action == 'analyze_tool':
                return analyze_with_tool(user_id, body, headers)
            
            if action == 'save_anamnesis':
                return save_anamnesis(user_id, body)
            
            if action == 'get_anamnesis_list':
                return get_anamnesis_list(user_id)
            
            if action == 'get_anamnesis':
                return get_anamnesis(user_id, body)
            
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Неизвестное действие'}),
                'isBase64Encoded': False
            }
        except Exception as e:
            print(f"Error in handler: {type(e).__name__}: {str(e)}")
            import traceback
            traceback.print_exc()
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': f"{type(e).__name__}: {str(e)}"}),
                'isBase64Encoded': False
            }
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Метод не поддерживается'}),
        'isBase64Encoded': False
    }


def analyze_with_tool(user_id: str, body: dict, headers: dict) -> dict:
    """Анализ с помощью AI-инструмента: сначала списание с баланса, потом анализ"""
    
    # Списываем 15₽ с баланса ДО анализа
    balance_response = requests.post(
        'https://functions.poehali.dev/619d5197-066f-4380-8bef-994c71c76fa0',
        json={'amount': 15, 'service_type': 'medical_analysis', 'description': 'Медицинский AI-анализ'},
        headers={'Content-Type': 'application/json', 'X-User-Id': user_id},
        timeout=10
    )
    
    if balance_response.status_code != 200:
        error_data = balance_response.json()
        return {
            'statusCode': 403,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'error': error_data.get('error', 'Недостаточно средств на балансе'),
                'balance': error_data.get('balance', 0),
                'required': 15
            }),
            'isBase64Encoded': False
        }
    
    # Баланс списан успешно, выполняем анализ
    text = body.get('text', '')
    image_data = body.get('image', '')
    system_prompt = body.get('system_prompt', '')
    
    if not text and not image_data:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Требуется текст или изображение'}),
            'isBase64Encoded': False
        }
    
    openai_key = os.environ.get('OPENAI_API_KEY')
    if not openai_key:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'OPENAI_API_KEY не настроен'}),
            'isBase64Encoded': False
        }
    
    proxies = {
        'http': 'http://user:pass@185.200.177.36:3128',
        'https': 'http://user:pass@185.200.177.36:3128'
    }
    
    messages = [{'role': 'system', 'content': system_prompt}]
    
    if image_data:
        if image_data.startswith('data:'):
            image_url = image_data
        else:
            image_url = f"data:image/jpeg;base64,{image_data}"
        
        user_content = [
            {'type': 'text', 'text': text if text else 'Проанализируй это медицинское заключение'},
            {'type': 'image_url', 'image_url': {'url': image_url}}
        ]
        messages.append({'role': 'user', 'content': user_content})
    else:
        messages.append({'role': 'user', 'content': text})
    
    try:
        response = requests.post(
            'https://api.openai.com/v1/chat/completions',
            headers={
                'Authorization': f'Bearer {openai_key}',
                'Content-Type': 'application/json'
            },
            json={
                'model': 'gpt-4o',
                'messages': messages,
                'temperature': 0.7,
                'max_tokens': 2000
            },
            proxies=proxies,
            timeout=60
        )
    except requests.exceptions.Timeout:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Превышено время ожидания ответа от AI'}),
            'isBase64Encoded': False
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'Ошибка AI-сервиса: {str(e)}'}),
            'isBase64Encoded': False
        }
    
    if response.status_code != 200:
        error_text = response.text
        print(f"OpenAI API error: {response.status_code} - {error_text}")
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'Ошибка AI-сервиса: {error_text}'}),
            'isBase64Encoded': False
        }
    
    result = response.json()
    ai_response = result['choices'][0]['message']['content']
    
    # Удаляем markdown форматирование
    clean_response = ai_response.replace('**', '').replace('###', '').replace('##', '')
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'response': clean_response}),
        'isBase64Encoded': False
    }


def save_anamnesis(user_id: str, body: dict) -> dict:
    """Сохранение анамнеза клиента в БД"""
    dsn = os.environ.get('DATABASE_URL')
    schema = os.environ.get('MAIN_DB_SCHEMA', 't_p46047379_doc_dialog_ecosystem')
    
    conn = psycopg2.connect(dsn)
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        form_data = body.get('formData', {})
        ai_analysis = body.get('aiAnalysis', '')
        
        age_value = int(form_data.get("age")) if form_data.get("age") else None
        age_str = str(age_value) if age_value is not None else "NULL"
        
        full_name = str(form_data.get("fullName") or "").replace("'", "''")
        gender = str(form_data.get("gender") or "").replace("'", "''")
        main_complaint = str(form_data.get("mainComplaint") or "").replace("'", "''")
        complaint_duration = str(form_data.get("complaintDuration") or "").replace("'", "''")
        pain_location = str(form_data.get("painLocation") or "").replace("'", "''")
        pain_intensity = str(form_data.get("painIntensity") or "").replace("'", "''")
        pain_character = str(form_data.get("painCharacter") or "").replace("'", "''")
        chronic_diseases = str(form_data.get("chronicDiseases") or "").replace("'", "''")
        medications = str(form_data.get("medications") or "").replace("'", "''")
        injuries = str(form_data.get("injuries") or "").replace("'", "''")
        surgeries = str(form_data.get("surgeries") or "").replace("'", "''")
        lifestyle = str(form_data.get("lifestyle") or "").replace("'", "''")
        physical_activity = str(form_data.get("physicalActivity") or "").replace("'", "''")
        sleep = str(form_data.get("sleep") or "").replace("'", "''")
        stress = str(form_data.get("stress") or "").replace("'", "''")
        goals = str(form_data.get("goals") or "").replace("'", "''")
        contraindications = str(form_data.get("contraindications") or "").replace("'", "''")
        additional_info = str(form_data.get("additionalInfo") or "").replace("'", "''")
        ai_analysis_escaped = str(ai_analysis or "").replace("'", "''")
        
        user_id_escaped = user_id.replace("'", "''")
        
        cur.execute(f"""
            INSERT INTO {schema}.anamnesis_records (
                user_id, client_full_name, client_age, client_gender,
                main_complaint, complaint_duration, pain_location, pain_intensity, pain_character,
                chronic_diseases, medications, injuries, surgeries,
                lifestyle, physical_activity, sleep, stress,
                goals, contraindications, additional_info, ai_analysis
            ) VALUES (
                '{user_id_escaped}',
                '{full_name}', {age_str}, '{gender}',
                '{main_complaint}', '{complaint_duration}', '{pain_location}', '{pain_intensity}', '{pain_character}',
                '{chronic_diseases}', '{medications}', '{injuries}', '{surgeries}',
                '{lifestyle}', '{physical_activity}', '{sleep}', '{stress}',
                '{goals}', '{contraindications}', '{additional_info}', '{ai_analysis_escaped}'
            )
            RETURNING id
        """)
        
        result = cur.fetchone()
        conn.commit()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'id': result['id'], 'message': 'Анамнез сохранён'}),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        conn.rollback()
        print(f"Error in save_anamnesis: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
    finally:
        cur.close()
        conn.close()


def get_anamnesis_list(user_id: str) -> dict:
    """Получить список всех анамнезов пользователя"""
    dsn = os.environ.get('DATABASE_URL')
    schema = os.environ.get('MAIN_DB_SCHEMA', 't_p46047379_doc_dialog_ecosystem')
    
    conn = psycopg2.connect(dsn)
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        user_id_escaped = user_id.replace("'", "''")
        
        cur.execute(f"""
            SELECT 
                id, client_full_name, client_age, main_complaint, 
                created_at, updated_at
            FROM {schema}.anamnesis_records
            WHERE user_id = '{user_id_escaped}'
            ORDER BY created_at DESC
        """)
        
        records = cur.fetchall()
        
        records_list = []
        for record in records:
            records_list.append({
                'id': record['id'],
                'clientFullName': record['client_full_name'],
                'clientAge': record['client_age'],
                'mainComplaint': record['main_complaint'],
                'createdAt': record['created_at'].isoformat() if record['created_at'] else None,
                'updatedAt': record['updated_at'].isoformat() if record['updated_at'] else None
            })
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'records': records_list}),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        print(f"Error in get_anamnesis_list: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
    finally:
        cur.close()
        conn.close()


def get_anamnesis(user_id: str, body: dict) -> dict:
    """Получить полный анамнез по ID"""
    dsn = os.environ.get('DATABASE_URL')
    schema = os.environ.get('MAIN_DB_SCHEMA', 't_p46047379_doc_dialog_ecosystem')
    
    conn = psycopg2.connect(dsn)
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        anamnesis_id = body.get('id')
        user_id_escaped = user_id.replace("'", "''")
        
        cur.execute(f"""
            SELECT * FROM {schema}.anamnesis_records
            WHERE user_id = '{user_id_escaped}' AND id = {anamnesis_id}
        """)
        
        record = cur.fetchone()
        
        if not record:
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Анамнез не найден'}),
                'isBase64Encoded': False
            }
        
        anamnesis_data = {
            'id': record['id'],
            'formData': {
                'fullName': record['client_full_name'],
                'age': str(record['client_age']) if record['client_age'] else '',
                'gender': record['client_gender'] or '',
                'mainComplaint': record['main_complaint'] or '',
                'complaintDuration': record['complaint_duration'] or '',
                'painLocation': record['pain_location'] or '',
                'painIntensity': record['pain_intensity'] or '',
                'painCharacter': record['pain_character'] or '',
                'chronicDiseases': record['chronic_diseases'] or '',
                'medications': record['medications'] or '',
                'injuries': record['injuries'] or '',
                'surgeries': record['surgeries'] or '',
                'lifestyle': record['lifestyle'] or '',
                'physicalActivity': record['physical_activity'] or '',
                'sleep': record['sleep'] or '',
                'stress': record['stress'] or '',
                'goals': record['goals'] or '',
                'contraindications': record['contraindications'] or '',
                'additionalInfo': record['additional_info'] or ''
            },
            'aiAnalysis': record['ai_analysis'] or '',
            'createdAt': record['created_at'].isoformat() if record['created_at'] else None,
            'updatedAt': record['updated_at'].isoformat() if record['updated_at'] else None
        }
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(anamnesis_data),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        print(f"Error in get_anamnesis: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
    finally:
        cur.close()
        conn.close()
