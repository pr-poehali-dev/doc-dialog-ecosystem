import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context) -> dict:
    """Webhook для обработки уведомлений от ЮКассы о статусе платежей"""
    
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Метод не поддерживается'}),
            'isBase64Encoded': False
        }
    
    try:
        body = json.loads(event.get('body', '{}'))
        
        # Структура webhook от ЮКассы
        event_type = body.get('event')
        payment_object = body.get('object', {})
        
        if not event_type or not payment_object:
            print(f"Invalid webhook data: {body}")
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Некорректные данные webhook'}),
                'isBase64Encoded': False
            }
        
        payment_id = payment_object.get('id')
        status = payment_object.get('status')
        metadata = payment_object.get('metadata', {})
        
        print(f"Webhook received: event={event_type}, payment_id={payment_id}, status={status}, metadata={metadata}")
        
        # Обрабатываем успешные платежи и возвраты
        if event_type == 'payment.succeeded' and status == 'succeeded':
            dsn = os.environ.get('DATABASE_URL')
            schema = os.environ.get('MAIN_DB_SCHEMA', 't_p46047379_doc_dialog_ecosystem')
            
            conn = psycopg2.connect(dsn)
            cur = conn.cursor(cursor_factory=RealDictCursor)
            
            try:
                # Проверяем, не обработан ли уже этот платёж
                cur.execute(f"""
                    SELECT * FROM {schema}.payment_logs
                    WHERE payment_id = %s
                """, (payment_id,))
                
                payment_log = cur.fetchone()
                
                if not payment_log:
                    print(f"Payment {payment_id} not found in logs")
                    cur.close()
                    conn.close()
                    return {
                        'statusCode': 404,
                        'headers': {'Content-Type': 'application/json'},
                        'body': json.dumps({'error': 'Платёж не найден'}),
                        'isBase64Encoded': False
                    }
                
                if payment_log['status'] == 'succeeded':
                    print(f"Payment {payment_id} already processed")
                    cur.close()
                    conn.close()
                    return {
                        'statusCode': 200,
                        'headers': {'Content-Type': 'application/json'},
                        'body': json.dumps({'status': 'already_processed'}),
                        'isBase64Encoded': False
                    }
                
                user_id = payment_log['user_id']
                payment_type = payment_log['type']
                # metadata уже dict, не нужно парсить
                log_metadata = payment_log['metadata'] if payment_log['metadata'] else {}
                
                print(f"Processing payment: user_id={user_id}, type={payment_type}, metadata={log_metadata}")
                
                # Обрабатываем в зависимости от типа платежа
                if payment_type == 'extra_requests':
                    # Покупка дополнительных AI-запросов
                    count = int(log_metadata.get('count', metadata.get('count', 0)))
                    first_purchase_bonus = log_metadata.get('first_purchase_bonus') == 'True'
                    
                    cur.execute(f"""
                        UPDATE {schema}.users
                        SET extra_requests = COALESCE(extra_requests, 0) + %s
                        WHERE id = %s
                    """, (count, user_id))
                    
                    # Отмечаем использование бонуса первой покупки
                    if first_purchase_bonus:
                        cur.execute(f"""
                            UPDATE {schema}.users
                            SET first_purchase_bonus_used = TRUE
                            WHERE id = %s
                        """, (user_id,))
                    
                    print(f"Added {count} extra requests to user {user_id}")
                
                elif payment_type == 'ai_subscription':
                    # Подписка на AI-тариф
                    plan = metadata.get('plan', log_metadata.get('plan'))
                    operations = int(metadata.get('operations', log_metadata.get('operations', 0)))
                    
                    # Обновляем лимит AI-диалогов
                    cur.execute(f"""
                        UPDATE {schema}.users
                        SET ai_dialogs_limit = %s,
                            subscription_tier = %s,
                            subscription_expires = NOW() + INTERVAL '30 days'
                        WHERE id = %s
                    """, (operations, plan, user_id))
                    
                    print(f"Activated {plan} subscription for user {user_id}")
                
                elif payment_type == 'balance_topup':
                    # Пополнение баланса массажиста/школы
                    amount = int(log_metadata.get('amount', 0))
                    bonus = int(log_metadata.get('bonus', 0))
                    total = amount + bonus
                    
                    cur.execute(f"""
                        UPDATE {schema}.users
                        SET balance = COALESCE(balance, 0) + %s
                        WHERE id = %s
                    """, (total, user_id))
                    
                    print(f"Added {total} RUB to user {user_id} balance (amount: {amount}, bonus: {bonus})")
                
                # Обновляем статус платежа
                cur.execute(f"""
                    UPDATE {schema}.payment_logs
                    SET status = 'succeeded', updated_at = NOW()
                    WHERE payment_id = %s
                """, (payment_id,))
                
                conn.commit()
                
                cur.close()
                conn.close()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json'},
                    'body': json.dumps({'status': 'processed', 'payment_type': payment_type}),
                    'isBase64Encoded': False
                }
                
            except Exception as e:
                conn.rollback()
                cur.close()
                conn.close()
                print(f"Error processing payment: {str(e)}")
                raise
        
        # Обработка возвратов платежей
        elif event_type == 'refund.succeeded':
            refund_object = body.get('object', {})
            payment_id = refund_object.get('payment_id')
            refund_amount = float(refund_object.get('amount', {}).get('value', 0))
            
            print(f"Refund received for payment {payment_id}, amount: {refund_amount}")
            
            dsn = os.environ.get('DATABASE_URL')
            schema = os.environ.get('MAIN_DB_SCHEMA', 't_p46047379_doc_dialog_ecosystem')
            
            conn = psycopg2.connect(dsn)
            cur = conn.cursor(cursor_factory=RealDictCursor)
            
            try:
                # Находим платёж
                cur.execute(f"""
                    SELECT * FROM {schema}.payment_logs
                    WHERE payment_id = %s AND status = 'succeeded'
                """, (payment_id,))
                
                payment_log = cur.fetchone()
                
                if not payment_log:
                    print(f"Payment {payment_id} not found or not succeeded")
                    cur.close()
                    conn.close()
                    return {
                        'statusCode': 404,
                        'headers': {'Content-Type': 'application/json'},
                        'body': json.dumps({'error': 'Платёж не найден'}),
                        'isBase64Encoded': False
                    }
                
                user_id = payment_log['user_id']
                payment_type = payment_log['type']
                log_metadata = payment_log['metadata'] if payment_log['metadata'] else {}
                
                print(f"Processing refund: user_id={user_id}, type={payment_type}")
                
                # Откатываем услуги в зависимости от типа платежа
                if payment_type == 'extra_requests':
                    # Списываем AI-запросы (если они ещё не потрачены)
                    count = int(log_metadata.get('count', 0))
                    
                    cur.execute(f"""
                        UPDATE {schema}.users
                        SET extra_requests = GREATEST(0, COALESCE(extra_requests, 0) - %s)
                        WHERE id = %s
                    """, (count, user_id))
                    
                    print(f"Removed {count} extra requests from user {user_id}")
                
                elif payment_type == 'balance_topup':
                    # Списываем баланс (если он ещё не потрачен)
                    amount = int(log_metadata.get('amount', 0))
                    bonus = int(log_metadata.get('bonus', 0))
                    total = amount + bonus
                    
                    cur.execute(f"""
                        UPDATE {schema}.users
                        SET balance = GREATEST(0, COALESCE(balance, 0) - %s)
                        WHERE id = %s
                    """, (total, user_id))
                    
                    print(f"Removed {total} RUB from user {user_id} balance")
                
                elif payment_type == 'ai_subscription':
                    # Отключаем подписку
                    cur.execute(f"""
                        UPDATE {schema}.users
                        SET ai_dialogs_limit = 10,
                            subscription_tier = 'free',
                            subscription_expires = NULL
                        WHERE id = %s
                    """, (user_id,))
                    
                    print(f"Cancelled subscription for user {user_id}")
                
                # Обновляем статус платежа на 'refunded'
                cur.execute(f"""
                    UPDATE {schema}.payment_logs
                    SET status = 'refunded', updated_at = NOW()
                    WHERE payment_id = %s
                """, (payment_id,))
                
                conn.commit()
                cur.close()
                conn.close()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json'},
                    'body': json.dumps({'status': 'refund_processed', 'payment_type': payment_type}),
                    'isBase64Encoded': False
                }
                
            except Exception as e:
                conn.rollback()
                cur.close()
                conn.close()
                print(f"Error processing refund: {str(e)}")
                raise
        
        # Для других событий просто возвращаем 200
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'status': 'received'}),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        print(f"Webhook error: {str(e)}")
        import traceback
        traceback.print_exc()
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }