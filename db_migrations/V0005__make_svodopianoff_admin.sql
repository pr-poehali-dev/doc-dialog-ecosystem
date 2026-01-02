-- Make svodopianoff@yandex.ru admin
UPDATE t_p46047379_doc_dialog_ecosystem.users 
SET is_admin = TRUE, 
    is_moderator = TRUE 
WHERE email = 'svodopianoff@yandex.ru';