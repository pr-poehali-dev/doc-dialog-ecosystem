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
                return buy_extra_requests(user_id, body, event)
            
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
            SELECT tools_limit, tools_used, extra_requests, first_purchase_bonus_used 
            FROM {schema}.users 
            WHERE id = '{user_id.replace("'", "''")}'
        """)
        
        user = cur.fetchone()
        if not user:
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Пользователь не найден'}),
                'isBase64Encoded': False
            }
        
        limit = user.get('tools_limit', 10)
        tools_used = user.get('tools_used', 0)
        extra_requests = user.get('extra_requests', 0)
        first_purchase_bonus_used = user.get('first_purchase_bonus_used', False)
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'limit': limit,
                'tools_used': tools_used,
                'dialogs_used': 0,
                'total_used': tools_used,
                'extra_requests': extra_requests,
                'first_purchase_bonus_available': not first_purchase_bonus_used
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
        cur.execute(f"SELECT tools_limit, tools_used FROM {schema}.users WHERE id = '{user_id.replace("'", "''")}' ")
        user = cur.fetchone()
        
        if not user:
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Пользователь не найден'}),
                'isBase64Encoded': False
            }
        
        # Проверяем лимит (старая логика восстановлена)
        limit = user.get('tools_limit', 10)
        tools_used = user.get('tools_used', 0)
        extra_requests = user.get('extra_requests', 0)
        total_available = limit + extra_requests
        
        if tools_used >= total_available:
            return {
                'statusCode': 403,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'error': 'Исп ользованы все доступные запросы',
                    'limit': limit,
                    'tools_used': tools_used,
                    'extra_requests': extra_requests,
                    'total_available': total_available,
                    'limit_reached': True
                }),
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
        
        # Удаляем markdown форматирование для чистого отображения
        clean_response = ai_response.replace('**', '').replace('###', '').replace('##', '')
        
        cur.execute(f"""
            UPDATE {schema}.users 
            SET tools_used = tools_used + 1 
            WHERE id = '{user_id.replace("'", "''")}'
        """)
        conn.commit()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'response': clean_response}),
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

def buy_extra_requests(user_id: str, body: dict, event: dict) -> dict:
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
        
        cur.execute(f"SELECT email, first_purchase_bonus_used FROM {schema}.users WHERE id = '{user_id.replace("'", "''")}' ")
        user = cur.fetchone()
        
        first_purchase_bonus_used = user.get('first_purchase_bonus_used', False)
        
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
        import requests
        import base64
        
        payment_id = str(uuid.uuid4())
        
        # Проверяем бонус первой покупки
        actual_count = count
        if not first_purchase_bonus_used:
            actual_count = count * 2  # Удваиваем количество
            description = f"Покупка {count} AI-запросов (x2 БОНУС = {actual_count} запросов)"
        else:
            description = f"Покупка {count} AI-запросов"
        
        # Используем реферер для определения домена или дефолтный домен
        headers = event.get('headers', {})
        origin = headers.get('Origin') or headers.get('origin') or headers.get('Referer') or headers.get('referer') or 'https://docdialog.su'
        base_domain = origin.split('//')[1].split('/')[0] if '//' in origin else 'docdialog.su'
        return_url = f"https://{base_domain}/payment/processing?type=extra_requests"
        
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
            'receipt': {
                'customer': {
                    'email': user.get('email', 'noreply@brossok.ru')
                },
                'items': [
                    {
                        'description': description,
                        'quantity': '1',
                        'amount': {
                            'value': str(amount),
                            'currency': 'RUB'
                        },
                        'vat_code': 1,
                        'payment_mode': 'full_payment',
                        'payment_subject': 'service'
                    }
                ]
            },
            'metadata': {
                'user_id': str(user_id),
                'count': str(actual_count),  # Сохраняем фактическое количество с бонусом
                'original_count': str(count),  # Оригинальное количество
                'first_purchase_bonus': str(not first_purchase_bonus_used),
                'type': 'extra_requests'
            }
        }
        
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
        
        metadata_json = json.dumps({'count': count}).replace("'", "''")
        cur.execute(f"""
            INSERT INTO {schema}.payment_logs (user_id, payment_id, amount, type, status, metadata)
            VALUES ('{user_id.replace("'", "''")}', '{payment_result.get('id')}', {amount}, 'extra_requests', 'pending', '{metadata_json}')
        """)
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
        
        cur.execute(f"""
            INSERT INTO {schema}.anamnesis_records (
                user_id, client_full_name, client_age, client_gender,
                main_complaint, complaint_duration, pain_location, pain_intensity, pain_character,
                chronic_diseases, medications, injuries, surgeries,
                lifestyle, physical_activity, sleep, stress,
                goals, contraindications, additional_info, ai_analysis
            ) VALUES (
                '{user_id.replace("'", "''")}',
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
    conn = get_db()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    schema = os.environ.get('MAIN_DB_SCHEMA', 't_p46047379_doc_dialog_ecosystem')
    
    try:
        cur.execute(f"""
            SELECT 
                id, client_full_name, client_age, main_complaint, 
                created_at, updated_at
            FROM {schema}.anamnesis_records
            WHERE user_id = '{user_id.replace("'", "''")}'
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
    conn = get_db()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    schema = os.environ.get('MAIN_DB_SCHEMA', 't_p46047379_doc_dialog_ecosystem')
    
    try:
        anamnesis_id = body.get('id')
        
        cur.execute(f"""
            SELECT * FROM {schema}.anamnesis_records
            WHERE user_id = '{user_id.replace("'", "''")}' AND id = {anamnesis_id}
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