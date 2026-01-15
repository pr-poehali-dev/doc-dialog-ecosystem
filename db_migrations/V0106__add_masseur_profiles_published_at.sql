-- Add published_at to track when profile was first published (not imported)
ALTER TABLE t_p46047379_doc_dialog_ecosystem.masseur_profiles 
ADD COLUMN IF NOT EXISTS published_at TIMESTAMP DEFAULT NULL;

-- Set published_at for existing profiles that are NOT imported
UPDATE t_p46047379_doc_dialog_ecosystem.masseur_profiles 
SET published_at = created_at 
WHERE user_id NOT IN (
    SELECT id FROM t_p46047379_doc_dialog_ecosystem.users 
    WHERE email LIKE '%@imported.local'
) AND published_at IS NULL;