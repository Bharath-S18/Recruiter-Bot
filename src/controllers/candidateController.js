import { query } from '../config/db.js';

export async function getAllCandidates(req, res) {
  try {
    const { rows } = await query('SELECT * FROM candidates ORDER BY id', []);
    res.json({ success: true, candidates: rows });
  } catch (err) {
    console.error('Error fetching candidates:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
}

export async function getCandidateById(req, res) {
  const { id } = req.params;
  try {
    const { rows } = await query('SELECT * FROM candidates WHERE id = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Candidate not found' });
    }
    res.json({ success: true, candidate: rows[0] });
  } catch (err) {
    console.error('Error fetching candidate:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
}
