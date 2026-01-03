import json
import os
import psycopg2
from decimal import Decimal

def handler(event: dict, context) -> dict:
    '''API для управления балансом школы - получение баланса, история транзакций'''
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, Authorization'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    try:
        user_id = event.get('headers', {}).get('X-User-Id') or event.get('headers', {}).get('x-user-id')
        
        if not user_id:
            return {
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Требуется авторизация'}),
                'isBase64Encoded': False
            }
        
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor()
        
        # Получаем school_id пользователя
        cur.execute("SELECT id FROM schools WHERE user_id = %s LIMIT 1", (int(user_id),))
        school_row = cur.fetchone()
        
        if not school_row:
            cur.close()
            conn.close()
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Школа не найдена'}),
                'isBase64Encoded': False
            }
        
        school_id = school_row[0]
        
        if method == 'GET':
            action = event.get('queryStringParameters', {}).get('action', 'balance')
            
            if action == 'balance':
                # Получаем баланс (создаём если нет)
                cur.execute("""
                    INSERT INTO school_balance (school_id, balance) 
                    VALUES (%s, 0.00) 
                    ON CONFLICT (school_id) DO NOTHING
                """, (school_id,))
                conn.commit()
                
                cur.execute("""
                    SELECT balance, currency, updated_at 
                    FROM school_balance 
                    WHERE school_id = %s
                """, (school_id,))
                
                balance_row = cur.fetchone()
                result = {
                    'balance': float(balance_row[0]),
                    'currency': balance_row[1],
                    'updated_at': balance_row[2].isoformat() if balance_row[2] else None
                }
                
            elif action == 'transactions':
                # История транзакций
                limit = int(event.get('queryStringParameters', {}).get('limit', '50'))
                cur.execute("""
                    SELECT id, amount, type, description, related_entity_type, 
                           related_entity_id, created_at
                    FROM balance_transactions
                    WHERE school_id = %s
                    ORDER BY created_at DESC
                    LIMIT %s
                """, (school_id, limit))
                
                transactions = []
                for row in cur.fetchall():
                    transactions.append({
                        'id': row[0],
                        'amount': float(row[1]),
                        'type': row[2],
                        'description': row[3],
                        'related_entity_type': row[4],
                        'related_entity_id': row[5],
                        'created_at': row[6].isoformat() if row[6] else None
                    })
                
                result = {'transactions': transactions}
            
            else:
                result = {'error': 'Unknown action'}
        
        elif method == 'POST':
            # Добавление баланса (пополнение) - пока вручную, потом через платежи
            body = json.loads(event.get('body', '{}'))
            amount = Decimal(str(body.get('amount', 0)))
            description = body.get('description', 'Пополнение баланса')
            
            if amount <= 0:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Сумма должна быть больше 0'}),
                    'isBase64Encoded': False
                }
            
            # Создаём баланс если нет
            cur.execute("""
                INSERT INTO school_balance (school_id, balance) 
                VALUES (%s, 0.00) 
                ON CONFLICT (school_id) DO NOTHING
            """, (school_id,))
            
            # Добавляем к балансу
            cur.execute("""
                UPDATE school_balance 
                SET balance = balance + %s 
                WHERE school_id = %s
                RETURNING balance
            """, (amount, school_id))
            
            new_balance = cur.fetchone()[0]
            
            # Записываем транзакцию
            cur.execute("""
                INSERT INTO balance_transactions 
                (school_id, amount, type, description)
                VALUES (%s, %s, 'deposit', %s)
            """, (school_id, amount, description))
            
            conn.commit()
            
            result = {
                'success': True,
                'new_balance': float(new_balance),
                'amount_added': float(amount)
            }
        
        else:
            result = {'error': 'Method not allowed'}
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(result, ensure_ascii=False),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
