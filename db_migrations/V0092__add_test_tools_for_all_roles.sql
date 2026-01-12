-- Добавляем тестовые инструменты для всех ролей
INSERT INTO t_p46047379_doc_dialog_ecosystem.tools (name, description, url, video_url, target_role, is_active, display_order)
VALUES 
  ('Телеграм-бот для салонов', 'Автоматизация записи клиентов через Telegram. Бот помогает принимать заявки 24/7 и управлять расписанием мастеров.', 'https://t.me/salon_booking_bot', 'https://kinescope.io/example-salon', 'salon', true, 0)
ON CONFLICT DO NOTHING;