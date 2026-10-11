import express from 'express';
import { getAllJobs, getJobById } from '../controllers/jobController.js';
import { getJobMatches } from '../controllers/matchingController.js';

const router = express.Router();

router.get('/', getAllJobs);
router.get('/:id/matches', getJobMatches);
router.get('/:id', getJobById);

export default router;