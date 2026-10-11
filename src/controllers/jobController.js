import { query } from '../config/db.js';

export async function getAllJobs(req, res) {
  try {
    const { rows } = await query('SELECT * FROM jobs ORDER BY id', []);
    res.json({ success: true, jobs: rows });
  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
}

export async function getJobById(req, res) {
  const { id } = req.params;
  try {
    const { rows } = await query('SELECT * FROM jobs WHERE id = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Job not found' });
    }
    res.json({ success: true, job: rows[0] });
  } catch (err) {
    console.error('Error fetching job:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
}
