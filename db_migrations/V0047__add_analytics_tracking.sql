-- Добавляем счётчики просмотров по периодам для аналитики
ALTER TABLE t_p46047379_doc_dialog_ecosystem.courses 
ADD COLUMN IF NOT EXISTS views_day INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS views_month INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS views_year INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_view_date DATE;

ALTER TABLE t_p46047379_doc_dialog_ecosystem.masterminds 
ADD COLUMN IF NOT EXISTS views_day INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS views_month INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS views_year INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_view_date DATE;

ALTER TABLE t_p46047379_doc_dialog_ecosystem.offline_training 
ADD COLUMN IF NOT EXISTS views_day INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS views_month INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS views_year INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_view_date DATE;

-- Создаём таблицу для отслеживания платежей по продуктам
CREATE TABLE IF NOT EXISTS t_p46047379_doc_dialog_ecosystem.product_payments (
    id SERIAL PRIMARY KEY,
    school_id INTEGER NOT NULL,
    product_type VARCHAR(20) NOT NULL,
    product_id INTEGER NOT NULL,
    product_name VARCHAR(500) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description TEXT
);

CREATE INDEX IF NOT EXISTS idx_product_payments_school ON t_p46047379_doc_dialog_ecosystem.product_payments(school_id);
CREATE INDEX IF NOT EXISTS idx_product_payments_product ON t_p46047379_doc_dialog_ecosystem.product_payments(product_type, product_id);
