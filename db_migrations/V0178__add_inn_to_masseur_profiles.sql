-- Добавляем поле inn в таблицу masseur_profiles
ALTER TABLE t_p46047379_doc_dialog_ecosystem.masseur_profiles 
ADD COLUMN IF NOT EXISTS inn VARCHAR(12);