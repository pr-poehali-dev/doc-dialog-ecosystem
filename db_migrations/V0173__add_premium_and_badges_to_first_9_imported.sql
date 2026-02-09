-- Добавляем premium статус и полные бейджи верификации первым 9 импортированным массажистам

UPDATE t_p46047379_doc_dialog_ecosystem.masseur_profiles
SET 
    is_premium = true,
    premium_until = NOW() + INTERVAL '10 years',
    verification_badges = '["education", "experience", "identity"]'::jsonb
WHERE id IN (24, 25, 26, 27, 28, 29, 30, 31, 32);
