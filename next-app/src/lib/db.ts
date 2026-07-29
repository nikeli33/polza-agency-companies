import { Pool } from 'pg';

let pool: Pool | null = null;

function getPool(): Pool {
  if (!pool) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error(
        'DATABASE_URL не задан. Скопируй .env.example → .env и укажи строку подключения.',
      );
    }
    pool = new Pool({ connectionString: url, max: 5 });
  }
  return pool;
}

export interface Company {
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

export interface CompaniesQuery {
  q?: string;
  city?: string;
  page?: number;
}

export interface CompaniesResult {
  rows: Company[];
  total: number;
}

export const COMPANIES_PAGE_SIZE = 50;

export async function fetchCompanies(filters: CompaniesQuery): Promise<CompaniesResult> {
  const pool = getPool();
  const conditions: string[] = [];
  const params: (string | number)[] = [];
  let paramIdx = 1;

  if (filters.q) {
    conditions.push(`name ILIKE $${paramIdx++}`);
    params.push(`%${filters.q}%`);
  }

  if (filters.city) {
    conditions.push(`city = $${paramIdx++}`);
    params.push(filters.city);
  }

  const whereClause = conditions.length > 0
    ? `WHERE ${conditions.join(' AND ')}`
    : '';

  const countResult = await pool.query(
    `SELECT COUNT(*) FROM companies ${whereClause}`,
    params,
  );
  const total = Number(countResult.rows[0].count);

  const page = Math.max(1, filters.page ?? 1);
  const offset = (page - 1) * COMPANIES_PAGE_SIZE;

  const dataSql = `SELECT * FROM companies ${whereClause} ORDER BY name LIMIT $${paramIdx++} OFFSET $${paramIdx++}`;
  const result = await pool.query(dataSql, [...params, COMPANIES_PAGE_SIZE, offset]);

  const rows = result.rows.map((r: Record<string, unknown>) => ({
    ...r,
    rating: r.rating != null ? Number(r.rating) : null,
    reviews_count: r.reviews_count != null ? Number(r.reviews_count) : null,
  })) as Company[];

  return { rows, total };
}

export async function fetchCities(): Promise<string[]> {
  const pool = getPool();
  const result = await pool.query(
    'SELECT DISTINCT city FROM companies WHERE city IS NOT NULL ORDER BY city',
  );
  return result.rows.map((r: { city: string }) => r.city);
}
