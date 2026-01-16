CREATE TABLE IF NOT EXISTS t_p46047379_doc_dialog_ecosystem.landing_orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  course_name VARCHAR(500) NOT NULL,
  course_type VARCHAR(50) NOT NULL,
  description TEXT,
  target_audience TEXT,
  unique_selling_points TEXT,
  price VARCHAR(100),
  course_duration VARCHAR(200),
  what_students_get TEXT,
  program TEXT,
  author_name VARCHAR(300),
  author_bio TEXT,
  school_name VARCHAR(300),
  contact_email VARCHAR(200),
  contact_phone VARCHAR(100),
  external_form_url TEXT,
  additional_info TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_landing_orders_user_id ON t_p46047379_doc_dialog_ecosystem.landing_orders(user_id);
CREATE INDEX idx_landing_orders_status ON t_p46047379_doc_dialog_ecosystem.landing_orders(status);
CREATE INDEX idx_landing_orders_created_at ON t_p46047379_doc_dialog_ecosystem.landing_orders(created_at DESC);