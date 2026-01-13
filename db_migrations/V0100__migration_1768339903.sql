CREATE TABLE imported_specialists (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    specialization VARCHAR(255) NOT NULL,
    experience VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    photo_url TEXT,
    location VARCHAR(255),
    phone VARCHAR(50),
    email VARCHAR(255),
    price VARCHAR(100),
    schedule TEXT,
    rating DECIMAL(2,1),
    reviews_count INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);