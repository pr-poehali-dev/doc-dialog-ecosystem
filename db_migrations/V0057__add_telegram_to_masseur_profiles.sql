-- Добавляем поле telegram в профиль массажиста
ALTER TABLE t_p46047379_doc_dialog_ecosystem.masseur_profiles 
ADD COLUMN IF NOT EXISTS telegram VARCHAR(100);