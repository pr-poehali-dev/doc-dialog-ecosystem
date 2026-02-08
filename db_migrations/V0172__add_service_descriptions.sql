-- Добавляем поле service_descriptions для хранения описаний услуг
ALTER TABLE t_p46047379_doc_dialog_ecosystem.masseur_profiles 
ADD COLUMN IF NOT EXISTS service_descriptions JSONB DEFAULT '{}'::jsonb;

COMMENT ON COLUMN t_p46047379_doc_dialog_ecosystem.masseur_profiles.service_descriptions 
IS 'JSON объект с описаниями услуг для каждого формата работы';
