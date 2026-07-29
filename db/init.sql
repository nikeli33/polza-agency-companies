-- ============================================================
-- Инициализация базы при первом запуске контейнера
-- ============================================================

CREATE TABLE IF NOT EXISTS companies (
    id            VARCHAR(20)   PRIMARY KEY,
    name          VARCHAR(255)  NOT NULL,
    category      VARCHAR(100),
    city          VARCHAR(100),
    address       TEXT,
    rating        DECIMAL(2,1),
    reviews_count INTEGER       DEFAULT 0,
    site          VARCHAR(500),
    phone         VARCHAR(50)
);

CREATE INDEX IF NOT EXISTS idx_companies_city     ON companies(city);
CREATE INDEX IF NOT EXISTS idx_companies_category ON companies(category);
CREATE INDEX IF NOT EXISTS idx_companies_name     ON companies(name);
