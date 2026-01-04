-- Добавляем max_url для замены telegram и instagram
ALTER TABLE t_p46047379_doc_dialog_ecosystem.schools 
ADD COLUMN IF NOT EXISTS max_url TEXT;