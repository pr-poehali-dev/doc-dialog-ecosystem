-- Создание таблицы для верификации массажистов
CREATE TABLE IF NOT EXISTS t_p46047379_doc_dialog_ecosystem.masseur_verifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES t_p46047379_doc_dialog_ecosystem.users(id),
    
    -- Типы верификации
    education_verified BOOLEAN DEFAULT FALSE,           -- Подтверждено образование
    experience_verified BOOLEAN DEFAULT FALSE,          -- Подтвержден опыт работы
    identity_verified BOOLEAN DEFAULT FALSE,            -- Подтверждена личность
    insurance_verified BOOLEAN DEFAULT FALSE,           -- Есть страховка
    
    -- Документы для проверки (URL в S3)
    education_documents JSONB DEFAULT '[]',             -- Дипломы, сертификаты
    experience_documents JSONB DEFAULT '[]',            -- Отзывы, рекомендации
    identity_document TEXT,                             -- Паспорт/ID
    insurance_document TEXT,                            -- Страховка
    
    -- Статусы проверки
    education_status VARCHAR(20) DEFAULT 'pending',     -- pending, approved, rejected
    experience_status VARCHAR(20) DEFAULT 'pending',
    identity_status VARCHAR(20) DEFAULT 'pending',
    insurance_status VARCHAR(20) DEFAULT 'pending',
    
    -- Комментарии модератора
    education_comment TEXT,
    experience_comment TEXT,
    identity_comment TEXT,
    insurance_comment TEXT,
    
    -- Премиум статус
    is_premium BOOLEAN DEFAULT FALSE,
    premium_until TIMESTAMP,
    
    -- Кто проверил
    verified_by INTEGER REFERENCES t_p46047379_doc_dialog_ecosystem.users(id),
    verified_at TIMESTAMP,
    
    -- Даты
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_masseur_verifications_user_id ON t_p46047379_doc_dialog_ecosystem.masseur_verifications(user_id);
CREATE INDEX IF NOT EXISTS idx_masseur_verifications_premium ON t_p46047379_doc_dialog_ecosystem.masseur_verifications(is_premium);

-- Добавляем поля в таблицу users для быстрого доступа
ALTER TABLE t_p46047379_doc_dialog_ecosystem.users 
ADD COLUMN IF NOT EXISTS is_premium BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS premium_until TIMESTAMP,
ADD COLUMN IF NOT EXISTS verification_badges JSONB DEFAULT '[]';

-- Комментарий к таблице
COMMENT ON TABLE t_p46047379_doc_dialog_ecosystem.masseur_verifications IS 'Верификация массажистов: документы, статусы проверки, премиум-статус';