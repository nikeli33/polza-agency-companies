-- ============================================================
-- Schema для таблицы companies
-- Загрузка данных из JSON (page_*.json) + review.csv
-- ============================================================

-- Удаляем если существует (для идемпотентности)
DROP TABLE IF EXISTS companies CASCADE;

CREATE TABLE companies (
    id            VARCHAR(20)   PRIMARY KEY,        -- c_000001 … c_001xxx
    name          VARCHAR(255)  NOT NULL,            -- Название компании
    category      VARCHAR(100),                      -- Категория (Типография, IT-интегратор …)
    city          VARCHAR(100),                      -- Город (нормализованный)
    address       TEXT,                              -- Адрес
    rating        DECIMAL(2,1),                      -- Рейтинг 1.0–5.0, NULL если нет
    reviews_count INTEGER       DEFAULT 0,           -- Число отзывов, 0 если нет
    site          VARCHAR(500),                      -- Сайт компании, NULL если нет
    phone         VARCHAR(50)                        -- Телефон, NULL если нет
);

-- Индексы для основных фильтров и GROUP BY
CREATE INDEX idx_companies_city     ON companies(city);
CREATE INDEX idx_companies_category ON companies(category);
CREATE INDEX idx_companies_name     ON companies(name);
