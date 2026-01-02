-- Таблица типов пользователей
CREATE TYPE user_role AS ENUM ('masseur', 'school', 'salon', 'admin');

-- Таблица пользователей
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица профилей массажистов
CREATE TABLE masseur_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES users(id),
    full_name VARCHAR(255),
    phone VARCHAR(50),
    city VARCHAR(100),
    experience_years INTEGER,
    specializations TEXT[],
    about TEXT,
    avatar_url TEXT,
    subscription_type VARCHAR(50) DEFAULT 'free',
    subscription_expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица школ
CREATE TABLE schools (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    logo_url TEXT,
    website VARCHAR(255),
    phone VARCHAR(50),
    email VARCHAR(255),
    city VARCHAR(100),
    address TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    subscription_type VARCHAR(50) DEFAULT 'free',
    subscription_expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица салонов
CREATE TABLE salons (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    logo_url TEXT,
    website VARCHAR(255),
    phone VARCHAR(50),
    email VARCHAR(255),
    city VARCHAR(100),
    address TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    subscription_type VARCHAR(50) DEFAULT 'free',
    subscription_expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица курсов
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    school_id INTEGER REFERENCES schools(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2),
    is_free BOOLEAN DEFAULT FALSE,
    duration_hours INTEGER,
    cover_url TEXT,
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица вакансий
CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    salon_id INTEGER REFERENCES salons(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    salary_from DECIMAL(10, 2),
    salary_to DECIMAL(10, 2),
    city VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для быстрого поиска
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_schools_city ON schools(city);
CREATE INDEX idx_salons_city ON salons(city);
CREATE INDEX idx_courses_school ON courses(school_id);
CREATE INDEX idx_jobs_salon ON jobs(salon_id);
CREATE INDEX idx_jobs_city ON jobs(city);