-- Таблица для настройки цен на продвижение
CREATE TABLE IF NOT EXISTS promotion_pricing (
  id SERIAL PRIMARY KEY,
  entity_type VARCHAR(50) NOT NULL, -- 'course', 'mastermind', 'offline_training'
  category VARCHAR(50), -- 'technique', 'business', 'soft_skills', 'health', 'digital', NULL для "все категории"
  promotion_type VARCHAR(50) NOT NULL, -- 'own_category', 'all_categories'
  duration_days INTEGER NOT NULL, -- количество дней продвижения
  price_rub INTEGER NOT NULL, -- цена в рублях
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Вставляем начальные цены
INSERT INTO promotion_pricing (entity_type, category, promotion_type, duration_days, price_rub) VALUES
-- Курсы - своя категория
('course', 'technique', 'own_category', 1, 100),
('course', 'technique', 'own_category', 3, 250),
('course', 'technique', 'own_category', 7, 500),
('course', 'business', 'own_category', 1, 100),
('course', 'business', 'own_category', 3, 250),
('course', 'business', 'own_category', 7, 500),
('course', 'soft_skills', 'own_category', 1, 100),
('course', 'soft_skills', 'own_category', 3, 250),
('course', 'soft_skills', 'own_category', 7, 500),
('course', 'health', 'own_category', 1, 100),
('course', 'health', 'own_category', 3, 250),
('course', 'health', 'own_category', 7, 500),
('course', 'digital', 'own_category', 1, 100),
('course', 'digital', 'own_category', 3, 250),
('course', 'digital', 'own_category', 7, 500),

-- Курсы - все категории
('course', NULL, 'all_categories', 1, 300),
('course', NULL, 'all_categories', 3, 750),
('course', NULL, 'all_categories', 7, 1500),

-- Мастермайнды - своя категория
('mastermind', 'technique', 'own_category', 1, 100),
('mastermind', 'technique', 'own_category', 3, 250),
('mastermind', 'technique', 'own_category', 7, 500),
('mastermind', 'business', 'own_category', 1, 100),
('mastermind', 'business', 'own_category', 3, 250),
('mastermind', 'business', 'own_category', 7, 500),
('mastermind', 'soft_skills', 'own_category', 1, 100),
('mastermind', 'soft_skills', 'own_category', 3, 250),
('mastermind', 'soft_skills', 'own_category', 7, 500),
('mastermind', 'health', 'own_category', 1, 100),
('mastermind', 'health', 'own_category', 3, 250),
('mastermind', 'health', 'own_category', 7, 500),
('mastermind', 'digital', 'own_category', 1, 100),
('mastermind', 'digital', 'own_category', 3, 250),
('mastermind', 'digital', 'own_category', 7, 500),

-- Мастермайнды - все категории
('mastermind', NULL, 'all_categories', 1, 300),
('mastermind', NULL, 'all_categories', 3, 750),
('mastermind', NULL, 'all_categories', 7, 1500),

-- Офлайн тренинги - своя категория
('offline_training', 'technique', 'own_category', 1, 100),
('offline_training', 'technique', 'own_category', 3, 250),
('offline_training', 'technique', 'own_category', 7, 500),
('offline_training', 'business', 'own_category', 1, 100),
('offline_training', 'business', 'own_category', 3, 250),
('offline_training', 'business', 'own_category', 7, 500),
('offline_training', 'soft_skills', 'own_category', 1, 100),
('offline_training', 'soft_skills', 'own_category', 3, 250),
('offline_training', 'soft_skills', 'own_category', 7, 500),
('offline_training', 'health', 'own_category', 1, 100),
('offline_training', 'health', 'own_category', 3, 250),
('offline_training', 'health', 'own_category', 7, 500),
('offline_training', 'digital', 'own_category', 1, 100),
('offline_training', 'digital', 'own_category', 3, 250),
('offline_training', 'digital', 'own_category', 7, 500),

-- Офлайн тренинги - все категории
('offline_training', NULL, 'all_categories', 1, 300),
('offline_training', NULL, 'all_categories', 3, 750),
('offline_training', NULL, 'all_categories', 7, 1500);

CREATE INDEX IF NOT EXISTS idx_promotion_pricing_entity ON promotion_pricing(entity_type, category, promotion_type);