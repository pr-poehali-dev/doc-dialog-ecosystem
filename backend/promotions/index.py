import json
import os
import psycopg2
from datetime import datetime, timedelta
from decimal import Decimal

def get_promotion_prices(cur, entity_type='course', category=None):
    '''Получает цены на продвижение из базы данных'''
    
    # Получаем цены для своей категории
    if category:
        # Конвертируем читаемую категорию обратно в enum
        category_reverse_map = {
            'Массажные техники': 'technique',
            'Бизнес и маркетинг': 'business',
            'Общение и психология': 'soft_skills',
            'Здоровье и безопасность': 'health',
            'Цифровые навыки': 'digital'
        }
        cat_enum = category_reverse_map.get(category, 'technique')
        
        cur.execute("""
            SELECT promotion_type, duration_days, price_rub
            FROM promotion_pricing
            WHERE entity_type = %s AND category = %s AND is_active = TRUE
            ORDER BY duration_days
        """, (entity_type, cat_enum))
    else:
        cur.execute("""
            SELECT promotion_type, duration_days, price_rub
            FROM promotion_pricing
            WHERE entity_type = %s AND category IS NULL AND is_active = TRUE
            ORDER BY duration_days
        """, (entity_type,))
    
    prices = {'own_category': {}, 'all_categories': {}}
    
    for row in cur.fetchall():
        promo_type, days, price = row
        prices[promo_type][days] = Decimal(str(price))
    
    return prices

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
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor()
        
        if method == 'GET':
            action = event.get('queryStringParameters', {}).get('action', 'prices')
            
            # active_all не требует авторизации
            if action == 'active_all':
                cur.execute("""
                    SELECT id, item_id, promotion_type, category, promoted_until, created_at
                    FROM item_promotions
                    WHERE promoted_until > NOW()
                    ORDER BY promoted_until DESC
                """)
                
                promotions = []
                for row in cur.fetchall():
                    promotions.append({
                        'id': row[0],
                        'course_id': row[1],
                        'promotion_type': row[2],
                        'category': row[3],
                        'promoted_until': row[4].isoformat() if row[4] else None,
                        'created_at': row[5].isoformat() if row[5] else None
                    })
                
                result = {'promotions': promotions}
                
                cur.close()
                conn.close()
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps(result, ensure_ascii=False),
                    'isBase64Encoded': False
                }
        
        # Для остальных действий требуется авторизация
        user_id = event.get('headers', {}).get('X-User-Id') or event.get('headers', {}).get('x-user-id')
        
        if not user_id:
            cur.close()
            conn.close()
            return {
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Требуется авторизация'}),
                'isBase64Encoded': False
            }
        
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
                # Возвращаем прайс-лист из базы данных
                course_id = event.get('queryStringParameters', {}).get('course_id')
                
                if not course_id:
                    # Если курс не указан, возвращаем базовые цены
                    pricing = get_promotion_prices(cur, 'course')
                else:
                    # Определяем категорию курса
                    category = None
                    entity_type = 'course'
                    
                    cur.execute("SELECT category FROM courses WHERE id = %s", (course_id,))
                    row = cur.fetchone()
                    if row:
                        category = row[0]
                    else:
                        cur.execute("SELECT category FROM course_landings WHERE id = %s", (course_id,))
                        row = cur.fetchone()
                        if row:
                            category = row[0]
                            entity_type = 'course'
                        else:
                            cur.execute("SELECT category FROM masterminds WHERE id = %s", (course_id,))
                            row = cur.fetchone()
                            if row:
                                category_map = {
                                    'technique': 'Массажные техники',
                                    'business': 'Бизнес и маркетинг',
                                    'soft_skills': 'Общение и психология',
                                    'health': 'Здоровье и безопасность',
                                    'digital': 'Цифровые навыки'
                                }
                                category = category_map.get(row[0], 'Массажные техники')
                                entity_type = 'mastermind'
                            else:
                                cur.execute("SELECT category FROM offline_training WHERE id = %s", (course_id,))
                                row = cur.fetchone()
                                if row:
                                    category_map = {
                                        'technique': 'Массажные техники',
                                        'business': 'Бизнес и маркетинг',
                                        'soft_skills': 'Общение и психология',
                                        'health': 'Здоровье и безопасность',
                                        'digital': 'Цифровые навыки'
                                    }
                                    category = category_map.get(row[0], 'Массажные техники')
                                    entity_type = 'offline_training'
                    
                    pricing = get_promotion_prices(cur, entity_type, category)
                
                result = {
                    'prices': {
                        'own_category': {k: float(v) for k, v in pricing['own_category'].items()},
                        'all_categories': {k: float(v) for k, v in pricing['all_categories'].items()}
                    },
                    'currency': 'RUB'
                }
                
            elif action == 'active':
                # Получаем активные промо курсов школы
                cur.execute("""
                    SELECT id, item_id, item_type, promotion_type, 
                           category, price_paid, promoted_until, created_at
                    FROM item_promotions
                    WHERE school_id = %s AND promoted_until > NOW()
                    ORDER BY promoted_until DESC
                """, (school_id,))
                
                promotions = []
                for row in cur.fetchall():
                    promotions.append({
                        'id': row[0],
                        'course_id': row[1],
                        'item_type': row[2],
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
            

            
            # Проверяем что курс/мастермайнд/очное обучение принадлежит школе
            category = None
            item_type = None
            
            # Сначала ищем в courses (основная таблица)
            try:
                cur.execute("SELECT category FROM courses WHERE id = %s AND school_id = %s", (course_id, school_id))
                course_row = cur.fetchone()
                if course_row:
                    category = course_row[0]
                    item_type = 'course'
            except:
                pass
            
            # Если не найден, ищем в course_landings
            if not category:
                try:
                    cur.execute("SELECT category FROM course_landings WHERE id = %s AND school_id = %s", (course_id, school_id))
                    course_row = cur.fetchone()
                    if course_row:
                        category = course_row[0]
                        item_type = 'course_landing'
                except:
                    pass
            
            # Если не найден, ищем в masterminds
            if not category:
                try:
                    cur.execute("SELECT category FROM masterminds WHERE id = %s AND school_id = %s", (course_id, school_id))
                    mastermind_row = cur.fetchone()
                    if mastermind_row:
                        # Преобразуем enum категории в читаемый формат
                        cat_enum = mastermind_row[0]
                        category_map = {
                            'technique': 'Массажные техники',
                            'business': 'Бизнес и маркетинг',
                            'soft_skills': 'Общение и психология',
                            'health': 'Здоровье и безопасность',
                            'digital': 'Цифровые навыки'
                        }
                        category = category_map.get(cat_enum, 'Офлайн мероприятия')
                        item_type = 'mastermind'
                except:
                    pass
            
            # Если не найден, ищем в offline_training
            if not category:
                try:
                    cur.execute("SELECT category FROM offline_training WHERE id = %s AND school_id = %s", (course_id, school_id))
                    training_row = cur.fetchone()
                    if training_row:
                        # Преобразуем enum категории в читаемый формат
                        cat_enum = training_row[0]
                        category_map = {
                            'technique': 'Массажные техники',
                            'business': 'Бизнес и маркетинг',
                            'soft_skills': 'Общение и психология',
                            'health': 'Здоровье и безопасность',
                            'digital': 'Цифровые навыки'
                        }
                        category = category_map.get(cat_enum, 'Офлайн мероприятия')
                        item_type = 'offline_training'
                except:
                    pass
            
            # Если ничего не найдено
            if not category:
                cur.close()
                conn.close()
                return {
                    'statusCode': 403,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Курс не найден или не принадлежит школе'}),
                    'isBase64Encoded': False
                }
            
            # Получаем цену из базы данных
            pricing = get_promotion_prices(cur, item_type, category)
            
            if promotion_type not in pricing or days not in pricing[promotion_type]:
                cur.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Неверный тип промо или срок'}),
                    'isBase64Encoded': False
                }
            
            price = pricing[promotion_type][days]
            
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
                INSERT INTO item_promotions 
                (item_id, item_type, school_id, promotion_type, category, price_paid, promoted_until)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                RETURNING id
            """, (course_id, item_type, school_id, promotion_type, category, price, promoted_until))
            
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
        import traceback
        error_details = traceback.format_exc()
        print(f"ERROR: {error_details}")
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e), 'details': error_details}),
            'isBase64Encoded': False
        }