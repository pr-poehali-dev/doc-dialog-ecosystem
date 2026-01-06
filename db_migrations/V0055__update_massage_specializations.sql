-- Обновление старых специализаций массажистов на новые

UPDATE t_p46047379_doc_dialog_ecosystem.masseur_profiles
SET specializations = ARRAY(
    SELECT DISTINCT unnest(
        CASE 
            WHEN 'Релаксационный массаж' = ANY(specializations) THEN ARRAY['Релакс тела']
            WHEN 'Восстановительный массаж' = ANY(specializations) THEN ARRAY['Восстановительные техники']
            WHEN 'Профилактический массаж' = ANY(specializations) THEN ARRAY['Профилактика тела']
            WHEN 'Спортивный массаж' = ANY(specializations) THEN ARRAY['Для спортсменов']
            WHEN 'Антицеллюлитный массаж' = ANY(specializations) THEN ARRAY['Коррекция фигуры']
            WHEN 'Выездной массаж' = ANY(specializations) THEN ARRAY['Выезд к клиенту']
            WHEN 'Массаж в салоне' = ANY(specializations) THEN ARRAY['Прием в кабинете/салоне']
            ELSE specializations
        END
    )
)
WHERE specializations IS NOT NULL;