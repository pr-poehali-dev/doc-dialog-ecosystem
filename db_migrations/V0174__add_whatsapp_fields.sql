-- Добавляем поле whatsapp в профили пользователей
ALTER TABLE t_p46047379_doc_dialog_ecosystem.users 
ADD COLUMN IF NOT EXISTS whatsapp VARCHAR(50);

-- Добавляем поле show_whatsapp в лендинги массажистов
ALTER TABLE t_p46047379_doc_dialog_ecosystem.masseur_landing_pages 
ADD COLUMN IF NOT EXISTS show_whatsapp BOOLEAN DEFAULT TRUE;