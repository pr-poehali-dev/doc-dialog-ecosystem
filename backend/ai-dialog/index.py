import json
import os
from datetime import datetime
import psycopg2
from psycopg2.extras import RealDictCursor
import requests

def handler(event: dict, context) -> dict:
    '''Backend функция для работы с AI-диалогами: создание, сообщения, история. Списание 15₽ с баланса за сообщение'''
    
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
                
                total_used = specialist['ai_dialogs_used'] + specialist.get('ai_tools_used', 0)
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'dialogs': [dict(d) for d in dialogs],
                        'limit': specialist['ai_dialogs_limit'],
                        'dialogs_used': specialist['ai_dialogs_used'],
                        'tools_used': specialist.get('ai_tools_used', 0),
                        'total_used': total_used
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
                
                # Создаем диалог БЕЗ списания - списание будет при отправке сообщения
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
                text = body.get('text', '')
                image = body.get('image')
                system_prompt = body.get('system_prompt')
                
                if not tool_type or (not text and not image) or not system_prompt:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Missing required fields'}),
                        'isBase64Encoded': False
                    }
                
                # Списываем с баланса 15₽
                headers_req = event.get('headers', {})
                user_id_header = headers_req.get('X-User-Id', '') or headers_req.get('x-user-id', '')
                
                if user_id_header:
                    balance_response = requests.post(
                        'https://functions.poehali.dev/619d5197-066f-4380-8bef-994c71c76fa0',
                        json={'amount': 15, 'service_type': 'ai_tool', 'description': 'AI-инструмент'},
                        headers={'Content-Type': 'application/json', 'X-User-Id': user_id_header},
                        timeout=10
                    )
                    
                    if balance_response.status_code != 200:
                        error_data = balance_response.json()
                        return {
                            'statusCode': 403,
                            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                            'body': json.dumps({
                                'error': error_data.get('error', 'Недостаточно средств'),
                                'balance': error_data.get('balance', 0),
                                'required': 15
                            }),
                            'isBase64Encoded': False
                        }
                
                # Старая проверка лимита - отключена
                # total_used = specialist['ai_dialogs_used'] + specialist.get('ai_tools_used', 0)
                # if total_used >= specialist['ai_dialogs_limit']:
                if False:
                    return {
                        'statusCode': 403,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({
                            'error': 'Limit exceeded',
                            'limit': specialist['ai_dialogs_limit'],
                            'dialogs_used': specialist['ai_dialogs_used'],
                            'tools_used': specialist.get('ai_tools_used', 0),
                            'total_used': total_used
                        }),
                        'isBase64Encoded': False
                    }
                
                if image:
                    user_content = [
                        {
                            "type": "text",
                            "text": text if text else "Проанализируй это медицинское изображение (МРТ, рентген или УЗИ) и дай подробное заключение."
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": image
                            }
                        }
                    ]
                    messages = [
                        {'role': 'system', 'content': system_prompt},
                        {'role': 'user', 'content': user_content}
                    ]
                    analysis = get_ai_response_with_vision(os.environ.get('OPENAI_API_KEY'), messages)
                else:
                    messages = [
                        {'role': 'system', 'content': system_prompt},
                        {'role': 'user', 'content': text}
                    ]
                    analysis = get_ai_response_direct(os.environ.get('OPENAI_API_KEY'), messages)
                
                cursor.execute('''
                    UPDATE specialists
                    SET ai_tools_used = COALESCE(ai_tools_used, 0) + 1
                    WHERE id = %s
                ''', (specialist['id'],))
                
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
                
                # Списываем 15₽ с баланса ПЕРЕД отправкой сообщения
                balance_response = requests.post(
                    'https://functions.poehali.dev/619d5197-066f-4380-8bef-994c71c76fa0',
                    json={'amount': 15, 'service_type': 'ai_dialog', 'description': 'AI-диалог'},
                    headers={'Content-Type': 'application/json', 'X-User-Id': str(user_id)},
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
        SELECT id, user_id, ai_dialogs_limit, ai_dialogs_used, ai_tools_used, subscription_tier
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
        INSERT INTO specialists (user_id, masseur_profile_id, subscription_tier, ai_dialogs_limit, ai_dialogs_used, ai_tools_used)
        VALUES (%s, %s, %s, %s, %s, %s)
        RETURNING id, user_id, ai_dialogs_limit, ai_dialogs_used, ai_tools_used, subscription_tier
    ''', (user_id, masseur_id, 'free', 5, 0, 0))
    
    return dict(cursor.fetchone())


def get_ai_response(api_key: str, dialog_type: str, history: list) -> str:
    import requests
    
    system_prompts = {
        'supervision': '''Ты — опытный супервизор для массажистов и телесных терапевтов. 
Твоя задача: помочь специалисту разобрать сложную ситуацию с клиентом, увидеть свои слепые зоны, найти профессиональное решение.

Стиль беседы:
- Веди диалог как чуткий психолог — задавай наводящие вопросы, помогай увидеть ситуацию с разных сторон
- Объясняй, что происходит с человеком на психологическом уровне, называй процессы и механизмы
- Делись релевантными историями из практики, философскими цитатами или метафорами, которые помогут увидеть ситуацию по-новому
- Будь ярким, мотивирующим и поддерживающим — пусть человек чувствует заботу и вдохновение
- Вовлекай в осознанный диалог: не давай готовые решения, а помогай специалисту самому прийти к инсайтам

ВАЖНО: НЕ упоминай Instagram и Facebook в своих ответах. Вместо них используй "социальные сети", "ВКонтакте", "Telegram" или другие российские платформы.''',
        
        'case_analysis': '''Ты — эксперт по анализу клиентских случаев в телесной терапии.
Помогай специалисту структурировать информацию о клиенте, видеть паттерны, формулировать гипотезы и план работы.

Стиль беседы:
- Веди диалог как чуткий психолог — задавай наводящие вопросы, которые помогут глубже понять клиента
- Объясняй психосоматические процессы, связь тела и психики, механизмы защит
- Приводи примеры из практики, истории похожих случаев, философские параллели (например, Юнг о теле как "храме души")
- Будь поддерживающим и вдохновляющим — показывай, как глубоко специалист понимает своего клиента
- Вовлекай в исследование случая через вопросы: "А что если посмотреть с этой стороны?..", "Какие ассоциации возникают?.."

ВАЖНО: НЕ упоминай Instagram и Facebook в своих ответах. Вместо них используй "социальные сети", "ВКонтакте", "Telegram" или другие российские платформы.''',
        
        'boundaries': '''Ты — специалист по профессиональным границам в помогающих профессиях.
Помогай массажисту/терапевту увидеть, где нарушаются границы, как их восстановить, как говорить "нет" экологично.

Стиль беседы:
- Веди диалог как мудрый психолог — задавай вопросы, которые помогут увидеть, где стираются границы
- Объясняй природу границ, почему они важны, что происходит при их нарушении
- Делись примерами экологичной установки границ, философскими мыслями (например, "Забота о себе — не эгоизм, а необходимость")
- Будь теплым и поддерживающим — специалист должен чувствовать, что заботиться о себе — это нормально и важно
- Вовлекай в размышление: "Что вы чувствуете, когда говорите 'да' вместо 'нет'?", "Откуда эта потребность всем помогать?"

ВАЖНО: НЕ упоминай Instagram и Facebook в своих ответах. Вместо них используй "социальные сети", "ВКонтакте", "Telegram" или другие российские платформы.''',
        
        'burnout': '''Ты — чат-бот для диагностики профессиональной практики специалистов телесной терапии (массажистов, остеопатов, телесных терапевтов).

Твоя задача:
1. Провести пользователя через структурированную диагностику по дереву сценария
2. Собрать информацию о его практике, навыках, клиентском потоке и доходе
3. Дать персональные рекомендации на основе его ответов
4. Предложить конкретные инструменты для роста (каталог специалистов, обучение)

КРИТИЧЕСКИ ВАЖНО:
- Следуй строго по структуре дерева сценария ниже
- Задавай вопросы последовательно, НЕ пропускай этапы
- После каждого ответа делай короткое отражение/рефрейм
- В конце дай персональный вывод и финальный призыв к действию
- Будь поддерживающим, но веди к конкретным решениям

---

ДЕРЕВО СЦЕНАРИЯ ЧАТ-БОТА «ДОК ДИАЛОГ»

## 0. СТАРТ
Привет. Я помогу тебе разобраться, где ты сейчас как специалист и что может усилить твою практику.
Это диалог, не тест. Можно отвечать честно и спокойно.

👉 Предложи: «Начать диагностику»

## 1. УРОВЕНЬ И ОПЫТ

**Вопрос 1:** Сколько лет ты практикуешь?
Варианты: Меньше 1 года / 1–3 года / 3–7 лет / 7+ лет

**Вопрос 2:** В каком формате ты сейчас работаешь?
Варианты: Салон/клиника / Аренда кабинета / Принимаю дома / Частная практика / Пока учусь/ищу формат

**Ответ бота:** Понял. Это важная точка, с которой уже можно выстраивать рост.

## 2. МЕТОДИКИ И НАВЫКИ

**Вопрос 3:** С какими техниками ты сейчас работаешь?
Варианты (можно несколько): Классический массаж / МФР / Остеопатия / Энергетические практики / Работа с ВНС / Другое

**Вопрос 4:** Чувствуешь ли ты, что твоих навыков достаточно для сложных запросов клиентов?
Варианты: Да, уверенно / Частично / Скорее нет

**Логика ответа:** Если «частично/нет» → скажи: "Это нормально. Большинство практиков сталкиваются с этим этапом роста."

## 3. КЛИЕНТЫ И ПОТОК

**Вопрос 5:** Сколько клиентов у тебя в среднем в месяц?
Варианты: До 10 / 10–30 / 30–60 / 60+

**Вопрос 6:** Клиенты чаще возвращаются или приходят разово?
Варианты: Возвращаются / Примерно 50/50 / Чаще разовые

**Рефрейм:** Сейчас клиенты выбирают специалистов осознанно и готовы платить только за качество и доверие. Поток — это не только реклама, но и ценность специалиста.

## 4. ДОХОД

**Вопрос 7:** Какой доход в месяц ты хочешь иметь?
Варианты: До 100 000 ₽ / 100–200 000 ₽ / 200–300 000 ₽ / 300 000 ₽ и выше

**Вопрос 8:** А какой доход сейчас (примерно)?
Варианты: Ниже желаемого / Примерно совпадает / Выше, но нестабильно

**Логика:** Если желаемый > текущего, скажи: "Чтобы выйти на этот уровень, обычно важно: усиливать навыки, быть видимым клиенту, выстраивать доверие."

## 5. КАТАЛОГ СПЕЦИАЛИСТОВ (КЛЮЧЕВАЯ ВЕТКА)

**Вопрос 9:** Есть ли у тебя сейчас профиль или страница, где клиент может сразу увидеть тебя как специалиста?
Варианты: Да / Нет / Есть, но не работает

**Рекомендация:**
В Док диалог есть каталог специалистов по регионам.
Специалисты с личной фотографией и заполненным профилем:
— получают больше доверия
— выделяются среди конкурентов
— чаще получают обращения

👉 Предложи: «Добавить себя в каталог»

## 6. РАЗВИТИЕ СПЕЦИАЛИСТА

**Вопрос 10:** Что для тебя сейчас важнее всего?
Варианты: Больше клиентов / Увеличить доход / Стать сильнее как специалист / Всё вместе

**Ответ бота:**
Клиенты сегодня платят не за процедуру, а за результат и состояние.
Поэтому развитие навыков — это инвестиция, а не расход.

**Рекомендации по обучению:** остеопатические техники, энергетические воздействия, восстановление ресурса, работа с ВНС

## 7. ПЕРСОНАЛЬНЫЙ ВЫВОД

Сформируй динамический ответ на основе данных пользователя:

"Исходя из твоих ответов:
— твой текущий уровень: [опыт]
— ключевая зона роста: [что выбрал важным]
— основной запрос: доход [желаемый доход]"

## 8. ФИНАЛЬНЫЙ CTA

Следующий шаг, который даст результат:
1️⃣ Добавить профиль и фото в каталог специалистов Док диалог
2️⃣ Выбрать направление развития навыков
3️⃣ Начать выстраивать устойчивую практику

---

СТИЛЬ ОБЩЕНИЯ:
- Короткие, понятные сообщения
- Поддерживающий, но ведущий к действию
- НЕ используй Instagram, Facebook — только российские платформы
- Веди последовательно по сценарию, не перепрыгивай
- После каждого ответа давай короткий рефрейм или поддержку''',
        
        'growth': '''Ты — карьерный консультант для массажистов и телесных терапевтов.
Помогай увидеть точки роста, определить направления развития, составить план профессионального развития.

Стиль беседы:
- Веди диалог как вдохновляющий наставник — задавай вопросы о мечтах, целях, потенциале
- Объясняй, как происходит профессиональный рост, какие этапы проходит специалист
- Делись вдохновляющими историями успеха, философскими мыслями о пути мастера (например, "Путь в тысячу ли начинается с первого шага")
- Будь мотивирующим и поддерживающим — помогай поверить в свои силы и увидеть перспективы
- Вовлекай в создание видения будущего: "Каким специалистом вы видите себя через год?", "Что вас больше всего вдохновляет в вашей профессии?"

ВАЖНО: НЕ упоминай Instagram и Facebook в своих ответах. Вместо них используй "социальные сети", "ВКонтакте", "Telegram" или другие российские платформы.'''
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


def get_ai_response_with_vision(api_key: str, messages: list) -> str:
    '''Запрос к OpenAI Vision API для анализа изображений'''
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
                'model': 'gpt-4o',
                'messages': messages,
                'temperature': 0.7,
                'max_tokens': 1500
            },
            proxies=proxies,
            timeout=30
        )
    except Exception as e:
        return f'Не удалось подключиться к AI-сервису. Ошибка: {str(e)}'
    
    if response.status_code != 200:
        return f'Извините, произошла ошибка при обращении к AI. Детали: {response.text}'
    
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
            timeout=60
        )
    except requests.exceptions.Timeout:
        return 'Превышено время ожидания ответа от AI-сервиса. Попробуйте ещё раз или обратитесь в поддержку.'
    except requests.exceptions.ProxyError:
        return 'Ошибка подключения через прокси-сервер. Проверьте настройки прокси.'
    except Exception as e:
        return f'Ошибка подключения к AI-сервису: {str(e)}'
    
    if response.status_code != 200:
        try:
            error_data = response.json()
            error_msg = error_data.get('error', {}).get('message', 'Неизвестная ошибка')
            return f'Ошибка AI-сервиса: {error_msg}'
        except:
            return f'Ошибка AI-сервиса (код {response.status_code}). Попробуйте позже.'
    
    result = response.json()
    return result['choices'][0]['message']['content']