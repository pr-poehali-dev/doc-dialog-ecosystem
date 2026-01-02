-- Добавление поля school_name для хранения названия школы в таблицы courses и masterminds

ALTER TABLE t_p46047379_doc_dialog_ecosystem.courses
ADD COLUMN IF NOT EXISTS school_name VARCHAR(255);

ALTER TABLE t_p46047379_doc_dialog_ecosystem.masterminds
ADD COLUMN IF NOT EXISTS school_name VARCHAR(255);

COMMENT ON COLUMN t_p46047379_doc_dialog_ecosystem.courses.school_name IS 'Название школы, которое вводит владелец при создании курса';
COMMENT ON COLUMN t_p46047379_doc_dialog_ecosystem.masterminds.school_name IS 'Название школы, которое вводит владелец при создании мастермайнда';