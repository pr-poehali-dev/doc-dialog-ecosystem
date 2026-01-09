-- Добавляем таблицу для временного хранения данных вакансий до оплаты
CREATE TABLE IF NOT EXISTS pending_vacancies (
    id SERIAL PRIMARY KEY,
    payment_id VARCHAR(255) UNIQUE NOT NULL,
    salon_id INTEGER NOT NULL,
    vacancy_data JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Добавляем поле expires_at в salon_vacancies для автоматического истечения срока
ALTER TABLE salon_vacancies 
ADD COLUMN IF NOT EXISTS expires_at TIMESTAMP NULL;

-- Создаём индекс для быстрого поиска истёкших вакансий
CREATE INDEX IF NOT EXISTS idx_vacancies_expires_at 
ON salon_vacancies(expires_at) 
WHERE expires_at IS NOT NULL;

-- Создаём индекс для быстрого поиска по payment_id
CREATE INDEX IF NOT EXISTS idx_pending_vacancies_payment_id 
ON pending_vacancies(payment_id);
