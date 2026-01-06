-- Добавляем поля для ссылок на облачные папки (вместо загрузки файлов)
ALTER TABLE t_p46047379_doc_dialog_ecosystem.masseur_verifications
ADD COLUMN IF NOT EXISTS education_folder_url TEXT,
ADD COLUMN IF NOT EXISTS experience_folder_url TEXT,
ADD COLUMN IF NOT EXISTS identity_folder_url TEXT,
ADD COLUMN IF NOT EXISTS insurance_folder_url TEXT;

COMMENT ON COLUMN t_p46047379_doc_dialog_ecosystem.masseur_verifications.education_folder_url IS 'Ссылка на папку с документами об образовании (Google Drive, Яндекс.Диск и т.д.)';
COMMENT ON COLUMN t_p46047379_doc_dialog_ecosystem.masseur_verifications.experience_folder_url IS 'Ссылка на папку с документами об опыте работы';
COMMENT ON COLUMN t_p46047379_doc_dialog_ecosystem.masseur_verifications.identity_folder_url IS 'Ссылка на папку с документами личности';
COMMENT ON COLUMN t_p46047379_doc_dialog_ecosystem.masseur_verifications.insurance_folder_url IS 'Ссылка на папку со страховыми документами';