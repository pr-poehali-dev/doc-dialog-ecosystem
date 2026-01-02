-- Добавление полей для должности автора и дополнительных ведущих в таблицы courses и masterminds

-- Для курсов
ALTER TABLE t_p46047379_doc_dialog_ecosystem.courses
ADD COLUMN IF NOT EXISTS author_position VARCHAR(255),
ADD COLUMN IF NOT EXISTS co_authors JSONB;

-- Для мастермайндов
ALTER TABLE t_p46047379_doc_dialog_ecosystem.masterminds
ADD COLUMN IF NOT EXISTS author_position VARCHAR(255),
ADD COLUMN IF NOT EXISTS co_authors JSONB;

-- Комментарии для понимания структуры
COMMENT ON COLUMN t_p46047379_doc_dialog_ecosystem.courses.author_position IS 'Должность автора/преподавателя курса';
COMMENT ON COLUMN t_p46047379_doc_dialog_ecosystem.courses.co_authors IS 'Массив дополнительных ведущих в формате JSON: [{"name": "Имя", "position": "Должность", "photo": "URL"}]';
COMMENT ON COLUMN t_p46047379_doc_dialog_ecosystem.masterminds.author_position IS 'Должность ведущего мастермайнда';
COMMENT ON COLUMN t_p46047379_doc_dialog_ecosystem.masterminds.co_authors IS 'Массив дополнительных ведущих в формате JSON: [{"name": "Имя", "position": "Должность", "photo": "URL"}]';
