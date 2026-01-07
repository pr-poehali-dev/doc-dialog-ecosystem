-- Добавляем колонку promoted_until для продвижения массажистов

ALTER TABLE t_p46047379_doc_dialog_ecosystem.masseur_profiles 
ADD COLUMN IF NOT EXISTS promoted_until TIMESTAMP;

-- Создаем индекс для быстрого поиска продвигаемых массажистов
CREATE INDEX IF NOT EXISTS idx_masseur_profiles_promoted_until 
ON t_p46047379_doc_dialog_ecosystem.masseur_profiles(promoted_until) 
WHERE promoted_until IS NOT NULL;