-- Обновляем тестовую школу с полными данными
UPDATE schools 
SET 
  name = 'Академия массажа "Золотые руки"',
  description = 'Ведущая школа массажа с опытом более 15 лет',
  short_description = 'Профессиональное обучение массажу',
  logo_url = 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200',
  cover_url = 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1200',
  website = 'https://golden-hands-academy.ru',
  phone = '+7 (495) 789-12-34',
  email = 'info@golden-hands.ru',
  is_verified = true,
  slug = 'golden-hands-academy',
  founded_year = 2010,
  students_count = 2500,
  teachers_count = 15,
  rating = 4.80,
  reviews_count = 127
WHERE id = 1;
