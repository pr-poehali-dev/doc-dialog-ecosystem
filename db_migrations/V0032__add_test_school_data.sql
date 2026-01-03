-- Добавление тестовой школы с полными данными
INSERT INTO t_p46047379_doc_dialog_ecosystem.schools (
  user_id, name, slug, short_description, description, logo_url, cover_url,
  city, address, phone, email, website,
  whatsapp, telegram, instagram,
  license_number, is_author_school, founded_year, students_count, teachers_count,
  mission, about_school, why_choose_us,
  cta_button_text, cta_button_url,
  seo_title, seo_description, rating, reviews_count,
  is_verified, learning_direction, format, created_at
) VALUES (
  2,
  'Московская школа профессионального массажа',
  'moskovskaya-shkola-professionalnogo-massazha',
  'Ведущая школа массажа в Москве с 15-летним опытом. Лицензированные программы обучения от классического до спортивного массажа.',
  'Московская школа профессионального массажа — это образовательное учреждение с многолетней историей и безупречной репутацией. Мы специализируемся на подготовке высококвалифицированных специалистов в области массажа и мануальной терапии.

Наша школа предлагает комплексные программы обучения, которые сочетают теоретические знания с обширной практикой. Каждый студент получает индивидуальный подход и возможность работать с реальными клиентами под руководством опытных наставников.

Мы гордимся нашими выпускниками, многие из которых стали признанными специалистами и открыли собственные практики по всей России и за рубежом.',
  'https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/d98fc794-b8da-4128-9c83-102c1f840e5a.jpg',
  'https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/b529057c-a15f-46b8-b69e-53cfc69b204b.jpg',
  'Москва',
  'г. Москва, ул. Тверская, д. 12, стр. 1',
  '+7 (495) 123-45-67',
  'info@massage-school.ru',
  'https://massage-school.ru',
  '+79161234567',
  '@massage_school_msk',
  '@massage.school.moscow',
  'Л035-01234-77/00123456',
  true,
  2010,
  2500,
  15,
  'Наша миссия — готовить профессиональных массажистов высочайшего уровня, которые будут помогать людям обретать здоровье и гармонию через целительную силу прикосновений.',
  'Московская школа профессионального массажа была основана в 2010 году группой энтузиастов — практикующих массажистов и преподавателей медицинских вузов. За 15 лет работы мы выпустили более 2500 специалистов и стали одной из ведущих школ в России.

Наша команда состоит из 15 высококвалифицированных преподавателей, каждый из которых имеет более 10 лет практического опыта. Мы постоянно обновляем учебные программы, внедряем современные методики и следим за мировыми тенденциями в массажной индустрии.',
  '• Лицензированные программы обучения
• 15 опытных преподавателей-практиков
• Современное оборудование и учебные классы
• Практика на реальных клиентах
• Помощь в трудоустройстве после выпуска
• Гибкий график обучения (дневные и вечерние группы)
• Официальные дипломы государственного образца
• Бесплатные мастер-классы для студентов',
  'Записаться на курс',
  'https://massage-school.ru/apply',
  'Московская школа массажа — профессиональное обучение массажу в Москве',
  'Лучшая школа массажа в Москве. Лицензированные программы обучения. 15 лет опыта. 2500+ выпускников. Дипломы гос. образца. Практика и трудоустройство.',
  4.9,
  127,
  true,
  'массаж',
  'hybrid',
  NOW()
);

-- Добавляем достижения школы
INSERT INTO t_p46047379_doc_dialog_ecosystem.school_achievements (school_id, title, description, icon_name, sort_order)
SELECT 
  id,
  unnest(ARRAY['2500+ выпускников', '15 лет опыта', 'Гос. лицензия', 'Трудоустройство 95%']),
  unnest(ARRAY[
    'Более 2500 специалистов прошли обучение в нашей школе',
    'С 2010 года готовим профессиональных массажистов',
    'Официальная образовательная лицензия и дипломы гос. образца',
    '95% наших выпускников находят работу в первый месяц после обучения'
  ]),
  unnest(ARRAY['Users', 'Award', 'Shield', 'Briefcase']),
  unnest(ARRAY[0, 1, 2, 3])
FROM t_p46047379_doc_dialog_ecosystem.schools 
WHERE slug = 'moskovskaya-shkola-professionalnogo-massazha';

-- Добавляем преподавателей
INSERT INTO t_p46047379_doc_dialog_ecosystem.school_teachers (school_id, name, position, bio, photo_url, experience_years, specialization, sort_order)
SELECT 
  id,
  unnest(ARRAY['Анна Петрова', 'Дмитрий Соколов', 'Елена Волкова']),
  unnest(ARRAY['Директор школы, преподаватель', 'Ведущий специалист по спортивному массажу', 'Преподаватель классического массажа']),
  unnest(ARRAY[
    'Мастер массажа высшей категории. Более 20 лет практического опыта. Автор методических пособий по массажу.',
    'Сертифицированный специалист по спортивному массажу. Работал с олимпийской сборной России.',
    'Кандидат медицинских наук. Специализация: классический и лечебный массаж. 15 лет преподавательского стажа.'
  ]),
  unnest(ARRAY[
    'https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/604d5706-2245-443c-8e99-1c20384c489e.jpg',
    'https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/604d5706-2245-443c-8e99-1c20384c489e.jpg',
    'https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/604d5706-2245-443c-8e99-1c20384c489e.jpg'
  ]),
  unnest(ARRAY[20, 15, 15]),
  unnest(ARRAY['Классический массаж, мануальная терапия', 'Спортивный массаж, реабилитация', 'Лечебный массаж, рефлексотерапия']),
  unnest(ARRAY[0, 1, 2])
FROM t_p46047379_doc_dialog_ecosystem.schools 
WHERE slug = 'moskovskaya-shkola-professionalnogo-massazha';

-- Добавляем фотографии в галерею
INSERT INTO t_p46047379_doc_dialog_ecosystem.school_gallery (school_id, image_url, caption, sort_order)
SELECT 
  id,
  unnest(ARRAY[
    'https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/b529057c-a15f-46b8-b69e-53cfc69b204b.jpg',
    'https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/604d5706-2245-443c-8e99-1c20384c489e.jpg'
  ]),
  unnest(ARRAY['Современный учебный класс', 'Практическое занятие']),
  unnest(ARRAY[0, 1])
FROM t_p46047379_doc_dialog_ecosystem.schools 
WHERE slug = 'moskovskaya-shkola-professionalnogo-massazha';

-- Добавляем отзывы
INSERT INTO t_p46047379_doc_dialog_ecosystem.school_reviews (school_id, author_name, author_photo_url, rating, review_text, course_name, is_verified, created_at)
SELECT 
  id,
  unnest(ARRAY['Мария Иванова', 'Алексей Смирнов', 'Ольга Кузнецова']),
  NULL,
  unnest(ARRAY[5, 5, 5]),
  unnest(ARRAY[
    'Отличная школа! Преподаватели — настоящие профессионалы своего дела. Получила диплом и сразу нашла работу в хорошем салоне. Спасибо!',
    'Прошёл курс спортивного массажа. Очень доволен! Много практики, современное оборудование, отличная атмосфера.',
    'Лучшая школа массажа в Москве. Рекомендую всем, кто хочет стать профессионалом в этой сфере.'
  ]),
  unnest(ARRAY['Курс классического массажа', 'Курс спортивного массажа', 'Базовый курс массажа']),
  true,
  unnest(ARRAY[NOW() - INTERVAL '30 days', NOW() - INTERVAL '20 days', NOW() - INTERVAL '10 days'])
FROM t_p46047379_doc_dialog_ecosystem.schools 
WHERE slug = 'moskovskaya-shkola-professionalnogo-massazha';
