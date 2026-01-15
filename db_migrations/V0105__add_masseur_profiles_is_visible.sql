-- Add is_visible column to masseur_profiles to allow hiding from catalog
ALTER TABLE t_p46047379_doc_dialog_ecosystem.masseur_profiles 
ADD COLUMN IF NOT EXISTS is_visible BOOLEAN DEFAULT true;