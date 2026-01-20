import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context) -> dict:
    """Получение баланса пользователя и операции с балансом (v4 fixed)"""
    
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
    
    headers = event.get('headers', {})
    user_id = headers.get('X-User-Id', '') or headers.get('x-user-id', '')
    
    if not user_id:
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Требуется авторизация'}),
            'isBase64Encoded': False
        }
    
    try:
        dsn = os.environ.get('DATABASE_URL')
        schema = os.environ.get('MAIN_DB_SCHEMA', 't_p46047379_doc_dialog_ecosystem')
        
        conn = psycopg2.connect(dsn)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        if method == 'GET':
            # Получаем баланс пользователя
            cur.execute(f"""
                SELECT balance 
                FROM {schema}.users 
                WHERE id = '{user_id}'
            """)
            
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
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'balance': float(user['balance']) if user['balance'] else 0
                }),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            # Списание с баланса
            body = json.loads(event.get('body', '{}'))
            amount = body.get('amount')
            service_type = body.get('service_type')  # 'ai_dialog', 'ai_tool', 'template', etc.
            description = body.get('description', '')
            
            if not amount or amount <= 0:
                cur.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Укажите корректную сумму'}),
                    'isBase64Encoded': False
                }
            
            # Проверяем баланс
            cur.execute(f"""
                SELECT balance 
                FROM {schema}.users 
                WHERE id = '{user_id}'
            """)
            
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
            
            current_balance = float(user['balance']) if user['balance'] else 0
            
            if current_balance < amount:
                cur.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'error': 'Недостаточно средств на балансе',
                        'balance': current_balance,
                        'required': amount
                    }),
                    'isBase64Encoded': False
                }
            
            # Списываем с баланса
            cur.execute(f"""
                UPDATE {schema}.users
                SET balance = balance - {amount}
                WHERE id = '{user_id}'
                RETURNING balance
            """)
            
            updated_user = cur.fetchone()
            new_balance = float(updated_user['balance']) if updated_user['balance'] else 0
            
            # Логируем транзакцию
            negative_amount = -amount
            safe_service_type = (service_type or 'service').replace("'", "''")
            safe_description = description.replace("'", "''")
            cur.execute(f"""
                INSERT INTO {schema}.user_balance_transactions 
                (user_id, amount, type, description, created_at)
                VALUES ({user_id}, {negative_amount}, '{safe_service_type}', '{safe_description}', NOW())
            """)
            
            conn.commit()
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'balance': new_balance,
                    'charged': amount
                }),
                'isBase64Encoded': False
            }
        
        else:
            cur.close()
            conn.close()
            return {
                'statusCode': 405,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Метод не поддерживается'}),
                'isBase64Encoded': False
            }
        
    except Exception as e:
        import traceback
        print(f"Error: {str(e)}")
        print(f"Traceback: {traceback.format_exc()}")
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }