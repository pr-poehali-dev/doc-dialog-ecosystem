-- Добавляем поле ИНН в профиль массажиста
ALTER TABLE t_p46047379_doc_dialog_ecosystem.masseur_profiles 
ADD COLUMN IF NOT EXISTS inn VARCHAR(12);

COMMENT ON COLUMN t_p46047379_doc_dialog_ecosystem.masseur_profiles.inn IS 'ИНН специалиста (обязательно для публикации лендинга)';