import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Create a PostgreSQL connection pool using the Supabase connection string.
// Supabase requires SSL for direct Postgres connections from Node.js.
export const pool = new Pool({
  connectionString: process.env.SUPABASE_DB_URL,
  ssl: { rejectUnauthorized: false },
});

// Test the connection on startup
pool.query('SELECT NOW()')
  .then(() => console.log('✅ Database connected'))
  .catch((err) => console.error('❌ Database connection failed:', err.message));

// Export a helper to run parameterized queries easily
export async function query(text, params) {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('📊 Executed query', { text: text.substring(0, 80), duration, rows: res.rowCount });
  return res;
}