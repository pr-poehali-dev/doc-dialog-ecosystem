-- Добавляем поле для внешней ссылки на вакансию салона
ALTER TABLE t_p46047379_doc_dialog_ecosystem.salon_vacancies 
ADD COLUMN IF NOT EXISTS vacancy_link VARCHAR(1000);