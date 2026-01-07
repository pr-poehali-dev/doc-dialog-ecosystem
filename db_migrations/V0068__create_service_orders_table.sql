CREATE TABLE IF NOT EXISTS t_p46047379_doc_dialog_ecosystem.service_orders (
  id SERIAL PRIMARY KEY,
  client_id INTEGER NOT NULL,
  masseur_id INTEGER NOT NULL,
  service_name TEXT NOT NULL,
  service_description TEXT,
  duration TEXT,
  price TEXT,
  status TEXT DEFAULT 'pending',
  message TEXT,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_service_orders_client_id ON t_p46047379_doc_dialog_ecosystem.service_orders(client_id);
CREATE INDEX idx_service_orders_masseur_id ON t_p46047379_doc_dialog_ecosystem.service_orders(masseur_id);
CREATE INDEX idx_service_orders_status ON t_p46047379_doc_dialog_ecosystem.service_orders(status);
