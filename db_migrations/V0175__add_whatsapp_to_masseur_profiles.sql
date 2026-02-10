-- Добавляем поле whatsapp в профили массажистов
ALTER TABLE t_p46047379_doc_dialog_ecosystem.masseur_profiles 
ADD COLUMN IF NOT EXISTS whatsapp VARCHAR(50);