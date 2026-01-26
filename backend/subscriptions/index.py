import json
import os
import psycopg2
from datetime import datetime, timedelta

def handler(event: dict, context) -> dict:
    """API для управления подписками школ на тарифные планы"""
    
    try:
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
        
        dsn = os.environ.get('DATABASE_URL')
        schema = 't_p46047379_doc_dialog_ecosystem'
        
        conn = psycopg2.connect(dsn)
        conn.autocommit = True
        cur = conn.cursor()
        
        query_params = event.get('queryStringParameters', {}) or {}
        action = query_params.get('action', '')
        headers = event.get('headers', {})
        user_id = headers.get('X-User-Id', headers.get('x-user-id', ''))
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'Init error: {str(e)}'}),
            'isBase64Encoded': False
        }
    
    # GET /subscriptions?action=subscription_plans - Получить все тарифные планы
    if method == 'GET' and action == 'subscription_plans':
        cur.execute(f"""
            SELECT id, name, price, courses_limit, messages_limit_per_day, 
                   promo_requests_allowed, description, top_promotions_limit
            FROM {schema}.subscription_plans
            ORDER BY price ASC
        """)
        
        plans = []
        for row in cur.fetchall():
            plans.append({
                'id': row[0],
                'name': row[1],
                'price': float(row[2]),
                'courses_limit': row[3],
                'messages_limit_per_day': row[4],
                'promo_requests_allowed': row[5],
                'description': row[6],
                'top_promotions_limit': row[7]
            })
        
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'plans': plans}),
            'isBase64Encoded': False
        }
    
    # GET /subscriptions?action=my_subscription - Получить активную подписку школы
    if method == 'GET' and action == 'my_subscription':
        if not user_id:
            cur.close()
            conn.close()
            return {
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'User ID required'}),
                'isBase64Encoded': False
            }
        
        # Получаем school_id пользователя
        cur.execute(f"SELECT id, courses_published_this_month, messages_sent_today, top_promotions_used_this_month FROM {schema}.schools WHERE user_id = {user_id}")
        school_data = cur.fetchone()
        
        if not school_data:
            cur.close()
            conn.close()
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'School not found'}),
                'isBase64Encoded': False
            }
        
        school_id = school_data[0]
        
        # Считаем реальное количество активных курсов (approved + pending)
        cur.execute(f"""
            SELECT 
                (SELECT COUNT(*) FROM {schema}.courses WHERE school_id = {school_id} AND status IN ('approved', 'pending')) +
                (SELECT COUNT(*) FROM {schema}.masterminds WHERE school_id = {school_id} AND status IN ('approved', 'pending')) +
                (SELECT COUNT(*) FROM {schema}.offline_training WHERE school_id = {school_id} AND status IN ('approved', 'pending'))
        """)
        courses_published_this_month = cur.fetchone()[0] or 0
        
        # Считаем реальные сообщения админу за сегодня (admin user_id = 2)
        cur.execute(f"""
            SELECT COUNT(*) 
            FROM {schema}.messages 
            WHERE sender_id = {user_id} 
              AND receiver_id = 2
              AND created_at >= CURRENT_DATE
        """)
        messages_sent_today = cur.fetchone()[0] or 0
        
        # Промо берём из таблицы schools (счётчик сбрасывается по расписанию)
        top_promotions_used_this_month = school_data[3] or 0
        
        # Получаем активную подписку
        cur.execute(f"""
            SELECT ss.id, ss.started_at, ss.expires_at, ss.is_active,
                   sp.id, sp.name, sp.price, sp.courses_limit, 
                   sp.messages_limit_per_day, sp.promo_requests_allowed, sp.description, sp.top_promotions_limit
            FROM {schema}.school_subscriptions ss
            JOIN {schema}.subscription_plans sp ON ss.plan_id = sp.id
            WHERE ss.school_id = {school_id} AND ss.is_active = true
            LIMIT 1
        """)
        
        sub_row = cur.fetchone()
        subscription = None
        
        if sub_row:
            subscription = {
                'id': sub_row[0],
                'started_at': sub_row[1].isoformat() if sub_row[1] else None,
                'expires_at': sub_row[2].isoformat() if sub_row[2] else None,
                'is_active': sub_row[3],
                'plan': {
                    'id': sub_row[4],
                    'name': sub_row[5],
                    'price': float(sub_row[6]),
                    'courses_limit': sub_row[7],
                    'messages_limit_per_day': sub_row[8],
                    'promo_requests_allowed': sub_row[9],
                    'description': sub_row[10],
                    'top_promotions_limit': sub_row[11]
                }
            }
        else:
            # Если нет активной подписки, создаём базовый тариф
            cur.execute(f"SELECT id FROM {schema}.subscription_plans WHERE price = 0 LIMIT 1")
            free_plan = cur.fetchone()
            if free_plan:
                cur.execute(f"""
                    INSERT INTO {schema}.school_subscriptions (school_id, plan_id, is_active)
                    VALUES ({school_id}, {free_plan[0]}, true)
                    RETURNING id, started_at, expires_at
                """)
                new_sub = cur.fetchone()
                
                # Загружаем данные бесплатного плана
                cur.execute(f"""
                    SELECT id, name, price, courses_limit, messages_limit_per_day, 
                           promo_requests_allowed, description, top_promotions_limit
                    FROM {schema}.subscription_plans WHERE id = {free_plan[0]}
                """)
                plan_data = cur.fetchone()
                
                subscription = {
                    'id': new_sub[0],
                    'started_at': new_sub[1].isoformat() if new_sub[1] else None,
                    'expires_at': new_sub[2].isoformat() if new_sub[2] else None,
                    'is_active': True,
                    'plan': {
                        'id': plan_data[0],
                        'name': plan_data[1],
                        'price': float(plan_data[2]),
                        'courses_limit': plan_data[3],
                        'messages_limit_per_day': plan_data[4],
                        'promo_requests_allowed': plan_data[5],
                        'description': plan_data[6],
                        'top_promotions_limit': plan_data[7]
                    }
                }
        
        # Добавляем valid_until в subscription
        if subscription and subscription.get('expires_at'):
            subscription['valid_until'] = subscription['expires_at']
        
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'subscription': subscription,
                'usage': {
                    'courses_published_this_month': courses_published_this_month,
                    'messages_sent_today': messages_sent_today,
                    'top_promotions_used_this_month': top_promotions_used_this_month
                }
            }),
            'isBase64Encoded': False
        }
    
    # POST /subscriptions?action=activate_subscription - Активировать тариф
    if method == 'POST' and action == 'activate_subscription':
        if not user_id:
            cur.close()
            conn.close()
            return {
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'User ID required'}),
                'isBase64Encoded': False
            }
        
        body = json.loads(event.get('body', '{}'))
        plan_id = body.get('plan_id')
        
        if not plan_id:
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'plan_id required'}),
                'isBase64Encoded': False
            }
        
        # Получаем school_id
        cur.execute(f"SELECT id FROM {schema}.schools WHERE user_id = {user_id}")
        school_data = cur.fetchone()
        
        if not school_data:
            cur.close()
            conn.close()
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'School not found'}),
                'isBase64Encoded': False
            }
        
        school_id = school_data[0]
        
        # Получаем баланс из school_balance
        cur.execute(f"SELECT COALESCE(balance, 0) FROM {schema}.school_balance WHERE school_id = {school_id}")
        balance_data = cur.fetchone()
        balance = float(balance_data[0]) if balance_data else 0
        
        # Получаем данные тарифа
        cur.execute(f"SELECT price, name FROM {schema}.subscription_plans WHERE id = {plan_id}")
        plan_data = cur.fetchone()
        
        if not plan_data:
            cur.close()
            conn.close()
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Plan not found'}),
                'isBase64Encoded': False
            }
        
        plan_price = float(plan_data[0])
        plan_name = plan_data[1]
        
        # Проверяем баланс (только для платных тарифов)
        if plan_price > 0 and balance < plan_price:
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'error': 'Insufficient balance',
                    'required': plan_price,
                    'available': balance
                }),
                'isBase64Encoded': False
            }
        
        # Деактивируем текущую подписку
        cur.execute(f"""
            UPDATE {schema}.school_subscriptions 
            SET is_active = false 
            WHERE school_id = {school_id} AND is_active = true
        """)
        
        # Создаём новую подписку с новым 30-дневным периодом
        started_at = datetime.now().isoformat()
        expires_at = None
        if plan_price > 0:
            expires_at = (datetime.now() + timedelta(days=30)).isoformat()
            # Списываем с баланса из таблицы school_balance
            cur.execute(f"""
                UPDATE {schema}.school_balance 
                SET balance = balance - {plan_price}
                WHERE school_id = {school_id}
            """)
            # Записываем транзакцию
            cur.execute(f"""
                INSERT INTO {schema}.balance_transactions 
                (school_id, masseur_id, amount, type, description, created_at)
                VALUES ({school_id}, NULL, {plan_price}, 'withdrawal', 'Оплата тарифа: {plan_name}', NOW())
            """)
        
        if expires_at:
            cur.execute(f"""
                INSERT INTO {schema}.school_subscriptions (school_id, plan_id, started_at, expires_at, is_active)
                VALUES ({school_id}, {plan_id}, '{started_at}', '{expires_at}', true)
                RETURNING id
            """)
        else:
            cur.execute(f"""
                INSERT INTO {schema}.school_subscriptions (school_id, plan_id, started_at, is_active)
                VALUES ({school_id}, {plan_id}, '{started_at}', true)
                RETURNING id
            """)
        
        new_sub_id = cur.fetchone()[0]
        
        # Сбрасываем счётчики при активации нового тарифа (начинается новый период)
        cur.execute(f"""
            UPDATE {schema}.schools 
            SET courses_published_this_month = 0, messages_sent_today = 0, top_promotions_used_this_month = 0
            WHERE id = {school_id}
        """)
        
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'subscription_id': new_sub_id, 'message': 'Subscription activated successfully'}),
            'isBase64Encoded': False
        }
    
    # GET /subscriptions?action=check_expired - Проверка истекших подписок (cron)
    if method == 'GET' and action == 'check_expired':
        # Находим все истекшие подписки
        cur.execute(f"""
            SELECT ss.id, ss.school_id, sp.name
            FROM {schema}.school_subscriptions ss
            JOIN {schema}.subscription_plans sp ON ss.plan_id = sp.id
            WHERE ss.is_active = true 
              AND ss.expires_at IS NOT NULL 
              AND ss.expires_at < NOW()
        """)
        
        expired_subs = cur.fetchall()
        expired_count = 0
        
        for sub_id, school_id, plan_name in expired_subs:
            # Деактивируем истекшую подписку
            cur.execute(f"""
                UPDATE {schema}.school_subscriptions 
                SET is_active = false 
                WHERE id = {sub_id}
            """)
            
            # Находим базовый тариф (price = 0)
            cur.execute(f"SELECT id FROM {schema}.subscription_plans WHERE price = 0 LIMIT 1")
            free_plan = cur.fetchone()
            
            if free_plan:
                # Создаём базовую подписку
                cur.execute(f"""
                    INSERT INTO {schema}.school_subscriptions (school_id, plan_id, is_active)
                    VALUES ({school_id}, {free_plan[0]}, true)
                """)
            
            # Снимаем все курсы этой школы с топа
            cur.execute(f"""
                UPDATE {schema}.courses 
                SET promoted_until = NULL, promotion_type = NULL
                WHERE school_id = {school_id} AND promoted_until IS NOT NULL
            """)
            
            cur.execute(f"""
                UPDATE {schema}.masterminds 
                SET promoted_until = NULL, promotion_type = NULL
                WHERE school_id = {school_id} AND promoted_until IS NOT NULL
            """)
            
            cur.execute(f"""
                UPDATE {schema}.offline_training 
                SET promoted_until = NULL, promotion_type = NULL
                WHERE school_id = {school_id} AND promoted_until IS NOT NULL
            """)
            
            expired_count += 1
        
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'expired_subscriptions': expired_count,
                'message': f'Processed {expired_count} expired subscriptions'
            }),
            'isBase64Encoded': False
        }
    
    cur.close()
    conn.close()
    return {
        'statusCode': 404,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Endpoint not found'}),
        'isBase64Encoded': False
    }