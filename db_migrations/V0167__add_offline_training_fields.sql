-- Добавление полей course_type, has_certificate, duration_hours в таблицу offline_training
ALTER TABLE t_p46047379_doc_dialog_ecosystem.offline_training 
ADD COLUMN IF NOT EXISTS course_type VARCHAR(50) DEFAULT 'offline',
ADD COLUMN IF NOT EXISTS has_certificate BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS duration_hours INTEGER;