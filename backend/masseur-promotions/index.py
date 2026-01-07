import json
import os
import psycopg2
import jwt
from datetime import datetime, timedelta, timezone
from decimal import Decimal

# Цены на продвижение массажистов (только в своем городе)
PROMOTION_PRICES = {
    1: 150,
    3: 400,
    7: 800
}

def handler(event: dict, context) -> dict:
    """API для продвижения массажистов в каталоге: покупка топ-позиции с списанием баланса"""
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Authorization'
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
        
        # Авторизация
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
            user_role = decoded.get('role')
            
            if user_role != 'masseur':
                cur.close()
                conn.close()
                return {
                    'statusCode': 403,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Доступ только для массажистов'}),
                    'isBase64Encoded': False
                }
        except jwt.InvalidTokenError:
            cur.close()
            conn.close()
            return {
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Неверный токен'}),
                'isBase64Encoded': False
            }
        
        # Получаем профиль массажиста
        cur.execute(f"SELECT id, balance, city FROM {schema}.masseur_profiles WHERE user_id = {user_id}")
        masseur = cur.fetchone()
        
        if not masseur:
            cur.close()
            conn.close()
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Профиль массажиста не найден'}),
                'isBase64Encoded': False
            }
        
        masseur_id = masseur[0]
        current_balance = float(masseur[1]) if masseur[1] else 0
        city = masseur[2]
        
        if method == 'GET':
            # Получение информации о текущем продвижении
            cur.execute(f"""
                SELECT promoted_until
                FROM {schema}.masseur_profiles
                WHERE id = {masseur_id} AND promoted_until > NOW()
            """)
            
            promotion = cur.fetchone()
            
            result = {
                'prices': PROMOTION_PRICES,
                'currency': 'RUB',
                'has_active_promotion': bool(promotion),
                'promoted_until': promotion[0].isoformat() if promotion else None,
                'current_balance': current_balance,
                'city': city
            }
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(result, ensure_ascii=False),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            # Покупка продвижения
            body = json.loads(event.get('body', '{}'))
            days = body.get('days')
            
            if days not in PROMOTION_PRICES:
                cur.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Неверный срок продвижения. Доступны: 1, 3, 7 дней'}),
                    'isBase64Encoded': False
                }
            
            price = PROMOTION_PRICES[days]
            
            # Проверяем баланс
            if current_balance < price:
                cur.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'error': 'Недостаточно средств',
                        'required': price,
                        'available': current_balance
                    }),
                    'isBase64Encoded': False
                }
            
            # Вычисляем дату окончания продвижения
            cur.execute(f"""
                SELECT COALESCE(promoted_until, NOW())
                FROM {schema}.masseur_profiles
                WHERE id = {masseur_id}
            """)
            current_promotion = cur.fetchone()
            now_utc = datetime.now(timezone.utc)
            start_date = max(now_utc, current_promotion[0] if current_promotion[0] > now_utc else now_utc)
            promoted_until = start_date + timedelta(days=days)
            
            # Списываем средства
            cur.execute(f"""
                UPDATE {schema}.masseur_profiles
                SET balance = balance - {price},
                    promoted_until = '{promoted_until.isoformat()}'::timestamp,
                    is_premium = true,
                    premium_until = '{promoted_until.isoformat()}'::timestamp
                WHERE id = {masseur_id}
            """)
            
            # Записываем транзакцию
            description = f"Продвижение в каталоге на {days} {'день' if days == 1 else 'дня' if days <= 4 else 'дней'} в городе {city}"
            description_escaped = description.replace("'", "''")
            
            cur.execute(f"""
                INSERT INTO {schema}.balance_transactions 
                (masseur_id, amount, type, description, related_entity_type, related_entity_id, created_at)
                VALUES ({masseur_id}, {price}, 'withdrawal', '{description_escaped}', 'promotion', {masseur_id}, NOW())
            """)
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'message': f'Профиль продвигается до {promoted_until.strftime("%d.%m.%Y %H:%M")}',
                    'promoted_until': promoted_until.isoformat(),
                    'price_paid': price,
                    'new_balance': current_balance - price
                }, ensure_ascii=False),
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
        print(f"ERROR: Traceback: {traceback.format_exc()}")
        
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