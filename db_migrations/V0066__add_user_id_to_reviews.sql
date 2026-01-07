-- Добавляем user_id в таблицу reviews для отслеживания авторов
ALTER TABLE t_p46047379_doc_dialog_ecosystem.reviews 
ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES t_p46047379_doc_dialog_ecosystem.users(id);

-- Создаём индекс для быстрого поиска отзывов пользователя
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON t_p46047379_doc_dialog_ecosystem.reviews(user_id);

-- Создаём индекс для быстрого поиска отзывов массажиста
CREATE INDEX IF NOT EXISTS idx_reviews_masseur_id ON t_p46047379_doc_dialog_ecosystem.reviews(masseur_id);

-- Создаём индекс для фильтрации по статусу модерации
CREATE INDEX IF NOT EXISTS idx_reviews_moderation_status ON t_p46047379_doc_dialog_ecosystem.reviews(moderation_status);