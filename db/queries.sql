-- ============================================================
-- Аналитические запросы к таблице companies
-- ============================================================

-- 1. Топ-5 категорий по числу компаний
--    Выводит категории с наибольшим количеством компаний
SELECT category,
       COUNT(*) AS company_count
FROM companies
WHERE category IS NOT NULL
GROUP BY category
ORDER BY company_count DESC
LIMIT 5;

-- 2. Средний рейтинг по городам среди компаний с 10+ отзывами
--    Учитываются только компании, у которых есть рейтинг
SELECT city,
       ROUND(AVG(rating)::numeric, 2) AS avg_rating,
       COUNT(*)                       AS company_count
FROM companies
WHERE rating IS NOT NULL
  AND reviews_count >= 10
GROUP BY city
ORDER BY avg_rating DESC;

-- 3. Доля компаний с сайтом по категориям
--    Процент компаний, указавших сайт, от общего числа в категории
SELECT category,
       COUNT(*)                                                              AS total,
       COUNT(*) FILTER (WHERE site IS NOT NULL)                              AS with_site,
       ROUND(100.0 * COUNT(*) FILTER (WHERE site IS NOT NULL) / COUNT(*), 1) AS pct_with_site
FROM companies
WHERE category IS NOT NULL
GROUP BY category
ORDER BY pct_with_site DESC;
