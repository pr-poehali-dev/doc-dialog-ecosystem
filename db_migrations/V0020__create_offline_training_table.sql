-- Create offline_training table
CREATE TABLE IF NOT EXISTS offline_training (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  school_name VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  event_date TIMESTAMP NOT NULL,
  location VARCHAR(255),
  max_participants INTEGER,
  price DECIMAL(10, 2),
  image_url TEXT,
  external_url TEXT NOT NULL,
  is_moderated BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  original_price DECIMAL(10, 2),
  discount_price DECIMAL(10, 2),
  author_name VARCHAR(255),
  author_photo TEXT,
  event_content TEXT
);

CREATE INDEX idx_offline_training_user ON offline_training(user_id);
CREATE INDEX idx_offline_training_moderated ON offline_training(is_moderated);
