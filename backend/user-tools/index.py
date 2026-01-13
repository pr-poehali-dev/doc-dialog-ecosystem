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
            SELECT tools_limit, tools_used 
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
        
        limit = user.get('tools_limit', 10)
        tools_used = user.get('tools_used', 0)
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'limit': limit,
                'tools_used': tools_used,
                'dialogs_used': 0,
                'total_used': tools_used
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
        
        limit = user.get('tools_limit', 10)
        tools_used = user.get('tools_used', 0)
        
        if tools_used >= limit:
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