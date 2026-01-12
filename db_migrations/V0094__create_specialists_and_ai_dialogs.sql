-- Таблица специалистов (расширение данных массажистов)
CREATE TABLE IF NOT EXISTS specialists (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    masseur_profile_id INTEGER REFERENCES masseur_profiles(id),
    subscription_tier VARCHAR(50) DEFAULT 'free', -- free, basic, premium
    ai_dialogs_limit INTEGER DEFAULT 3, -- лимит диалогов в месяц
    ai_dialogs_used INTEGER DEFAULT 0, -- использовано за месяц
    last_reset_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица AI диалогов
CREATE TABLE IF NOT EXISTS ai_dialogs (
    id SERIAL PRIMARY KEY,
    specialist_id INTEGER NOT NULL REFERENCES specialists(id),
    title VARCHAR(255) DEFAULT 'Новый диалог',
    dialog_type VARCHAR(100) DEFAULT 'supervision', -- supervision, case_analysis, boundaries, burnout, growth
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица сообщений в диалогах
CREATE TABLE IF NOT EXISTS ai_dialog_messages (
    id SERIAL PRIMARY KEY,
    dialog_id INTEGER NOT NULL REFERENCES ai_dialogs(id),
    role VARCHAR(20) NOT NULL, -- user, assistant
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для производительности
CREATE INDEX IF NOT EXISTS idx_specialists_user_id ON specialists(user_id);
CREATE INDEX IF NOT EXISTS idx_specialists_masseur_profile_id ON specialists(masseur_profile_id);
CREATE INDEX IF NOT EXISTS idx_ai_dialogs_specialist_id ON ai_dialogs(specialist_id);
CREATE INDEX IF NOT EXISTS idx_ai_dialog_messages_dialog_id ON ai_dialog_messages(dialog_id);
CREATE INDEX IF NOT EXISTS idx_ai_dialogs_created_at ON ai_dialogs(created_at DESC);