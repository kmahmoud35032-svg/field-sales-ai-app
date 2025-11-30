import express from 'express';
import { recordVisit, getVisits } from '../controllers/visitController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.use(authenticateToken);

router.post('/', recordVisit);
router.get('/', getVisits);

export default router;
