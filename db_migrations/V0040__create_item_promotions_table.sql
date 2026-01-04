CREATE TABLE IF NOT EXISTS item_promotions (
    id SERIAL PRIMARY KEY,
    item_id INTEGER NOT NULL,
    item_type VARCHAR(50) NOT NULL,
    school_id INTEGER NOT NULL,
    promotion_type VARCHAR(50) NOT NULL,
    category VARCHAR(255),
    price_paid NUMERIC(10, 2) NOT NULL,
    promoted_until TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_item_promotions_item ON item_promotions(item_id, item_type);
CREATE INDEX IF NOT EXISTS idx_item_promotions_active ON item_promotions(school_id, promoted_until);
CREATE INDEX IF NOT EXISTS idx_item_promotions_until ON item_promotions(promoted_until);