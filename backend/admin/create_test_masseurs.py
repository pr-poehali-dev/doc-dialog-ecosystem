import json
import os
import psycopg2
import bcrypt

def handler(event: dict, context) -> dict:
    """Создание 10 тестовых карточек массажистов для модерации"""
    
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Authorization'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    # Check admin authorization
    auth_header = event.get('headers', {}).get('X-Authorization', '')
    if not auth_header.startswith('Bearer '):
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Unauthorized'}),
            'isBase64Encoded': False
        }
    
    # Connect to database
    dsn = os.environ.get('DATABASE_URL')
    schema = 't_p46047379_doc_dialog_ecosystem'
    
    conn = psycopg2.connect(dsn)
    conn.autocommit = True
    cur = conn.cursor()
    
    # Test masseurs data
    masseurs_data = [
        {
            'gender': 'female',
            'full_name': 'Анна Соколова',
            'email': 'anna.sokolova@test.ru',
            'city': 'Москва',
            'address': 'ул. Арбат, д. 15',
            'experience_years': 5,
            'about': 'Профессиональный массажист с 5-летним опытом работы. Специализируюсь на расслабляющих и лечебных техниках. Помогу снять напряжение и улучшить самочувствие.',
            'education': 'Московский медицинский колледж, специальность "Медицинский массаж"',
            'languages': ['Русский', 'Английский'],
            'specializations': ['Классический массаж', 'Расслабляющий массаж', 'Спортивный массаж', 'Антицеллюлитный массаж'],
            'certificates': ['Сертификат классического массажа', 'Диплом медицинского колледжа'],
            'avatar_url': 'https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/336eaf83-7bc9-4953-bff4-5371f91b4f32.jpg'
        },
        {
            'gender': 'male',
            'full_name': 'Дмитрий Волков',
            'email': 'dmitry.volkov@test.ru',
            'city': 'Санкт-Петербург',
            'address': 'Невский проспект, д. 28',
            'experience_years': 8,
            'about': 'Опытный массажист-реабилитолог. Работаю с профессиональными спортсменами и людьми, восстанавливающимися после травм.',
            'education': 'СПбГУ, факультет физической культуры и спорта',
            'languages': ['Русский'],
            'specializations': ['Спортивный массаж', 'Реабилитационный массаж', 'Лечебный массаж', 'Глубокий массаж'],
            'certificates': ['Сертификат спортивного массажа', 'Диплом специалиста по реабилитации'],
            'avatar_url': 'https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/5c8c1276-c08c-4e5d-ae56-61e97879991c.jpg'
        },
        {
            'gender': 'female',
            'full_name': 'Екатерина Иванова',
            'email': 'ekaterina.ivanova@test.ru',
            'city': 'Казань',
            'address': 'ул. Баумана, д. 42',
            'experience_years': 3,
            'about': 'Специализируюсь на восточных техниках массажа. Создаю атмосферу полного расслабления и гармонии.',
            'education': 'Курсы тайского и балийского массажа',
            'languages': ['Русский', 'Татарский'],
            'specializations': ['Тайский массаж', 'Балийский массаж', 'Расслабляющий массаж', 'Ароматерапия'],
            'certificates': ['Сертификат тайского массажа', 'Сертификат балийского массажа'],
            'avatar_url': 'https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/6e977ab4-01cc-49e7-beb3-5973619081cb.jpg'
        },
        {
            'gender': 'male',
            'full_name': 'Александр Петров',
            'email': 'alexander.petrov@test.ru',
            'city': 'Екатеринбург',
            'address': 'ул. Ленина, д. 50',
            'experience_years': 10,
            'about': 'Мастер классического и лечебного массажа. За 10 лет помог сотням клиентов избавиться от болей в спине и улучшить осанку.',
            'education': 'Уральский медицинский университет, специальность "Лечебный массаж"',
            'languages': ['Русский', 'Немецкий'],
            'specializations': ['Классический массаж', 'Лечебный массаж', 'Массаж спины', 'Коррекция осанки'],
            'certificates': ['Диплом медицинского университета', 'Сертификат мануальной терапии'],
            'avatar_url': 'https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/bbae5df1-832e-4b14-90f3-f0302bb2d335.jpg'
        },
        {
            'gender': 'female',
            'full_name': 'Мария Новикова',
            'email': 'maria.novikova@test.ru',
            'city': 'Новосибирск',
            'address': 'пр. Красный, д. 35',
            'experience_years': 6,
            'about': 'Специалист по антицеллюлитному и лимфодренажному массажу. Помогу вернуть телу тонус и красоту.',
            'education': 'Новосибирский медицинский колледж',
            'languages': ['Русский'],
            'specializations': ['Антицеллюлитный массаж', 'Лимфодренажный массаж', 'Вакуумный массаж', 'Массаж лица'],
            'certificates': ['Сертификат антицеллюлитного массажа', 'Сертификат косметического массажа'],
            'avatar_url': 'https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/4c7a5026-5353-42cc-9cf0-9603efe2bff2.jpg'
        },
        {
            'gender': 'male',
            'full_name': 'Сергей Кузнецов',
            'email': 'sergey.kuznetsov@test.ru',
            'city': 'Нижний Новгород',
            'address': 'ул. Большая Покровская, д. 12',
            'experience_years': 7,
            'about': 'Практикую точечный и сегментарный массаж. Работаю с триггерными точками для снятия хронических болей.',
            'education': 'Нижегородская медицинская академия',
            'languages': ['Русский', 'Английский'],
            'specializations': ['Точечный массаж', 'Сегментарный массаж', 'Триггерная терапия', 'Массаж шеи'],
            'certificates': ['Диплом медицинской академии', 'Сертификат триггерной терапии'],
            'avatar_url': 'https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/43e1aa8f-bff5-4b7f-abec-ea08ab13a364.jpg'
        },
        {
            'gender': 'female',
            'full_name': 'Ольга Смирнова',
            'email': 'olga.smirnova@test.ru',
            'city': 'Краснодар',
            'address': 'ул. Красная, д. 75',
            'experience_years': 4,
            'about': 'Специализируюсь на массаже для беременных и молодых мам. Бережный подход и забота о здоровье.',
            'education': 'Курсы перинатального массажа',
            'languages': ['Русский'],
            'specializations': ['Массаж для беременных', 'Постнатальный массаж', 'Расслабляющий массаж', 'Массаж стоп'],
            'certificates': ['Сертификат перинатального массажа', 'Сертификат детского массажа'],
            'avatar_url': 'https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/ebb66f51-1a8c-490d-941a-ce1d83c1e3d2.jpg'
        },
        {
            'gender': 'male',
            'full_name': 'Игорь Морозов',
            'email': 'igor.morozov@test.ru',
            'city': 'Ростов-на-Дону',
            'address': 'пр. Буденновский, д. 22',
            'experience_years': 12,
            'about': 'Мастер восточных практик. Сочетаю массаж с дыхательными техниками для максимального расслабления.',
            'education': 'Обучение в Таиланде и Индии',
            'languages': ['Русский', 'Английский', 'Тайский'],
            'specializations': ['Тайский массаж', 'Индийский массаж', 'Йога-массаж', 'Стоун-терапия'],
            'certificates': ['Сертификат школы Ват По (Таиланд)', 'Сертификат аюрведического массажа'],
            'avatar_url': 'https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/1950263b-0c17-4f3a-85b4-becd078d11f8.jpg'
        },
        {
            'gender': 'female',
            'full_name': 'Наталья Белова',
            'email': 'natalia.belova@test.ru',
            'city': 'Воронеж',
            'address': 'ул. Плехановская, д. 33',
            'experience_years': 9,
            'about': 'Работаю с проблемами опорно-двигательного аппарата. Индивидуальный подход к каждому клиенту.',
            'education': 'Воронежская медицинская академия',
            'languages': ['Русский'],
            'specializations': ['Лечебный массаж', 'Ортопедический массаж', 'Массаж при сколиозе', 'Массаж суставов'],
            'certificates': ['Диплом медицинской академии', 'Сертификат ортопедического массажа'],
            'avatar_url': 'https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/b9072d35-4525-4fbb-9c11-e93af3de36d9.jpg'
        },
        {
            'gender': 'male',
            'full_name': 'Максим Соловьев',
            'email': 'maxim.soloviev@test.ru',
            'city': 'Самара',
            'address': 'ул. Ленинградская, д. 60',
            'experience_years': 5,
            'about': 'Специалист по спортивному массажу. Помогаю спортсменам достичь пиковой формы и быстро восстановиться.',
            'education': 'Самарский институт физической культуры',
            'languages': ['Русский', 'Английский'],
            'specializations': ['Спортивный массаж', 'Восстановительный массаж', 'Кинезиотейпирование', 'Миофасциальный массаж'],
            'certificates': ['Диплом института физкультуры', 'Сертификат кинезиотейпирования'],
            'avatar_url': 'https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/15292709-e79b-42b4-924a-d27a22bb1510.jpg'
        }
    ]
    
    created_users = []
    default_password = 'Test123456'
    password_hash = bcrypt.hashpw(default_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    try:
        for data in masseurs_data:
            # Create user
            cur.execute(f"""
                INSERT INTO {schema}.users (email, password_hash, role)
                VALUES ('{data['email']}', '{password_hash}', 'masseur')
                RETURNING id
            """)
            user_result = cur.fetchone()
            user_id = user_result[0]
            
            # Prepare arrays
            languages_str = '{' + ','.join([f'"{lang}"' for lang in data['languages']]) + '}'
            specs_str = '{' + ','.join([f'"{spec}"' for spec in data['specializations']]) + '}'
            certs_str = '{' + ','.join([f'"{cert}"' for cert in data['certificates']]) + '}'
            
            # Create masseur profile
            cur.execute(f"""
                INSERT INTO {schema}.masseur_profiles 
                (user_id, full_name, city, address, experience_years, about, education, 
                 avatar_url, languages, specializations, certificates, rating, reviews_count)
                VALUES (
                    {user_id}, 
                    '{data['full_name']}', 
                    '{data['city']}', 
                    '{data['address']}', 
                    {data['experience_years']}, 
                    '{data['about']}', 
                    '{data['education']}',
                    '{data['avatar_url']}',
                    '{languages_str}',
                    '{specs_str}',
                    '{certs_str}',
                    {4.5 + (user_id % 5) * 0.1},
                    {10 + (user_id % 20)}
                )
                RETURNING id
            """)
            
            profile_result = cur.fetchone()
            profile_id = profile_result[0]
            
            created_users.append({
                'user_id': user_id,
                'profile_id': profile_id,
                'email': data['email'],
                'full_name': data['full_name'],
                'city': data['city']
            })
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'success': True,
                'message': f'Создано {len(created_users)} тестовых массажистов',
                'users': created_users,
                'default_password': default_password
            }),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        cur.close()
        conn.close()
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }