-- Добавление поля moderation_comment в offline_training
ALTER TABLE t_p46047379_doc_dialog_ecosystem.offline_training 
ADD COLUMN IF NOT EXISTS moderation_comment TEXT;