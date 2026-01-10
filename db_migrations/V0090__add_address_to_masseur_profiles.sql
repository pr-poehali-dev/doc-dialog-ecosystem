-- Добавляем поле адреса для специалистов
ALTER TABLE t_p46047379_doc_dialog_ecosystem.masseur_profiles
ADD COLUMN IF NOT EXISTS address TEXT DEFAULT '';
