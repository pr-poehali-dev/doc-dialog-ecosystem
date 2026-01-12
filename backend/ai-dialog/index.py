import json
import os
from datetime import datetime
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context) -> dict:
    '''Backend функция для работы с AI-диалогами специалистов: создание диалогов, отправка сообщений, получение истории'''
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Authorization',
                'Access-Control-Max-Age': '86400'
            },
            'body': '{}',
            'isBase64Encoded': False
        }
    
    db_url = os.environ.get('DATABASE_URL')
    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
    openai_key = os.environ.get('OPENAI_API_KEY')
    
    if not db_url:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Database configuration missing'}),
            'isBase64Encoded': False
        }
    
    if not openai_key:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'OpenAI API key not configured. Please add OPENAI_API_KEY secret.'}),
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(db_url, options=f'-c search_path={schema}')
    conn.autocommit = True
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        
        user_id = event.get('headers', {}).get('X-User-Id') or event.get('headers', {}).get('x-user-id')
        if not user_id:
            return {
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Unauthorized'}),
                'isBase64Encoded': False
            }
        
        user_id = int(user_id)
        
        if method == 'GET':
            query_params = event.get('queryStringParameters') or {}
            action = query_params.get('action', '')
            
            if action == 'list_dialogs':
                specialist = get_or_create_specialist(cursor, user_id)
                
                cursor.execute('''
                    SELECT id, title, dialog_type, created_at, updated_at
                    FROM ai_dialogs
                    WHERE specialist_id = %s
                    ORDER BY updated_at DESC
                ''', (specialist['id'],))
                
                dialogs = cursor.fetchall()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'dialogs': [dict(d) for d in dialogs],
                        'limit': specialist['ai_dialogs_limit'],
                        'used': specialist['ai_dialogs_used']
                    }, default=str),
                    'isBase64Encoded': False
                }
            
            elif action == 'get_messages':
                dialog_id = query_params.get('dialog_id')
                
                cursor.execute('''
                    SELECT m.id, m.role, m.content, m.created_at
                    FROM ai_dialog_messages m
                    JOIN ai_dialogs d ON d.id = m.dialog_id
                    JOIN specialists s ON s.id = d.specialist_id
                    WHERE m.dialog_id = %s AND s.user_id = %s
                    ORDER BY m.created_at ASC
                ''', (dialog_id, user_id))
                
                messages = cursor.fetchall()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'messages': [dict(m) for m in messages]}, default=str),
                    'isBase64Encoded': False
                }
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            action = body.get('action')
            
            specialist = get_or_create_specialist(cursor, user_id)
            
            if action == 'create_dialog':
                title = body.get('title', 'Новый диалог')
                dialog_type = body.get('type', 'supervision')
                
                if specialist['ai_dialogs_used'] >= specialist['ai_dialogs_limit']:
                    return {
                        'statusCode': 403,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Limit exceeded', 'limit': specialist['ai_dialogs_limit'], 'used': specialist['ai_dialogs_used']}),
                        'isBase64Encoded': False
                    }
                
                cursor.execute('''
                    INSERT INTO ai_dialogs (specialist_id, title, dialog_type)
                    VALUES (%s, %s, %s)
                    RETURNING id, title, dialog_type, created_at
                ''', (specialist['id'], title, dialog_type))
                
                new_dialog = cursor.fetchone()
                
                cursor.execute('''
                    UPDATE specialists
                    SET ai_dialogs_used = ai_dialogs_used + 1
                    WHERE id = %s
                ''', (specialist['id'],))
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'dialog': dict(new_dialog)}, default=str),
                    'isBase64Encoded': False
                }
            
            elif action == 'analyze_tool':
                tool_type = body.get('tool_type')
                text = body.get('text')
                system_prompt = body.get('system_prompt')
                
                if not tool_type or not text or not system_prompt:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Missing required fields'}),
                        'isBase64Encoded': False
                    }
                
                messages = [
                    {'role': 'system', 'content': system_prompt},
                    {'role': 'user', 'content': text}
                ]
                
                analysis = get_ai_response_direct(os.environ.get('OPENAI_API_KEY'), messages)
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'analysis': analysis}),
                    'isBase64Encoded': False
                }
            
            elif action == 'send_message':
                dialog_id = body.get('dialog_id')
                user_message = body.get('message')
                
                if not dialog_id or not user_message:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Missing dialog_id or message'}),
                        'isBase64Encoded': False
                    }
                
                cursor.execute('''
                    SELECT d.id, d.dialog_type, s.ai_dialogs_limit, s.ai_dialogs_used
                    FROM ai_dialogs d
                    JOIN specialists s ON s.id = d.specialist_id
                    WHERE d.id = %s AND s.user_id = %s
                ''', (dialog_id, user_id))
                
                dialog_info = cursor.fetchone()
                if not dialog_info:
                    return {
                        'statusCode': 404,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Dialog not found'}),
                        'isBase64Encoded': False
                    }
                
                cursor.execute('''
                    INSERT INTO ai_dialog_messages (dialog_id, role, content)
                    VALUES (%s, %s, %s)
                ''', (dialog_id, 'user', user_message))
                
                cursor.execute('''
                    SELECT role, content FROM ai_dialog_messages
                    WHERE dialog_id = %s
                    ORDER BY created_at ASC
                ''', (dialog_id,))
                
                history = cursor.fetchall()
                
                ai_response = get_ai_response(openai_key, dialog_info['dialog_type'], history)
                
                cursor.execute('''
                    INSERT INTO ai_dialog_messages (dialog_id, role, content)
                    VALUES (%s, %s, %s)
                    RETURNING id, role, content, created_at
                ''', (dialog_id, 'assistant', ai_response))
                
                assistant_msg = cursor.fetchone()
                
                cursor.execute('''
                    UPDATE ai_dialogs
                    SET updated_at = CURRENT_TIMESTAMP
                    WHERE id = %s
                ''', (dialog_id,))
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'message': dict(assistant_msg)}, default=str),
                    'isBase64Encoded': False
                }
        
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    finally:
        cursor.close()
        conn.close()


def get_or_create_specialist(cursor, user_id: int) -> dict:
    cursor.execute('''
        SELECT id, user_id, ai_dialogs_limit, ai_dialogs_used, subscription_tier
        FROM specialists
        WHERE user_id = %s
    ''', (user_id,))
    
    specialist = cursor.fetchone()
    
    if specialist:
        return dict(specialist)
    
    cursor.execute('''
        SELECT id FROM masseur_profiles WHERE user_id = %s LIMIT 1
    ''', (user_id,))
    
    masseur = cursor.fetchone()
    masseur_id = masseur['id'] if masseur else None
    
    cursor.execute('''
        INSERT INTO specialists (user_id, masseur_profile_id, subscription_tier, ai_dialogs_limit, ai_dialogs_used)
        VALUES (%s, %s, %s, %s, %s)
        RETURNING id, user_id, ai_dialogs_limit, ai_dialogs_used, subscription_tier
    ''', (user_id, masseur_id, 'free', 3, 0))
    
    return dict(cursor.fetchone())


def get_ai_response(api_key: str, dialog_type: str, history: list) -> str:
    import requests
    
    system_prompts = {
        'supervision': '''Ты — опытный супервизор для массажистов и телесных терапевтов. 
Твоя задача: помочь специалисту разобрать сложную ситуацию с клиентом, увидеть свои слепые зоны, найти профессиональное решение.
Задавай уточняющие вопросы, помогай увидеть ситуацию с разных сторон, поддерживай профессиональную идентичность.''',
        
        'case_analysis': '''Ты — эксперт по анализу клиентских случаев в телесной терапии.
Помогай специалисту структурировать информацию о клиенте, видеть паттерны, формулировать гипотезы и план работы.''',
        
        'boundaries': '''Ты — специалист по профессиональным границам в помогающих профессиях.
Помогай массажисту/терапевту увидеть, где нарушаются границы, как их восстановить, как говорить "нет" экологично.''',
        
        'burnout': '''Ты — консультант по профилактике выгорания у специалистов помогающих профессий.
Помогай распознать признаки выгорания, найти ресурсы, выстроить баланс работы и отдыха.''',
        
        'growth': '''Ты — карьерный консультант для массажистов и телесных терапевтов.
Помогай увидеть точки роста, определить направления развития, составить план профессионального развития.'''
    }
    
    system_prompt = system_prompts.get(dialog_type, system_prompts['supervision'])
    
    messages = [{'role': 'system', 'content': system_prompt}]
    messages.extend([{'role': h['role'], 'content': h['content']} for h in history])
    
    proxies = {
        'http': 'http://user:pass@185.200.177.36:3128',
        'https': 'http://user:pass@185.200.177.36:3128'
    }
    
    try:
        response = requests.post(
            'https://api.openai.com/v1/chat/completions',
            headers={
                'Authorization': f'Bearer {api_key}',
                'Content-Type': 'application/json'
            },
            json={
                'model': 'gpt-4o-mini',
                'messages': messages,
                'temperature': 0.7,
                'max_tokens': 800
            },
            proxies=proxies,
            timeout=25
        )
    except Exception as e:
        return f'Не удалось подключиться к AI-сервису. Ошибка: {str(e)}'
    
    if response.status_code != 200:
        return 'Извините, произошла ошибка при обращении к AI. Попробуйте позже.'
    
    result = response.json()
    return result['choices'][0]['message']['content']


def get_ai_response_direct(api_key: str, messages: list) -> str:
    '''Прямой запрос к OpenAI без истории диалога - для одноразовых анализов'''
    import requests
    
    proxies = {
        'http': 'http://user:pass@185.200.177.36:3128',
        'https': 'http://user:pass@185.200.177.36:3128'
    }
    
    try:
        response = requests.post(
            'https://api.openai.com/v1/chat/completions',
            headers={
                'Authorization': f'Bearer {api_key}',
                'Content-Type': 'application/json'
            },
            json={
                'model': 'gpt-4o-mini',
                'messages': messages,
                'temperature': 0.7,
                'max_tokens': 1500
            },
            proxies=proxies,
            timeout=25
        )
    except Exception as e:
        return f'Не удалось подключиться к AI-сервису. Ошибка: {str(e)}'
    
    if response.status_code != 200:
        return 'Извините, произошла ошибка при обращении к AI. Попробуйте позже.'
    
    result = response.json()
    return result['choices'][0]['message']['content']