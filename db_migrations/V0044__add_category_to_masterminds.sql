-- Добавляем поле category к таблице masterminds
ALTER TABLE t_p46047379_doc_dialog_ecosystem.masterminds 
ADD COLUMN category VARCHAR(50) DEFAULT 'technique';

-- Создаем индекс для быстрого поиска по категориям
CREATE INDEX idx_masterminds_category ON t_p46047379_doc_dialog_ecosystem.masterminds(category);

-- Комментарий к полю
COMMENT ON COLUMN t_p46047379_doc_dialog_ecosystem.masterminds.category IS 'Категория мастермайнда: technique (массажные техники), business (бизнес и маркетинг), soft_skills (общение и психология), health (здоровье и безопасность), digital (цифровые навыки)';