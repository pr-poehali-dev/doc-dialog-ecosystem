-- Добавляем поле category к таблице offline_training
ALTER TABLE t_p46047379_doc_dialog_ecosystem.offline_training 
ADD COLUMN category VARCHAR(50) DEFAULT 'technique';

-- Создаем индекс для быстрого поиска по категориям
CREATE INDEX idx_offline_training_category ON t_p46047379_doc_dialog_ecosystem.offline_training(category);

-- Комментарий к полю
COMMENT ON COLUMN t_p46047379_doc_dialog_ecosystem.offline_training.category IS 'Категория курса: technique (массажные техники), business (бизнес и маркетинг), soft_skills (общение и психология), health (здоровье и безопасность), digital (цифровые навыки)';