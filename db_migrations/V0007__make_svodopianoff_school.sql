-- Сделать svodopianoff@yandex.ru школой
UPDATE t_p46047379_doc_dialog_ecosystem.users 
SET is_school = TRUE, 
    school_name = 'Школа массажа' 
WHERE email = 'svodopianoff@yandex.ru';
