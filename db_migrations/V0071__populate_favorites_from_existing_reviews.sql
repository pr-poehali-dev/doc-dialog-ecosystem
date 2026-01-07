INSERT INTO t_p46047379_doc_dialog_ecosystem.favorites (user_id, masseur_id, created_at)
SELECT DISTINCT 
    r.user_id,
    r.masseur_id,
    MIN(r.created_at) as created_at
FROM t_p46047379_doc_dialog_ecosystem.reviews r
WHERE r.rating >= 4
GROUP BY r.user_id, r.masseur_id
ON CONFLICT (user_id, masseur_id) DO NOTHING;