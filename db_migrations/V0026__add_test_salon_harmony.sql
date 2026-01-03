-- Добавляем тестовый салон для демонстрации
INSERT INTO salons (name, description, city, address, phone, email, website, photos, is_verified)
VALUES (
  'Салон красоты "Гармония"',
  'Премиальный салон красоты с командой профессиональных массажистов. Специализируемся на SPA-процедурах и лечебном массаже. Работаем с 2015 года.',
  'Москва',
  'ул. Тверская, д. 15, стр. 1',
  '+7 (495) 123-45-67',
  'info@harmony-spa.ru',
  'https://harmony-spa.ru',
  ARRAY['https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400', 'https://images.unsplash.com/photo-1519415943484-9fa1873496d4?w=400', 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400'],
  true
);

-- Добавляем вакансии для тестового салона
INSERT INTO salon_vacancies (salon_id, specializations, schedule, salary_from, salary_to, salary_currency, requirements, requires_partner_courses)
SELECT 
  s.id,
  ARRAY['Классический массаж', 'Спортивный массаж'],
  'Полный день, 5/2',
  80000,
  120000,
  'RUB',
  'Опыт работы от 2 лет, медицинское образование приветствуется',
  false
FROM salons s WHERE s.name = 'Салон красоты "Гармония"';

INSERT INTO salon_vacancies (salon_id, specializations, schedule, salary_from, salary_to, salary_currency, requirements, requires_partner_courses)
SELECT 
  s.id,
  ARRAY['Лимфодренажный массаж', 'Антицеллюлитный массаж'],
  'Гибкий график, сменный',
  60000,
  100000,
  'RUB',
  'Приветствуются выпускники школ-партнеров Док Диалог',
  true
FROM salons s WHERE s.name = 'Салон красоты "Гармония"';

INSERT INTO salon_vacancies (salon_id, specializations, schedule, salary_from, salary_to, salary_currency, requirements, requires_partner_courses)
SELECT 
  s.id,
  ARRAY['Тайский массаж', 'SPA-процедуры'],
  'Частичная занятость, 3/2',
  50000,
  80000,
  'RUB',
  'Опыт работы от 1 года, сертификат специалиста',
  false
FROM salons s WHERE s.name = 'Салон красоты "Гармония"';
