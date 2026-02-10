-- Добавляем индекс на user_id для ускорения поиска лендингов
CREATE INDEX IF NOT EXISTS idx_masseur_landing_pages_user_id 
ON t_p46047379_doc_dialog_ecosystem.masseur_landing_pages(user_id);

-- Добавляем индекс на updated_at для быстрой сортировки
CREATE INDEX IF NOT EXISTS idx_masseur_landing_pages_updated_at 
ON t_p46047379_doc_dialog_ecosystem.masseur_landing_pages(updated_at DESC);