import json
import os
import psycopg2
from datetime import datetime, timedelta
from decimal import Decimal

# Прайс-лист промо-позиций
PROMOTION_PRICES = {
    'own_category': {
        1: Decimal('500.00'),    # 1 день
        3: Decimal('1200.00'),   # 3 дня
        7: Decimal('2500.00')    # 7 дней
    },
    'all_categories': {
        1: Decimal('1500.00'),   # 1 день
        3: Decimal('3600.00'),   # 3 дня
        7: Decimal('7500.00')    # 7 дней
    }
}

def handler(event: dict, context) -> dict:
    '''API для управления промо-позициями курсов - покупка подъёма, проверка активных промо'''
    
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
            action = event.get('queryStringParameters', {}).get('action', 'prices')
            
            if action == 'prices':
                # Возвращаем прайс-лист
                result = {
                    'prices': {
                        'own_category': {k: float(v) for k, v in PROMOTION_PRICES['own_category'].items()},
                        'all_categories': {k: float(v) for k, v in PROMOTION_PRICES['all_categories'].items()}
                    },
                    'currency': 'RUB'
                }
                
            elif action == 'active':
                # Получаем активные промо курсов школы
                cur.execute("""
                    SELECT cp.id, cp.course_id, c.title, cp.promotion_type, 
                           cp.category, cp.price_paid, cp.promoted_until, cp.created_at
                    FROM course_promotions cp
                    JOIN courses c ON cp.course_id = c.id
                    WHERE cp.school_id = %s AND cp.promoted_until > NOW()
                    ORDER BY cp.promoted_until DESC
                """, (school_id,))
                
                promotions = []
                for row in cur.fetchall():
                    promotions.append({
                        'id': row[0],
                        'course_id': row[1],
                        'course_title': row[2],
                        'promotion_type': row[3],
                        'category': row[4],
                        'price_paid': float(row[5]),
                        'promoted_until': row[6].isoformat() if row[6] else None,
                        'created_at': row[7].isoformat() if row[7] else None
                    })
                
                result = {'promotions': promotions}
            
            else:
                result = {'error': 'Unknown action'}
        
        elif method == 'POST':
            # Покупка промо-позиции
            body = json.loads(event.get('body', '{}'))
            course_id = body.get('course_id')
            promotion_type = body.get('promotion_type')  # own_category или all_categories
            days = body.get('days')  # 1, 3 или 7
            
            if not all([course_id, promotion_type, days]):
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Не указаны обязательные параметры'}),
                    'isBase64Encoded': False
                }
            
            if promotion_type not in PROMOTION_PRICES or days not in PROMOTION_PRICES[promotion_type]:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Неверный тип промо или срок'}),
                    'isBase64Encoded': False
                }
            
            # Проверяем что курс/мастермайнд/очное обучение принадлежит школе
            # Сначала ищем в courses
            cur.execute("SELECT category FROM courses WHERE id = %s AND school_id = %s", (course_id, school_id))
            course_row = cur.fetchone()
            
            if course_row:
                category = course_row[0]
            else:
                # Ищем в masterminds
                cur.execute("SELECT 'Офлайн мероприятия' FROM masterminds WHERE id = %s AND school_id = %s", (course_id, school_id))
                mastermind_row = cur.fetchone()
                
                if mastermind_row:
                    category = 'Офлайн мероприятия'
                else:
                    # Ищем в offline_training
                    cur.execute("SELECT 'Офлайн мероприятия' FROM offline_training WHERE id = %s AND school_id = %s", (course_id, school_id))
                    training_row = cur.fetchone()
                    
                    if training_row:
                        category = 'Офлайн мероприятия'
                    else:
                        cur.close()
                        conn.close()
                        return {
                            'statusCode': 403,
                            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                            'body': json.dumps({'error': 'Курс не найден или не принадлежит школе'}),
                            'isBase64Encoded': False
                        }
            price = PROMOTION_PRICES[promotion_type][days]
            
            # Проверяем баланс
            cur.execute("SELECT balance FROM school_balance WHERE school_id = %s", (school_id,))
            balance_row = cur.fetchone()
            
            if not balance_row or balance_row[0] < price:
                cur.close()
                conn.close()
                return {
                    'statusCode': 402,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Недостаточно средств на балансе', 'required': float(price)}),
                    'isBase64Encoded': False
                }
            
            # Списываем с баланса
            cur.execute("""
                UPDATE school_balance 
                SET balance = balance - %s 
                WHERE school_id = %s
                RETURNING balance
            """, (price, school_id))
            
            new_balance = cur.fetchone()[0]
            
            # Создаём промо-позицию
            promoted_until = datetime.now() + timedelta(days=days)
            
            cur.execute("""
                INSERT INTO course_promotions 
                (course_id, school_id, promotion_type, category, price_paid, promoted_until)
                VALUES (%s, %s, %s, %s, %s, %s)
                RETURNING id
            """, (course_id, school_id, promotion_type, category, price, promoted_until))
            
            promotion_id = cur.fetchone()[0]
            
            # Записываем транзакцию
            cur.execute("""
                INSERT INTO balance_transactions 
                (school_id, amount, type, description, related_entity_type, related_entity_id)
                VALUES (%s, %s, 'withdrawal', %s, 'promotion', %s)
            """, (school_id, -price, f'Подъём курса на {days} дн.', promotion_id))
            
            conn.commit()
            
            result = {
                'success': True,
                'promotion_id': promotion_id,
                'new_balance': float(new_balance),
                'price_paid': float(price),
                'promoted_until': promoted_until.isoformat()
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