-- Переименовываем whatsapp в max_messenger в users
ALTER TABLE t_p46047379_doc_dialog_ecosystem.users 
RENAME COLUMN whatsapp TO max_messenger;

-- Переименовываем whatsapp в max_messenger в masseur_profiles
ALTER TABLE t_p46047379_doc_dialog_ecosystem.masseur_profiles 
RENAME COLUMN whatsapp TO max_messenger;

-- Переименовываем show_whatsapp в show_max_messenger в masseur_landing_pages
ALTER TABLE t_p46047379_doc_dialog_ecosystem.masseur_landing_pages 
RENAME COLUMN show_whatsapp TO show_max_messenger;