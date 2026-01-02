-- Установка роли admin для пользователя svodopianoff@yandex.ru

UPDATE t_p46047379_doc_dialog_ecosystem.users
SET role = 'admin'
WHERE email = 'svodopianoff@yandex.ru';