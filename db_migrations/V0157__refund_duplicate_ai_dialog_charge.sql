-- Возврат 15₽ за двойное списание в AI-диалоге
UPDATE t_p46047379_doc_dialog_ecosystem.users 
SET balance = balance + 15 
WHERE id = 223;