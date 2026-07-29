import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'csv-parse/sync';
import pg from 'pg';
import format from 'pg-format';
import iconv from 'iconv-lite';

// ─── Paths ───────────────────────────────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_DIR = join(__dirname, '..', 'data_pack');

const DB_URL = process.env.DATABASE_URL
  || 'postgresql://user:password@localhost:5432/companies';

// ─── Known reference sets ────────────────────────────────────────────────────
const KNOWN_CATEGORIES = new Set([
  'Автосервис', 'Бухгалтерские услуги', 'Ветеринарная клиника', 'IT-интегратор',
  'Клининг', 'Кофейня', 'Логистика', 'Медицинский центр', 'Образовательный центр',
  'Оптовая торговля', 'Охранное предприятие', 'Пекарня', 'Производство мебели',
  'Ресторан', 'Рекламное агентство', 'Риэлторское агентство', 'Салон красоты',
  'Стоматология', 'Строительная компания', 'Типография', 'Фитнес-клуб',
  'Юридические услуги',
]);

// Города, обнаруженные в JSON (эталон)
const KNOWN_CITIES = new Set([
  'Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань',
  'Нижний Новгород', 'Челябинск', 'Краснодар', 'Самара', 'Уфа', 'Ростов-на-Дону',
  'Омск', 'Воронеж', 'Пермь', 'Волгоград', 'Тюмень', 'Сочи', 'Калуга', 'Тула',
  'Ярославль',
]);

// Карта нормализации городов
const CITY_NORMALIZATION: Record<string, string> = {
  'москва': 'Москва',
  'moscow': 'Москва',
  'санкат-петербург': 'Санкт-Петербург',
  'санкт-петербург': 'Санкт-Петербург',
};

// ─── Types ────────────────────────────────────────────────────────────────────
interface Company {
  id: string;
  name: string;
  category: string | null;
  city: string | null;
  address: string | null;
  rating: number | null;
  reviews_count: number | null;
  site: string | null;
  phone: string | null;
}

interface AnomalyLog {
  record_id: string;
  field: string;
  issue: string;
  original_value: string;
  action: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function mojibakeScore(text: string): number {
  // Признак mojibake: подряд идущие символы 'Р' (U+0420) + символ нижней
  // кириллицы (U+0450-U+04FF) — характерный паттерн UTF-8→CP1251
  let score = 0;
  for (let i = 0; i < text.length - 1; i++) {
    const ch = text.charCodeAt(i);
    const next = text.charCodeAt(i + 1);
    if ((ch === 0x0420 || ch === 0x0440) && next >= 0x0450 && next <= 0x04FF) {
      score++;
    }
  }
  return score;
}

function fixMojibake(text: string): string {
  if (mojibakeScore(text) >= 2) {
    try {
      // Кодируем как CP1251 (восстанавливаем оригинальные байты)
      const buf = iconv.encode(text, 'win1251');
      // Декодируем как UTF-8
      const fixed = iconv.decode(buf, 'utf-8');
      // Валидация: результат должен содержать кириллицу и больше не совпадать
      // с паттерном mojibake. Сравнивать абсолютное число букв с оригиналом
      // нельзя — пунктуация (кавычки-«лапки» и т.п.) в битой строке сама
      // состоит из нескольких кириллических символов и завышает счётчик.
      const fixedNormal = (fixed.match(/[А-Яа-яЁё]/g) || []).length;
      if (fixedNormal > 0 && mojibakeScore(fixed) === 0) return fixed;
    } catch { /* не удалось — возвращаем оригинал */ }
  }
  return text;
}

function tryParseRating(val: string): number | null {
  if (!val || val.trim() === '') return null;
  const s = val.trim().replace(',', '.');
  const n = Number(s);
  if (Number.isNaN(n)) return null;
  if (n < 0 || n > 5) return null;
  return Math.round(n * 10) / 10; // одно десятичное место
}

function tryParseReviewsCount(val: string): number | null {
  if (!val || val.trim() === '') return null;
  const s = val.trim();
  const n = Number(s);
  if (Number.isNaN(n)) return null;
  if (!Number.isInteger(n) || n < 0) return null;
  return n;
}

function normalizeCity(raw: string): string {
  let s = raw.trim();
  if (!s) return raw;
  const lower = s.toLowerCase();
  if (CITY_NORMALIZATION[lower]) return CITY_NORMALIZATION[lower];
  // Capitalize first letter
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function isEmptyRow(row: Record<string, string>): boolean {
  return Object.values(row).every(v => !v || v.trim() === '');
}

function emptyToNull(val: string | null): string | null {
  if (val === null || val === undefined) return null;
  const s = val.trim();
  return s.length === 0 ? null : s;
}

// ─── Main ETL ─────────────────────────────────────────────────────────────────
async function main() {
  const anomalies: AnomalyLog[] = [];
  const companiesMap = new Map<string, Company>();

  // 1. Читаем JSON-файлы ──────────────────────────────────────────────────────
  console.log('📂 Чтение JSON-файлов...');
  const jsonFiles = readdirSync(DATA_DIR)
    .filter(f => f.startsWith('page_') && f.endsWith('.json'))
    .sort();

  for (const file of jsonFiles) {
    const data = JSON.parse(readFileSync(join(DATA_DIR, file), 'utf-8')) as {
      page: number; items: Company[];
    };
    for (const item of data.items) {
      companiesMap.set(item.id, item);
    }
  }
  console.log(`   Загружено ${companiesMap.size} записей из JSON`);

  // 2. Читаем CSV ──────────────────────────────────────────────────────────────
  console.log('📂 Чтение review.csv...');
  const csvRaw = readFileSync(join(DATA_DIR, 'review.csv'), 'utf-8');
  const csvRows = parse(csvRaw, {
    columns: true,
    skip_empty_lines: false,
    relax_column_count: true,
    bom: true,
  }) as Record<string, string>[];

  console.log(`   Всего строк в CSV: ${csvRows.length}`);

  let loadedCount = 0;
  let emptyCount = 0;
  let dedupCount = 0;

  for (const row of csvRows) {
    // Пропускаем полностью пустые строки
    if (isEmptyRow(row)) {
      emptyCount++;
      anomalies.push({
        record_id: '(пустая строка)',
        field: 'all',
        issue: 'Полностью пустая строка',
        original_value: JSON.stringify(row),
        action: 'Пропущена',
      });
      continue;
    }

    const rawId = row['id']?.trim() || '';
    if (!rawId) {
      emptyCount++;
      anomalies.push({
        record_id: '(нет id)',
        field: 'id',
        issue: 'Запись без id',
        original_value: JSON.stringify(row),
        action: 'Пропущена',
      });
      continue;
    }
    loadedCount++;

    // 2a. Определяем, есть ли сдвиг колонок
    let categoryVal = emptyToNull(row['category']);
    if (categoryVal && !KNOWN_CATEGORIES.has(categoryVal) && KNOWN_CITIES.has(categoryVal)) {
      // Сдвиг колонок: category содержит название города
      anomalies.push({
        record_id: rawId,
        field: 'category',
        issue: 'Сдвиг колонок: category содержит название города',
        original_value: categoryVal,
        action: 'Корректировка: city ← category, address ← city',
      });
      // Пытаемся восстановить: city берём из category, address из city
      const shiftedCity = categoryVal;
      const shiftedAddress = emptyToNull(row['city']);
      categoryVal = null; // категория потеряна
      row['city'] = shiftedCity;
      row['address'] = shiftedAddress || '';
    }

    // 2b. Mojibake-фикс
    const nameFixed = fixMojibake(row['name'] || '');
    const cityFixed = fixMojibake(row['city'] || '');

    if (nameFixed !== row['name']) {
      anomalies.push({
        record_id: rawId,
        field: 'name',
        issue: 'Mojibake (битая кодировка)',
        original_value: row['name'],
        action: `Исправлено → ${nameFixed}`,
      });
    }
    if (cityFixed !== row['city']) {
      anomalies.push({
        record_id: rawId,
        field: 'city',
        issue: 'Mojibake (битая кодировка)',
        original_value: row['city'],
        action: `Исправлено → ${cityFixed}`,
      });
    }

    // 2c. Нормализация города
    const cityNormalized = normalizeCity(cityFixed || row['city'] || '');
    if (cityNormalized !== (row['city'] || '').trim()) {
      anomalies.push({
        record_id: rawId,
        field: 'city',
        issue: 'Вариант написания города',
        original_value: row['city'],
        action: `Нормализовано → ${cityNormalized}`,
      });
    }

    // 2d. Рейтинг
    const ratingParsed = tryParseRating(row['rating']);
    if (ratingParsed === null && emptyToNull(row['rating']) !== null) {
      anomalies.push({
        record_id: rawId,
        field: 'rating',
        issue: 'Невалидное значение рейтинга',
        original_value: row['rating'],
        action: 'Установлено в NULL',
      });
    }

    // 2e. Число отзывов
    const reviewsParsed = tryParseReviewsCount(row['reviews_count']);
    if (reviewsParsed === null && emptyToNull(row['reviews_count']) !== null) {
      anomalies.push({
        record_id: rawId,
        field: 'reviews_count',
        issue: 'Невалидное значение числа отзывов',
        original_value: row['reviews_count'],
        action: 'Установлено в NULL',
      });
    }

    // 2f. Сайт: пустая строка → null; текстовые заглушки → null
    let siteVal = emptyToNull(row['site']);
    if (siteVal) {
      const siteLower = siteVal.toLowerCase().trim();
      // 'нет сайта', 'нет', 'none', 'n/a' — явные заглушки
      if (/^(нет\s*сайта|нет|none|n\/a)$/i.test(siteLower)) {
        anomalies.push({
          record_id: rawId,
          field: 'site',
          issue: 'Текстовая заглушка вместо URL',
          original_value: siteVal,
          action: 'Установлено в NULL',
        });
        siteVal = null;
      } else if (!siteVal.startsWith('http://') && !siteVal.startsWith('https://')) {
        // Невалидный URL (без протокола)
        anomalies.push({
          record_id: rawId,
          field: 'site',
          issue: 'Невалидный URL (без протокола)',
          original_value: siteVal,
          action: 'Установлено в NULL',
        });
        siteVal = null;
      } else if (siteVal === 'https://shared-site.ru') {
        // Одинаковый сайт у нескольких разных компаний — подозрительно
        anomalies.push({
          record_id: rawId,
          field: 'site',
          issue: 'Подозрительный site: одинаковый URL у разных компаний',
          original_value: siteVal,
          action: 'Оставлен как есть, отмечено в ANOMALIES',
        });
      }
    }

    // 2g. Телефон: базовая валидация
    let phoneVal = emptyToNull(row['phone']);
    if (phoneVal) {
      // Убираем всё кроме цифр; российский номер должен быть +7XXXXXXXXXX (11 цифр)
      const digits = phoneVal.replace(/\D/g, '');
      if (!/^7\d{10}$/.test(digits)) {
        anomalies.push({
          record_id: rawId,
          field: 'phone',
          issue: 'Невалидный номер телефона',
          original_value: phoneVal,
          action: 'Установлено в NULL',
        });
        phoneVal = null;
      }
    }

    // Собираем компанию
    const company: Company = {
      id: rawId,
      name: nameFixed || row['name'] || '',
      category: KNOWN_CATEGORIES.has(categoryVal || '') ? categoryVal : null,
      city: cityNormalized || null,
      address: emptyToNull(row['address']),
      rating: ratingParsed,
      reviews_count: reviewsParsed,
      site: siteVal,
      phone: phoneVal,
    };

    // Дедупликация: CSV имеет приоритет (последняя запись побеждает)
    if (companiesMap.has(rawId)) {
      dedupCount++;
      anomalies.push({
        record_id: rawId,
        field: 'id',
        issue: 'Дубликат id (уже есть из JSON/предыдущей строки CSV)',
        original_value: rawId,
        action: 'Перезаписано новыми данными',
      });
    }
    companiesMap.set(rawId, company);
  }

  console.log(`   Загружено из CSV: ${loadedCount}`);
  console.log(`   Пустых строк пропущено: ${emptyCount}`);
  console.log(`   Дубликатов перезаписано: ${dedupCount}`);

  // 3. Подключение к БД и загрузка ─────────────────────────────────────────
  console.log('\n🗄️  Подключение к PostgreSQL...');
  const pool = new pg.Pool({ connectionString: DB_URL });

  try {
    // Проверка соединения
    const client = await pool.connect();
    await client.query('SELECT 1');
    client.release();
    console.log('   Соединение установлено');

    // Очищаем таблицу перед загрузкой
    await pool.query('TRUNCATE TABLE companies');
    console.log('   Таблица companies очищена');

    // Bulk insert через многорядный INSERT (pg-format для экранирования)
    const companies = Array.from(companiesMap.values());
    const BATCH_SIZE = 100;
    let inserted = 0;

    for (let i = 0; i < companies.length; i += BATCH_SIZE) {
      const batch = companies.slice(i, i + BATCH_SIZE);
      const rows = batch.map(c => [
        c.id, c.name, c.category, c.city, c.address,
        c.rating, c.reviews_count, c.site, c.phone,
      ]);

      const query = format(
        'INSERT INTO companies (id, name, category, city, address, rating, reviews_count, site, phone) VALUES %L',
        rows,
      );
      await pool.query(query);
      inserted += batch.length;
      process.stdout.write(`\r   Загружено: ${inserted}/${companies.length}`);
    }
    console.log('\n   ✅ Загрузка завершена!');

    // 4. Вывод статистики ───────────────────────────────────────────────────
    const stats = await pool.query(`
      SELECT
        COUNT(*)                                                  AS total,
        COUNT(*) FILTER (WHERE rating IS NOT NULL)                AS with_rating,
        COUNT(*) FILTER (WHERE site IS NOT NULL)                  AS with_site,
        COUNT(*) FILTER (WHERE phone IS NOT NULL)                 AS with_phone,
        COUNT(DISTINCT city)                                      AS unique_cities,
        COUNT(DISTINCT category)                                  AS unique_categories,
        (SELECT ROUND(AVG(rating)::numeric, 2)
         FROM companies
         WHERE rating IS NOT NULL)                                AS avg_rating,
        COALESCE(SUM(reviews_count), 0)                           AS total_reviews
      FROM companies
    `);
    console.log('\n📊 Статистика базы:');
    console.table(stats.rows[0]);

  } finally {
    await pool.end();
  }

  // 5. Вывод найденных аномалий ────────────────────────────────────────────
  console.log('\n⚠️  Найденные аномалии:');
  console.log(`   Всего: ${anomalies.length}\n`);
  for (const a of anomalies) {
    console.log(`   [${a.record_id}] ${a.field}: ${a.issue}`);
    console.log(`     Было: "${a.original_value}"`);
    console.log(`     Действие: ${a.action}`);
    console.log();
  }

  console.log('✅ ETL завершён!');
}

main().catch(err => {
  console.error('❌ Ошибка ETL:', err);
  process.exit(1);
});
