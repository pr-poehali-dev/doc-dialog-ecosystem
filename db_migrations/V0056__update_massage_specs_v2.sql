-- Обновление специализаций массажистов: замена старых на новые

UPDATE t_p46047379_doc_dialog_ecosystem.masseur_profiles
SET specializations = ARRAY(
    SELECT CASE 
        WHEN spec = 'Релаксационный массаж' THEN 'Релакс тела'
        WHEN spec = 'Восстановительный массаж' THEN 'Восстановительные техники'
        WHEN spec = 'Профилактический массаж' THEN 'Профилактика тела'
        WHEN spec = 'Спортивный массаж' THEN 'Для спортсменов'
        WHEN spec = 'Антицеллюлитный массаж' THEN 'Коррекция фигуры'
        WHEN spec = 'Выездной массаж' THEN 'Выезд к клиенту'
        WHEN spec = 'Массаж в салоне' THEN 'Прием в кабинете/салоне'
        ELSE spec
    END
    FROM unnest(specializations) AS spec
)
WHERE specializations IS NOT NULL;