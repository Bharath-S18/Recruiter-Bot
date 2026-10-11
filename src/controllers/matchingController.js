import { query } from '../config/db.js';
import { rankCandidatesForJob, rankJobsForCandidate } from '../services/matchingService.js';

export async function getCandidateMatches(req, res) {
  const { id } = req.params;

  try {
    const candidateResult = await query('SELECT * FROM candidates WHERE id = $1', [id]);

    if (candidateResult.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Candidate not found' });
    }

    const jobsResult = await query('SELECT * FROM jobs ORDER BY id');
    const candidate = candidateResult.rows[0];
    const matches = rankJobsForCandidate(candidate, jobsResult.rows);

    return res.json({
      success: true,
      candidate,
      totalMatches: matches.length,
      matches,
    });
  } catch (error) {
    console.error('Error generating candidate matches:', error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
}

export async function getJobMatches(req, res) {
  const { id } = req.params;

  try {
    const jobResult = await query('SELECT * FROM jobs WHERE id = $1', [id]);

    if (jobResult.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Job not found' });
    }

    const candidatesResult = await query('SELECT * FROM candidates ORDER BY id');
    const job = jobResult.rows[0];
    const matches = rankCandidatesForJob(job, candidatesResult.rows);

    return res.json({
      success: true,
      job,
      totalMatches: matches.length,
      matches,
    });
  } catch (error) {
    console.error('Error generating job matches:', error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
}
