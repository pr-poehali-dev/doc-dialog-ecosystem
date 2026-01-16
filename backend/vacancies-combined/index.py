import json
import os
import psycopg2
from typing import Any

def handler(event: dict, context: Any) -> dict:
    '''
    API для получения объединённого списка вакансий из двух источников:
    1. Импортированные вакансии (vacancies) - с HH.ru
    2. Вакансии от салонов (salon_vacancies)
    Возвращает единый формат данных для отображения.
    '''
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }

    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Метод не поддерживается. Используйте GET'})
        }

    params = event.get('queryStringParameters') or {}
    search = params.get('search', '').lower()
    city = params.get('city', '')
    online = params.get('online', '')
    work_experience = params.get('workExperience', '')
    limit = int(params.get('limit', '50'))
    offset = int(params.get('offset', '0'))

    dsn = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(dsn)
    cur = conn.cursor()

    all_vacancies = []

    # 1. Получаем импортированные вакансии с HH.ru
    where_clauses_imported = []
    query_params_imported = []

    if city:
        where_clauses_imported.append("city = %s")
        query_params_imported.append(city)

    if online == 'true':
        where_clauses_imported.append("online = true")
    elif online == 'false':
        where_clauses_imported.append("online = false")

    if work_experience:
        where_clauses_imported.append("work_experience = %s")
        query_params_imported.append(work_experience)

    where_sql_imported = ""
    if where_clauses_imported:
        where_sql_imported = "WHERE " + " AND ".join(where_clauses_imported)

    query_imported = f"""
        SELECT 
            id, title, compensation_from, compensation_to, gross,
            company_name, city, online, vacancy_link, company_link,
            company_approved, it_accreditation, without_resume, company_logo,
            metro_station_0, metro_station_1, metro_station_2, metro_station_3,
            work_experience, work_schedule, compensation_frequency,
            employer_hh_rating, employer_it_accreditation, hrbrand,
            created_at
        FROM vacancies
        {where_sql_imported}
        ORDER BY created_at DESC
    """

    cur.execute(query_imported, query_params_imported)
    rows_imported = cur.fetchall()

    for row in rows_imported:
        metro_stations = [row[14], row[15], row[16], row[17]]
        metro_stations = [m for m in metro_stations if m]

        vacancy = {
            'id': f'imported_{row[0]}',
            'source': 'hh',
            'title': row[1],
            'compensationFrom': row[2],
            'compensationTo': row[3],
            'gross': row[4],
            'companyName': row[5],
            'city': row[6],
            'online': row[7],
            'vacancyLink': row[8],
            'companyLink': row[9],
            'companyApproved': row[10],
            'itAccreditation': row[11],
            'withoutResume': row[12],
            'companyLogo': row[13],
            'metroStations': metro_stations,
            'workExperience': row[18],
            'workSchedule': row[19],
            'compensationFrequency': row[20],
            'employerHhRating': float(row[21]) if row[21] else None,
            'employerItAccreditation': row[22],
            'hrbrand': row[23],
            'createdAt': row[24].isoformat() if row[24] else None,
            'requirements': [],
            'description': ''
        }

        # Применяем поисковый фильтр
        if search:
            if search not in vacancy['title'].lower() and search not in vacancy['companyName'].lower():
                continue

        all_vacancies.append(vacancy)

    # 2. Получаем вакансии от салонов
    query_salon = """
        SELECT 
            sv.id, sv.specializations, sv.schedule, sv.salary_from, sv.salary_to,
            sv.salary_currency, sv.requirements, sv.created_at, sv.salon_id, sv.vacancy_link
        FROM salon_vacancies sv
        WHERE sv.is_active = true
        ORDER BY sv.created_at DESC
    """

    cur.execute(query_salon)
    rows_salon = cur.fetchall()

    # Получаем информацию о салонах
    salon_ids = [row[8] for row in rows_salon]
    salons_data = {}
    
    if salon_ids:
        salon_ids_str = ','.join(str(sid) for sid in salon_ids)
        query_salons = f"""
            SELECT id, name, city, phone, logo_url
            FROM salons
            WHERE id IN ({salon_ids_str})
        """
        cur.execute(query_salons)
        for salon_row in cur.fetchall():
            salons_data[salon_row[0]] = {
                'name': salon_row[1],
                'city': salon_row[2],
                'phone': salon_row[3],
                'logo': salon_row[4]
            }

    for row in rows_salon:
        specializations = row[1] if row[1] else []
        title = ', '.join(specializations) if specializations else 'Массажист'
        
        salary_from = float(row[3]) if row[3] else None
        salary_to = float(row[4]) if row[4] else None
        
        salon_info = salons_data.get(row[8], {})
        
        vacancy = {
            'id': f'salon_{row[0]}',
            'source': 'salon',
            'title': title,
            'compensationFrom': int(salary_from) if salary_from else None,
            'compensationTo': int(salary_to) if salary_to else None,
            'gross': False,
            'companyName': salon_info.get('name', 'Массажный салон'),
            'city': salon_info.get('city'),
            'online': False,
            'vacancyLink': row[9],
            'companyLink': None,
            'companyApproved': False,
            'itAccreditation': False,
            'withoutResume': False,
            'companyLogo': salon_info.get('logo'),
            'metroStations': [],
            'workExperience': None,
            'workSchedule': row[2],
            'compensationFrequency': 'monthly',
            'employerHhRating': None,
            'employerItAccreditation': False,
            'hrbrand': None,
            'createdAt': row[7].isoformat() if row[7] else None,
            'requirements': row[6].split('\n') if row[6] else [],
            'description': f'Вакансия в массажном салоне. График: {row[2] or "не указан"}',
            'district': None,
            'contacts': salon_info.get('phone')
        }

        # Применяем поисковый фильтр
        if search:
            if search not in vacancy['title'].lower() and search not in vacancy['companyName'].lower():
                continue

        # Применяем фильтр по городу
        if city and vacancy['city'] != city:
            continue

        all_vacancies.append(vacancy)

    # Сортируем: сначала салонные вакансии, потом импортированные (внутри по дате)
    def sort_key(v):
        is_salon = 0 if v['source'] == 'salon' else 1
        date = v['createdAt'] or ''
        return (is_salon, date)
    
    all_vacancies.sort(key=sort_key, reverse=True)

    # Применяем пагинацию
    total = len(all_vacancies)
    paginated = all_vacancies[offset:offset + limit]

    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'vacancies': paginated,
            'total': total,
            'limit': limit,
            'offset': offset,
            'hasMore': offset + limit < total
        }, ensure_ascii=False)
    }