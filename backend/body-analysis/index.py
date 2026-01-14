"""API для анализа фигуры по фото с помощью OpenAI Vision"""
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
    user_id = headers.get('X-User-Id', '') or headers.get('x-user-id', '')
    return user_id

def handler(event: dict, context) -> dict:
    """API для анализа фигуры и создания программы трансформации"""
    method = event.get('httpMethod', 'GET')
    
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
            'body': json.dumps({'error': 'Метод не поддерживается'}),
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
    
    try:
        body = json.loads(event.get('body', '{}'))
        image_base64 = body.get('image')
        gender = body.get('gender', 'не указан')
        age = body.get('age', 'не указан')
        height = body.get('height', 'не указан')
        weight = body.get('weight', 'не указан')
        
        if not image_base64:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Необходимо загрузить фото'}),
                'isBase64Encoded': False
            }
        
        # Проверяем лимиты пользователя
        conn = get_db()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        schema = os.environ.get('MAIN_DB_SCHEMA', 't_p46047379_doc_dialog_ecosystem')
        
        cur.execute(f"""
            SELECT tools_limit, tools_used, extra_requests 
            FROM {schema}.users 
            WHERE id = %s
        """, (user_id,))
        
        user = cur.fetchone()
        if not user:
            cur.close()
            conn.close()
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Пользователь не найден'}),
                'isBase64Encoded': False
            }
        
        limit = user.get('tools_limit', 10)
        tools_used = user.get('tools_used', 0)
        extra_requests = user.get('extra_requests', 0)
        
        # Проверяем лимит
        if tools_used >= limit and extra_requests <= 0:
            cur.close()
            conn.close()
            return {
                'statusCode': 403,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'error': 'Достигнут лимит запросов',
                    'limit_exceeded': True
                }),
                'isBase64Encoded': False
            }
        
        # Анализируем фигуру с помощью OpenAI Vision
        analysis = analyze_body_with_openai(image_base64, gender, age, height, weight)
        
        # Увеличиваем счетчик использования
        if tools_used >= limit:
            # Списываем с extra_requests
            cur.execute(f"""
                UPDATE {schema}.users 
                SET tools_used = tools_used + 1, extra_requests = extra_requests - 1
                WHERE id = %s
            """, (user_id,))
        else:
            # Списываем с основного лимита
            cur.execute(f"""
                UPDATE {schema}.users 
                SET tools_used = tools_used + 1
                WHERE id = %s
            """, (user_id,))
        
        conn.commit()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'analysis': analysis,
                'usage': {
                    'tools_used': tools_used + 1,
                    'limit': limit,
                    'extra_requests': extra_requests - 1 if tools_used >= limit else extra_requests
                }
            }),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }

def analyze_body_with_openai(image_base64: str, gender: str, age: str, height: str, weight: str) -> str:
    """Анализирует фигуру с помощью OpenAI Vision API"""
    api_key = os.environ.get('OPENAI_API_KEY')
    
    if not api_key:
        return "Ошибка: API ключ OpenAI не настроен"
    
    # Убираем префикс data:image/...;base64, если есть
    if 'base64,' in image_base64:
        image_base64 = image_base64.split('base64,')[1]
    
    system_prompt = """Ты — профессиональный тренер и диетолог. Твоя задача: проанализировать фигуру человека по фото и создать программу трансформации.

Проанализируй фото и дай СТРУКТУРИРОВАННЫЙ ответ:

## 1. ОЦЕНКА ТЕКУЩЕГО СОСТОЯНИЯ
- Тип телосложения (эктоморф/мезоморф/эндоморф)
- Примерный процент жира (%)
- Развитость мышц (слабая/средняя/хорошая)
- Осанка (норма/сутулость/сколиоз/гиперлордоз и т.д.)
- Проблемные зоны (живот, бока, бёдра, руки и т.д.)

## 2. ОЦЕНКА ВЕСА
- Текущий вес: норма/недостаток/избыток
- Целевой вес (диапазон в кг)
- Рекомендуемый темп снижения/набора веса

## 3. ПРОГРАММА ТРЕНИРОВОК
- Тип тренировок (силовые/кардио/смешанные)
- Частота (сколько раз в неделю)
- Конкретные упражнения (5-7 основных):
  * Название упражнения
  * Зачем нужно (какую зону улучшает)
  * Подходы и повторения

## 4. ПИТАНИЕ
- Калорийность (примерный диапазон ккал/день)
- Соотношение БЖУ (белки/жиры/углеводы в граммах)
- Что добавить в рацион (5-7 продуктов)
- Что исключить или ограничить (5-7 продуктов)
- Режим питания (сколько раз в день, примерное время)

## 5. ОБРАЗ ЖИЗНИ
- Режим сна (сколько часов)
- Водный режим (сколько литров воды)
- Вредные привычки (от чего отказаться)
- Полезные привычки (что добавить)

## 6. РАБОТА НАД ОСАНКОЙ
- Упражнения для исправления осанки (3-5 штук)
- Что избегать в повседневной жизни
- Рекомендации по рабочему месту

## 7. ТАЙМЛАЙН
- Первые результаты: через X недель
- Заметные изменения: через X месяцев
- Достижение цели: через X месяцев

## 8. РЕКОМЕНДАЦИИ СПЕЦИАЛИСТОВ
- Нужен ли массаж (да/нет, какой)
- Стоит ли к остеопату
- К каким врачам обратиться (если есть проблемы)

Пиши ПРОСТЫМ ЯЗЫКОМ, БЕЗ звёздочек ** для жирного текста. Используй заголовки с ## и списки с дефисами."""
    
    user_prompt = f"""Параметры клиента:
- Пол: {gender}
- Возраст: {age} лет
- Рост: {height} см
- Вес: {weight} кг

Проанализируй фото и создай индивидуальную программу трансформации."""
    
    try:
        response = requests.post(
            'https://api.openai.com/v1/chat/completions',
            headers={
                'Authorization': f'Bearer {api_key}',
                'Content-Type': 'application/json'
            },
            json={
                'model': 'gpt-4o',
                'messages': [
                    {'role': 'system', 'content': system_prompt},
                    {
                        'role': 'user',
                        'content': [
                            {'type': 'text', 'text': user_prompt},
                            {
                                'type': 'image_url',
                                'image_url': {
                                    'url': f'data:image/jpeg;base64,{image_base64}'
                                }
                            }
                        ]
                    }
                ],
                'max_tokens': 2500,
                'temperature': 0.7
            },
            timeout=60
        )
        
        if response.status_code != 200:
            return f"Ошибка OpenAI API: {response.status_code} - {response.text}"
        
        result = response.json()
        return result['choices'][0]['message']['content']
        
    except Exception as e:
        return f"Ошибка при анализе: {str(e)}"
