"""API для ИИ-инструментов пользователей: расшифровка заключений и анализ болей"""
import json
import os
import base64
import psycopg2
from psycopg2.extras import RealDictCursor
import requests

def get_db():
    dsn = os.environ.get('DATABASE_URL')
    return psycopg2.connect(dsn)

def get_user_id_from_header(event: dict) -> str:
    headers = event.get('headers', {})
    print(f"All headers: {headers}")
    user_id = headers.get('X-User-Id', '') or headers.get('x-user-id', '')
    print(f"Extracted user_id: {user_id}")
    return user_id

def handler(event: dict, context) -> dict:
    """API для работы с ИИ-инструментами пользователей"""
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
    
    user_id = get_user_id_from_header(event)
    if not user_id:
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Требуется авторизация'}),
            'isBase64Encoded': False
        }
    
    params = event.get('queryStringParameters') or {}
    action = params.get('action', 'usage')
    
    if method == 'GET':
        if action == 'usage':
            return get_usage(user_id)
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Неизвестное действие'}),
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        try:
            body = json.loads(event.get('body', '{}'))
            action = body.get('action')
            
            if action == 'analyze_tool':
                return analyze_with_tool(user_id, body)
            
            if action == 'buy_extra_requests':
                return buy_extra_requests(user_id, body)
            
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
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': str(e)}),
                'isBase64Encoded': False
            }
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Метод не поддерживается'}),
        'isBase64Encoded': False
    }

def get_usage(user_id: str) -> dict:
    """Получить статистику использования инструментов"""
    conn = get_db()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    schema = os.environ.get('MAIN_DB_SCHEMA', 't_p46047379_doc_dialog_ecosystem')
    
    try:
        cur.execute(f"""
            SELECT tools_limit, tools_used, extra_requests 
            FROM {schema}.users 
            WHERE id = %s
        """, (user_id,))
        
        user = cur.fetchone()
        if not user:
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Пользователь не найден'}),
                'isBase64Encoded': False
            }
        
        limit = user.get('tools_limit', 5)
        tools_used = user.get('tools_used', 0)
        extra_requests = user.get('extra_requests', 0)
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'limit': limit,
                'tools_used': tools_used,
                'dialogs_used': 0,
                'total_used': tools_used,
                'extra_requests': extra_requests
            }),
            'isBase64Encoded': False
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
    finally:
        cur.close()
        conn.close()

def analyze_with_tool(user_id: str, body: dict) -> dict:
    """Анализ с помощью ИИ-инструмента"""
    conn = get_db()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    schema = os.environ.get('MAIN_DB_SCHEMA', 't_p46047379_doc_dialog_ecosystem')
    
    try:
        cur.execute(f"SELECT tools_limit, tools_used FROM {schema}.users WHERE id = %s", (user_id,))
        user = cur.fetchone()
        
        if not user:
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Пользователь не найден'}),
                'isBase64Encoded': False
            }
        
        limit = user.get('tools_limit', 5)
        tools_used = user.get('tools_used', 0)
        extra_requests = user.get('extra_requests', 0)
        
        # Проверка лимита: базовый лимит + купленные запросы
        total_available = limit + extra_requests
        
        if tools_used >= total_available:
            return {
                'statusCode': 429,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Превышен лимит использования инструментов', 'limit_reached': True}),
                'isBase64Encoded': False
            }

        
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
            timeout=30
        )
        
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
        
        cur.execute(f"""
            UPDATE {schema}.users 
            SET tools_used = tools_used + 1 
            WHERE id = %s
        """, (user_id,))
        conn.commit()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'response': ai_response}),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        conn.rollback()
        print(f"Error in analyze_with_tool: {type(e).__name__}: {str(e)}")
        import traceback
        traceback.print_exc()
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f"{type(e).__name__}: {str(e)}"}),
            'isBase64Encoded': False
        }
    finally:
        cur.close()
        conn.close()

def buy_extra_requests(user_id: str, body: dict) -> dict:
    """Создание платежа для покупки дополнительных запросов"""
    from datetime import datetime
    conn = get_db()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    schema = os.environ.get('MAIN_DB_SCHEMA', 't_p46047379_doc_dialog_ecosystem')
    
    try:
        count = body.get('count', 5)
        
        # Пакеты со скидками
        price_table = {
            5: 60,    # без скидки
            10: 108,  # -10%
            20: 192,  # -20%
            50: 420,  # -30%
            100: 720  # -40%
        }
        
        # Определяем цену
        if count in price_table:
            amount = price_table[count]
        else:
            # Если количество не в таблице - считаем по базовой цене
            amount = count * 12
        
        if count <= 0 or amount <= 0:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Некорректное количество запросов'}),
                'isBase64Encoded': False
            }
        
        cur.execute(f"SELECT email FROM {schema}.users WHERE id = %s", (user_id,))
        user = cur.fetchone()
        
        if not user:
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Пользователь не найден'}),
                'isBase64Encoded': False
            }
        
        yoomoney_shop_id = os.environ.get('YOOMONEY_SHOP_ID')
        yoomoney_secret_key = os.environ.get('YOOMONEY_SECRET_KEY')
        
        if not yoomoney_shop_id or not yoomoney_secret_key:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Платёжная система не настроена'}),
                'isBase64Encoded': False
            }
        
        import uuid
        
        payment_id = str(uuid.uuid4())
        description = f"Покупка {count} AI-запросов"
        
        return_url = f"https://{os.environ.get('PROJECT_ID', 'app')}.poehali.dev/dashboard/tools?payment=success"
        
        payment_data = {
            'amount': {
                'value': str(amount),
                'currency': 'RUB'
            },
            'confirmation': {
                'type': 'redirect',
                'return_url': return_url
            },
            'capture': True,
            'description': description,
            'metadata': {
                'user_id': str(user_id),
                'count': str(count),
                'type': 'extra_requests'
            }
        }
        
        import requests
        import base64
        
        auth_string = f"{yoomoney_shop_id}:{yoomoney_secret_key}"
        auth_header = base64.b64encode(auth_string.encode()).decode()
        
        response = requests.post(
            'https://api.yookassa.ru/v3/payments',
            json=payment_data,
            headers={
                'Authorization': f'Basic {auth_header}',
                'Content-Type': 'application/json',
                'Idempotence-Key': payment_id
            },
            timeout=10
        )
        
        if response.status_code != 200:
            print(f"YooMoney API error: {response.text}")
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Ошибка создания платежа'}),
                'isBase64Encoded': False
            }
        
        payment_result = response.json()
        payment_url = payment_result.get('confirmation', {}).get('confirmation_url', '')
        
        cur.execute(f"""
            INSERT INTO {schema}.payment_logs (user_id, payment_id, amount, type, status, metadata)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (user_id, payment_result.get('id'), amount, 'extra_requests', 'pending', json.dumps({'count': count})))
        conn.commit()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'payment_url': payment_url, 'payment_id': payment_result.get('id')}),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        print(f"Error in buy_extra_requests: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
    finally:
        cur.close()
        conn.close()

def save_anamnesis(user_id: str, body: dict) -> dict:
    """Сохранение анамнеза клиента в БД"""
    conn = get_db()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    schema = os.environ.get('MAIN_DB_SCHEMA', 't_p46047379_doc_dialog_ecosystem')
    
    try:
        form_data = body.get('formData', {})
        ai_analysis = body.get('aiAnalysis', '')
        
        cur.execute(f"""
            INSERT INTO {schema}.anamnesis_records (
                user_id, client_full_name, client_age, client_gender,
                main_complaint, complaint_duration, pain_location, pain_intensity, pain_character,
                chronic_diseases, medications, injuries, surgeries,
                lifestyle, physical_activity, sleep, stress,
                goals, contraindications, additional_info, ai_analysis
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id
        """, (
            user_id,
            form_data.get('fullName'),
            int(form_data.get('age')) if form_data.get('age') else None,
            form_data.get('gender'),
            form_data.get('mainComplaint'),
            form_data.get('complaintDuration'),
            form_data.get('painLocation'),
            form_data.get('painIntensity'),
            form_data.get('painCharacter'),
            form_data.get('chronicDiseases'),
            form_data.get('medications'),
            form_data.get('injuries'),
            form_data.get('surgeries'),
            form_data.get('lifestyle'),
            form_data.get('physicalActivity'),
            form_data.get('sleep'),
            form_data.get('stress'),
            form_data.get('goals'),
            form_data.get('contraindications'),
            form_data.get('additionalInfo'),
            ai_analysis
        ))
        
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
    conn = get_db()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    schema = os.environ.get('MAIN_DB_SCHEMA', 't_p46047379_doc_dialog_ecosystem')
    
    try:
        cur.execute(f"""
            SELECT 
                id, client_full_name, client_age, main_complaint, 
                created_at, updated_at
            FROM {schema}.anamnesis_records
            WHERE user_id = %s
            ORDER BY created_at DESC
        """, (user_id,))
        
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
    conn = get_db()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    schema = os.environ.get('MAIN_DB_SCHEMA', 't_p46047379_doc_dialog_ecosystem')
    
    try:
        anamnesis_id = body.get('id')
        
        cur.execute(f"""
            SELECT * FROM {schema}.anamnesis_records
            WHERE user_id = %s AND id = %s
        """, (user_id, anamnesis_id))
        
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