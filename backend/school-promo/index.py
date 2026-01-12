import json
import os
import psycopg2
from datetime import datetime

def handler(event: dict, context) -> dict:
    """API для управления промо-запросами школ массажистам"""
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id'
            },
            'body': ''
        }
    
    user_id = event.get('headers', {}).get('X-User-Id')
    if not user_id:
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Требуется авторизация'})
        }
    
    action = event.get('queryStringParameters', {}).get('action', '')
    
    try:
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor()
        
        if action == 'masseur_promo_offers':
            # Промо-предложения для массажиста
            cur.execute(
                "SELECT id FROM t_p46047379_doc_dialog_ecosystem.masseur_profiles WHERE user_id = %s",
                (int(user_id),)
            )
            masseur = cur.fetchone()
            
            if not masseur:
                cur.close()
                conn.close()
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Массажист не найден'})
                }
            
            masseur_id = masseur[0]
            
            cur.execute("""
                SELECT 
                    pr.id,
                    s.name as school_name,
                    pr.course_title,
                    pr.discount_percentage,
                    pr.created_at,
                    pr.status
                FROM t_p46047379_doc_dialog_ecosystem.promo_requests pr
                JOIN t_p46047379_doc_dialog_ecosystem.schools s ON pr.school_id = s.id
                WHERE pr.masseur_id = %s
                ORDER BY pr.created_at DESC
                LIMIT 50
            """, (masseur_id,))
            
            offers = []
            for row in cur.fetchall():
                offers.append({
                    'id': row[0],
                    'school_name': row[1],
                    'course_title': row[2],
                    'discount_percentage': row[3],
                    'created_at': row[4].isoformat() if row[4] else None,
                    'status': row[5]
                })
            
            cur.close()
            conn.close()
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'offers': offers})
            }
        
        elif action == 'my_promo_requests':
            # Получить школу
            cur.execute(
                "SELECT id, name FROM t_p46047379_doc_dialog_ecosystem.schools WHERE user_id = %s",
                (int(user_id),)
            )
            school = cur.fetchone()
            if not school:
                cur.close()
                conn.close()
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Школа не найдена'})
                }
            school_id = school[0]
            
            # История промо-запросов школы
            cur.execute("""
                SELECT 
                    pr.id,
                    pr.course_title,
                    pr.discount_percentage,
                    pr.created_at,
                    pr.status,
                    COUNT(pr.id) OVER (PARTITION BY pr.school_id, pr.course_title, DATE(pr.created_at)) as sent_count
                FROM t_p46047379_doc_dialog_ecosystem.promo_requests pr
                WHERE pr.school_id = %s
                ORDER BY pr.created_at DESC
                LIMIT 50
            """, (school_id,))
            
            requests_raw = cur.fetchall()
            seen = set()
            requests = []
            
            for row in requests_raw:
                key = (row[1], str(row[3].date()) if row[3] else '')
                if key not in seen:
                    seen.add(key)
                    requests.append({
                        'id': row[0],
                        'course_title': row[1],
                        'discount_percent': row[2],
                        'created_at': row[3].isoformat() if row[3] else None,
                        'status': row[4],
                        'sent_count': row[5],
                        'promo_text': f'Специальное предложение со скидкой {row[2]}%'
                    })
            
            cur.close()
            conn.close()
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'requests': requests})
            }
        
        elif action == 'send_promo_request' and method == 'POST':
            # Получить школу
            cur.execute(
                "SELECT id, name FROM t_p46047379_doc_dialog_ecosystem.schools WHERE user_id = %s",
                (int(user_id),)
            )
            school = cur.fetchone()
            if not school:
                cur.close()
                conn.close()
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Школа не найдена'})
                }
            school_id = school[0]
            
            # Проверка подписки
            cur.execute("""
                SELECT sp.promo_requests_allowed
                FROM t_p46047379_doc_dialog_ecosystem.school_subscriptions ss
                JOIN t_p46047379_doc_dialog_ecosystem.subscription_plans sp ON ss.plan_id = sp.id
                WHERE ss.school_id = %s AND ss.is_active = true
                ORDER BY ss.created_at DESC
                LIMIT 1
            """, (school_id,))
            
            sub = cur.fetchone()
            if not sub or not sub[0]:
                cur.close()
                conn.close()
                return {
                    'statusCode': 403,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Промо-запросы недоступны на вашем тарифе'})
                }
            
            body = json.loads(event.get('body', '{}'))
            course_title = body.get('course_title', '').strip()
            promo_text = body.get('promo_text', '').strip()
            discount_percent = body.get('discount_percent', 0)
            
            if not course_title or not promo_text:
                cur.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Заполните все поля'})
                }
            
            # Получить всех массажистов
            cur.execute("""
                SELECT mp.id, mp.full_name
                FROM t_p46047379_doc_dialog_ecosystem.masseur_profiles mp
                WHERE mp.full_name IS NOT NULL
            """)
            
            masseurs = cur.fetchall()
            
            if not masseurs:
                cur.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Нет массажистов для отправки'})
                }
            
            # Email школы - используем email из школы или дефолтный
            school_email = 'school@massageplatform.ru'
            
            # Создать промо-запросы для каждого массажиста
            sent_count = 0
            for masseur in masseurs:
                masseur_id, masseur_name = masseur
                
                cur.execute("""
                    INSERT INTO t_p46047379_doc_dialog_ecosystem.promo_requests 
                    (masseur_id, masseur_email, masseur_name, school_id, school_email, 
                     course_id, course_title, entity_type, status, discount_percentage, 
                     promo_code, purchase_url, promo_text, created_at)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NOW())
                """, (
                    masseur_id,
                    'masseur@example.com',
                    masseur_name or 'Массажист',
                    school_id,
                    school_email,
                    1,
                    course_title,
                    'course',
                    'sent',
                    discount_percent if discount_percent > 0 else 10,
                    'PROMO' + str(school_id),
                    'https://example.com',
                    promo_text
                ))
                sent_count += 1
            
            conn.commit()
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'sent_count': sent_count,
                    'message': f'Промо-запрос отправлен {sent_count} массажистам'
                })
            }
        
        else:
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Неизвестное действие'})
            }
    
    except Exception as e:
        import traceback
        error_details = traceback.format_exc()
        print(f"ERROR: {error_details}")
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e), 'details': error_details})
        }