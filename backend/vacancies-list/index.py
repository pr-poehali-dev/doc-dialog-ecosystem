import json
import os
import psycopg2
from typing import Any

def handler(event: dict, context: Any) -> dict:
    '''
    API для получения списка вакансий из базы данных.
    Поддерживает фильтрацию по городу, опыту работы, онлайн-формату.
    Возвращает вакансии с пагинацией.
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
    city = params.get('city', '')
    online = params.get('online', '')
    work_experience = params.get('workExperience', '')
    limit = int(params.get('limit', '50'))
    offset = int(params.get('offset', '0'))

    dsn = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(dsn)
    cur = conn.cursor()

    where_clauses = []
    query_params = []

    if city:
        where_clauses.append("city = %s")
        query_params.append(city)

    if online == 'true':
        where_clauses.append("online = true")

    if work_experience:
        where_clauses.append("work_experience = %s")
        query_params.append(work_experience)

    where_sql = ""
    if where_clauses:
        where_sql = "WHERE " + " AND ".join(where_clauses)

    count_query = f"SELECT COUNT(*) FROM vacancies {where_sql}"
    count_params = query_params.copy()
    cur.execute(count_query, count_params)
    total = cur.fetchone()[0]

    query_params.extend([limit, offset])
    
    query = f"""
        SELECT 
            id, title, compensation_from, compensation_to, gross,
            company_name, city, online, vacancy_link, company_link,
            company_approved, it_accreditation, without_resume, company_logo,
            metro_station_0, metro_station_1, metro_station_2, metro_station_3,
            work_experience, work_schedule, compensation_frequency,
            employer_hh_rating, employer_it_accreditation, hrbrand,
            created_at, updated_at
        FROM vacancies
        {where_sql}
        ORDER BY created_at DESC
        LIMIT %s OFFSET %s
    """

    cur.execute(query, query_params)
    rows = cur.fetchall()

    vacancies = []
    for row in rows:
        metro_stations = [row[14], row[15], row[16], row[17]]
        metro_stations = [m for m in metro_stations if m]

        vacancies.append({
            'id': row[0],
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
            'updatedAt': row[25].isoformat() if row[25] else None
        })

    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'vacancies': vacancies,
            'total': total,
            'limit': limit,
            'offset': offset,
            'hasMore': offset + limit < total
        }, ensure_ascii=False)
    }