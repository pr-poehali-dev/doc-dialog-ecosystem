import json
import os
import psycopg2
import jwt
from datetime import datetime

# Прайс-лист действий в монетах
COIN_PRICES = {
    'publish_course': 500,
    'promote_masseur_1day': 200,
    'promote_masseur_3days': 500,
    'promote_masseur_7days': 800,
    'send_message_to_school': 10,
    'verify_profile': 1000,
}

def handler(event: dict, context) -> dict:
    """API для управления монетами: пополнение, списание, история транзакций"""
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Authorization'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    try:
        dsn = os.environ.get('DATABASE_URL')
        schema = 't_p46047379_doc_dialog_ecosystem'
        
        conn = psycopg2.connect(dsn)
        conn.autocommit = True
        cur = conn.cursor()
        
        query_params = event.get('queryStringParameters', {}) or {}
        action = query_params.get('action', '')
        
        # Прайс-лист доступен без авторизации
        if method == 'GET' and action == 'prices':
            return get_prices(cur, conn)
        
        # Авторизация для остальных действий
        headers = event.get('headers', {})
        token = headers.get('X-Authorization', headers.get('Authorization', '')).replace('Bearer ', '')
        
        if not token:
            cur.close()
            conn.close()
            return {
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Требуется авторизация'}),
                'isBase64Encoded': False
            }
        
        try:
            decoded = jwt.decode(token, options={"verify_signature": False})
            user_id = decoded.get('user_id')
        except jwt.InvalidTokenError:
            cur.close()
            conn.close()
            return {
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Неверный токен'}),
                'isBase64Encoded': False
            }
        
        # GET /coins - Получить баланс и историю
        if method == 'GET':
            if action == 'balance':
                return get_balance(user_id, cur, conn)
            elif action == 'transactions':
                return get_transactions(user_id, cur, conn)
            else:
                cur.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Неизвестное действие'}),
                    'isBase64Encoded': False
                }
        
        # POST /coins - Пополнить или списать монеты
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            
            if action == 'deposit':
                return deposit_coins(user_id, body, cur, conn)
            elif action == 'withdraw':
                return withdraw_coins(user_id, body, cur, conn)
            else:
                cur.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Неизвестное действие'}),
                    'isBase64Encoded': False
                }
        
        cur.close()
        conn.close()
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Метод не поддерживается'}),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        print(f"ERROR: {type(e).__name__}: {str(e)}")
        import traceback
        print(f"Traceback: {traceback.format_exc()}")
        
        if 'cur' in locals():
            cur.close()
        if 'conn' in locals():
            conn.close()
        
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Внутренняя ошибка сервера'}),
            'isBase64Encoded': False
        }


def get_balance(user_id: int, cur, conn) -> dict:
    """Получить текущий баланс монет пользователя"""
    schema = 't_p46047379_doc_dialog_ecosystem'
    
    cur.execute(f"SELECT coins FROM {schema}.users WHERE id = {user_id}")
    result = cur.fetchone()
    
    if not result:
        cur.close()
        conn.close()
        return {
            'statusCode': 404,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Пользователь не найден'}),
            'isBase64Encoded': False
        }
    
    coins = result[0] if result[0] is not None else 0
    
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({
            'user_id': user_id,
            'coins': coins,
            'rub_equivalent': coins
        }),
        'isBase64Encoded': False
    }


def get_transactions(user_id: int, cur, conn) -> dict:
    """Получить историю транзакций пользователя"""
    schema = 't_p46047379_doc_dialog_ecosystem'
    
    cur.execute(f"""
        SELECT id, amount, type, action, description, created_at
        FROM {schema}.coin_transactions
        WHERE user_id = {user_id}
        ORDER BY created_at DESC
        LIMIT 100
    """)
    
    transactions = cur.fetchall()
    
    result = [{
        'id': t[0],
        'amount': t[1],
        'type': t[2],
        'action': t[3],
        'description': t[4],
        'created_at': t[5].isoformat() if t[5] else None
    } for t in transactions]
    
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'transactions': result}),
        'isBase64Encoded': False
    }


def get_prices(cur, conn) -> dict:
    """Получить прайс-лист действий"""
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({
            'prices': COIN_PRICES,
            'rate': '100 монет = ₽100'
        }),
        'isBase64Encoded': False
    }


def deposit_coins(user_id: int, body: dict, cur, conn) -> dict:
    """Пополнить баланс монет (после оплаты)"""
    schema = 't_p46047379_doc_dialog_ecosystem'
    
    amount = body.get('amount')
    payment_id = body.get('payment_id', 'manual')
    description = body.get('description', 'Пополнение баланса')
    
    if not amount or amount <= 0:
        cur.close()
        conn.close()
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Некорректная сумма'}),
            'isBase64Encoded': False
        }
    
    # Обновляем баланс
    cur.execute(f"""
        UPDATE {schema}.users 
        SET coins = coins + {amount}
        WHERE id = {user_id}
        RETURNING coins
    """)
    
    new_balance = cur.fetchone()[0]
    
    # Записываем транзакцию
    description_escaped = description.replace("'", "''")
    cur.execute(f"""
        INSERT INTO {schema}.coin_transactions 
        (user_id, amount, type, action, description)
        VALUES ({user_id}, {amount}, 'deposit', 'top_up', '{description_escaped}')
    """)
    
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({
            'success': True,
            'new_balance': new_balance,
            'deposited': amount
        }),
        'isBase64Encoded': False
    }


def withdraw_coins(user_id: int, body: dict, cur, conn) -> dict:
    """Списать монеты за действие"""
    schema = 't_p46047379_doc_dialog_ecosystem'
    
    action_type = body.get('action_type')
    custom_amount = body.get('amount')
    description = body.get('description', '')
    
    # Определяем сумму списания
    if custom_amount:
        amount = custom_amount
    elif action_type in COIN_PRICES:
        amount = COIN_PRICES[action_type]
    else:
        cur.close()
        conn.close()
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Неизвестный тип действия'}),
            'isBase64Encoded': False
        }
    
    # Проверяем баланс
    cur.execute(f"SELECT coins FROM {schema}.users WHERE id = {user_id}")
    result = cur.fetchone()
    
    if not result:
        cur.close()
        conn.close()
        return {
            'statusCode': 404,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Пользователь не найден'}),
            'isBase64Encoded': False
        }
    
    current_balance = result[0] if result[0] is not None else 0
    
    if current_balance < amount:
        cur.close()
        conn.close()
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'error': 'Недостаточно монет',
                'required': amount,
                'available': current_balance
            }),
            'isBase64Encoded': False
        }
    
    # Списываем монеты
    cur.execute(f"""
        UPDATE {schema}.users 
        SET coins = coins - {amount}
        WHERE id = {user_id}
        RETURNING coins
    """)
    
    new_balance = cur.fetchone()[0]
    
    # Записываем транзакцию
    description_escaped = description.replace("'", "''") if description else action_type
    cur.execute(f"""
        INSERT INTO {schema}.coin_transactions 
        (user_id, amount, type, action, description)
        VALUES ({user_id}, {amount}, 'withdrawal', '{action_type}', '{description_escaped}')
    """)
    
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({
            'success': True,
            'new_balance': new_balance,
            'withdrawn': amount
        }),
        'isBase64Encoded': False
    }