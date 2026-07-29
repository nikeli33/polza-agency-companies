// Запускается контейнером приложения при старте (см. next-app/docker-entrypoint.sh).
// Если таблица companies пуста или ещё не создана — выполняет полную загрузку
// из data_pack. Если уже заполнена — ничего не делает (идемпотентно, безопасно
// гонять при каждом рестарте контейнера, в отличие от load_data.ts, который
// всегда TRUNCATE + перезаливает).
import pg from 'pg';

const DB_URL = process.env.DATABASE_URL
  || 'postgresql://user:password@localhost:5432/companies';

async function isEmpty() {
  const pool = new pg.Pool({ connectionString: DB_URL });
  try {
    const { rows } = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables WHERE table_name = 'companies'
      ) AS table_exists
    `);
    if (!rows[0].table_exists) return true;
    const { rows: countRows } = await pool.query('SELECT COUNT(*)::int AS count FROM companies');
    return countRows[0].count === 0;
  } finally {
    await pool.end();
  }
}

const empty = await isEmpty();
if (empty) {
  console.log('🌱 companies пуста — запускаю первичную загрузку из data_pack...');
  await import('./load_data.ts');
} else {
  console.log('✅ companies уже заполнена — автозагрузка пропущена.');
}
