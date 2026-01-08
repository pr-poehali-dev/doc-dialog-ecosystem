-- Создание таблицы тарифных планов
CREATE TABLE IF NOT EXISTS t_p46047379_doc_dialog_ecosystem.subscription_plans (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  courses_limit INT,
  messages_limit_per_day INT,
  promo_requests_allowed BOOLEAN DEFAULT false,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Вставка дефолтных тарифов
INSERT INTO t_p46047379_doc_dialog_ecosystem.subscription_plans (name, price, courses_limit, messages_limit_per_day, promo_requests_allowed, description) VALUES
('Базовый', 0, 1, 5, false, 'Бесплатный тариф: 1 курс, 5 сообщений в день'),
('Профессиональный', 5000, 3, 5, false, 'Профессиональный: 3 курса, 5 сообщений, без запросов скидок'),
('Безлимит', 15000, NULL, NULL, true, 'Безлимитный: неограниченные курсы, сообщения и запросы скидок');

-- Создание таблицы подписок школ
CREATE TABLE IF NOT EXISTS t_p46047379_doc_dialog_ecosystem.school_subscriptions (
  id SERIAL PRIMARY KEY,
  school_id INT NOT NULL REFERENCES t_p46047379_doc_dialog_ecosystem.schools(id),
  plan_id INT NOT NULL REFERENCES t_p46047379_doc_dialog_ecosystem.subscription_plans(id),
  started_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Добавляем уникальный индекс для активных подписок
CREATE UNIQUE INDEX IF NOT EXISTS idx_school_active_subscription 
ON t_p46047379_doc_dialog_ecosystem.school_subscriptions(school_id) 
WHERE is_active = true;

-- Добавляем поля для подсчета использованных ресурсов
ALTER TABLE t_p46047379_doc_dialog_ecosystem.schools 
ADD COLUMN IF NOT EXISTS courses_published_this_month INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS messages_sent_today INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_message_reset_date DATE DEFAULT CURRENT_DATE;