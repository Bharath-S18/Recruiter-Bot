import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const pool = new Pool({
  connectionString: process.env.SUPABASE_DB_URL,
  ssl: { rejectUnauthorized: false },
});

async function runSqlFile(filePath) {
  const sql = await fs.readFile(filePath, 'utf8');
  await pool.query(sql);
  console.log(`Executed: ${path.relative(projectRoot, filePath)}`);
}

async function main() {
  try {
    await runSqlFile(path.join(projectRoot, 'sql', 'schema.sql'));
    await runSqlFile(path.join(projectRoot, 'sql', 'seed.sql'));

    const candidateCount = await pool.query('SELECT COUNT(*) AS total FROM candidates');
    const jobCount = await pool.query('SELECT COUNT(*) AS total FROM jobs');

    console.log(`Candidates seeded: ${candidateCount.rows[0].total}`);
    console.log(`Jobs seeded: ${jobCount.rows[0].total}`);
  } catch (err) {
    console.error('Database initialization failed:');
    console.error(err);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

main();
