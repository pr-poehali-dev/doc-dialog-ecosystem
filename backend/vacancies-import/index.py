import json
import os
import psycopg2
from typing import Any

def handler(event: dict, context: Any) -> dict:
    '''
    API для импорта вакансий в базу данных.
    Принимает массив вакансий в формате JSON и сохраняет их в БД.
    Поддерживает обновление существующих вакансий по vacancy_link.
    '''
    method = event.get('httpMethod', 'POST')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Метод не поддерживается. Используйте POST'})
        }

    body = json.loads(event.get('body', '{}'))
    vacancies = body.get('vacancies', [])

    if not vacancies:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Не переданы вакансии для импорта'})
        }

    conn = None
    inserted_count = 0
    updated_count = 0
    errors = []

    dsn = os.environ.get('DATABASE_URL')
    
    conn = psycopg2.connect(dsn)
    cur = conn.cursor()

    for idx, vacancy in enumerate(vacancies):
        try:
            vacancy_link = vacancy.get('vacancyLink', '')
            
            if vacancy_link:
                cur.execute(
                    "SELECT id FROM vacancies WHERE vacancy_link = %s",
                    (vacancy_link,)
                )
                existing = cur.fetchone()
            else:
                existing = None

            if existing:
                cur.execute("""
                    UPDATE vacancies SET
                        title = %s,
                        compensation_from = %s,
                        compensation_to = %s,
                        gross = %s,
                        company_name = %s,
                        city = %s,
                        online = %s,
                        company_link = %s,
                        company_approved = %s,
                        it_accreditation = %s,
                        without_resume = %s,
                        company_logo = %s,
                        metro_station_0 = %s,
                        metro_station_1 = %s,
                        metro_station_2 = %s,
                        metro_station_3 = %s,
                        work_experience = %s,
                        work_schedule = %s,
                        compensation_frequency = %s,
                        employer_hh_rating = %s,
                        employer_it_accreditation = %s,
                        hrbrand = %s,
                        updated_at = CURRENT_TIMESTAMP
                    WHERE id = %s
                """, (
                    vacancy.get('Название', ''),
                    vacancy.get('compensationFrom'),
                    vacancy.get('compensationTo'),
                    vacancy.get('gross', False),
                    vacancy.get('companyName', ''),
                    vacancy.get('city', ''),
                    vacancy.get('online', False),
                    vacancy.get('companyLink', ''),
                    vacancy.get('companyApproved', False),
                    vacancy.get('itAccreditation', False),
                    vacancy.get('withoutResume', False),
                    vacancy.get('companyLogo', ''),
                    vacancy.get('Станция метро0', ''),
                    vacancy.get('Станция метро1', ''),
                    vacancy.get('Станция метро2', ''),
                    vacancy.get('Станция метро3', ''),
                    vacancy.get('workExperience', ''),
                    vacancy.get('График работы', ''),
                    vacancy.get('compensationFrequency', ''),
                    vacancy.get('employer-hh-rating'),
                    vacancy.get('employer-it-accreditation', False),
                    vacancy.get('hrbrand', ''),
                    existing[0]
                ))
                updated_count += 1
            else:
                cur.execute("""
                    INSERT INTO vacancies (
                        title, compensation_from, compensation_to, gross,
                        company_name, city, online, vacancy_link, company_link,
                        company_approved, it_accreditation, without_resume, company_logo,
                        metro_station_0, metro_station_1, metro_station_2, metro_station_3,
                        work_experience, work_schedule, compensation_frequency,
                        employer_hh_rating, employer_it_accreditation, hrbrand
                    ) VALUES (
                        %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,
                        %s, %s, %s, %s, %s, %s, %s, %s, %s, %s
                    )
                """, (
                    vacancy.get('Название', ''),
                    vacancy.get('compensationFrom'),
                    vacancy.get('compensationTo'),
                    vacancy.get('gross', False),
                    vacancy.get('companyName', ''),
                    vacancy.get('city', ''),
                    vacancy.get('online', False),
                    vacancy_link,
                    vacancy.get('companyLink', ''),
                    vacancy.get('companyApproved', False),
                    vacancy.get('itAccreditation', False),
                    vacancy.get('withoutResume', False),
                    vacancy.get('companyLogo', ''),
                    vacancy.get('Станция метро0', ''),
                    vacancy.get('Станция метро1', ''),
                    vacancy.get('Станция метро2', ''),
                    vacancy.get('Станция метро3', ''),
                    vacancy.get('workExperience', ''),
                    vacancy.get('График работы', ''),
                    vacancy.get('compensationFrequency', ''),
                    vacancy.get('employer-hh-rating'),
                    vacancy.get('employer-it-accreditation', False),
                    vacancy.get('hrbrand', '')
                ))
                inserted_count += 1

        except Exception as e:
            errors.append({
                'index': idx,
                'error': str(e),
                'vacancy_title': vacancy.get('Название', 'Неизвестно')
            })

    conn.commit()
    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'success': True,
            'inserted': inserted_count,
            'updated': updated_count,
            'errors': errors,
            'total_processed': len(vacancies)
        }, ensure_ascii=False)
    }
