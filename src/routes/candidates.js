import express from 'express';
import { getAllCandidates, getCandidateById } from '../controllers/candidateController.js';
import { getCandidateMatches } from '../controllers/matchingController.js';

const router = express.Router();

router.get('/', getAllCandidates);
router.get('/:id/matches', getCandidateMatches);
router.get('/:id', getCandidateById);

export default router;