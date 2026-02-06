UPDATE t_p46047379_doc_dialog_ecosystem.users u
SET 
    first_name = TRIM(SPLIT_PART(mp.full_name, ' ', 1)),
    last_name = TRIM(SUBSTRING(mp.full_name FROM POSITION(' ' IN mp.full_name) + 1)),
    phone = mp.phone
FROM t_p46047379_doc_dialog_ecosystem.masseur_profiles mp
WHERE u.id = mp.user_id
  AND mp.full_name IS NOT NULL
  AND mp.full_name != ''
  AND (u.first_name IS NULL OR u.first_name = '');

UPDATE t_p46047379_doc_dialog_ecosystem.users u
SET 
    first_name = TRIM(SPLIT_PART(cp.full_name, ' ', 1)),
    last_name = TRIM(SUBSTRING(cp.full_name FROM POSITION(' ' IN cp.full_name) + 1)),
    phone = cp.phone
FROM t_p46047379_doc_dialog_ecosystem.client_profiles cp
WHERE u.id = cp.user_id
  AND cp.full_name IS NOT NULL
  AND cp.full_name != ''
  AND (u.first_name IS NULL OR u.first_name = '');

UPDATE t_p46047379_doc_dialog_ecosystem.users u
SET 
    first_name = TRIM(SPLIT_PART(s.name, ' ', 1)),
    last_name = TRIM(SUBSTRING(s.name FROM POSITION(' ' IN s.name) + 1)),
    phone = s.phone
FROM t_p46047379_doc_dialog_ecosystem.schools s
WHERE u.id = s.user_id
  AND s.name IS NOT NULL
  AND s.name != ''
  AND (u.first_name IS NULL OR u.first_name = '');

UPDATE t_p46047379_doc_dialog_ecosystem.users u
SET 
    first_name = TRIM(SPLIT_PART(sa.name, ' ', 1)),
    last_name = TRIM(SUBSTRING(sa.name FROM POSITION(' ' IN sa.name) + 1)),
    phone = sa.phone
FROM t_p46047379_doc_dialog_ecosystem.salons sa
WHERE u.id = sa.user_id
  AND sa.name IS NOT NULL
  AND sa.name != ''
  AND (u.first_name IS NULL OR u.first_name = '');