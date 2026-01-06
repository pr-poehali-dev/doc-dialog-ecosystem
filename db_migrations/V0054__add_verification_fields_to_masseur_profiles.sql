-- Добавляем поля верификации в masseur_profiles
ALTER TABLE t_p46047379_doc_dialog_ecosystem.masseur_profiles
ADD COLUMN IF NOT EXISTS verification_badges JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS is_premium BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS premium_until TIMESTAMP;

COMMENT ON COLUMN t_p46047379_doc_dialog_ecosystem.masseur_profiles.verification_badges IS 'Массив одобренных бейджей верификации';
COMMENT ON COLUMN t_p46047379_doc_dialog_ecosystem.masseur_profiles.is_premium IS 'Premium статус массажиста';
COMMENT ON COLUMN t_p46047379_doc_dialog_ecosystem.masseur_profiles.premium_until IS 'Дата окончания premium статуса';