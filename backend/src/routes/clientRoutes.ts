import express from 'express';
import { getClients, createClient, updateClient } from '../controllers/clientController';
import { authenticateToken, requireRole } from '../middleware/authMiddleware';

const router = express.Router();

router.use(authenticateToken);

router.get('/', getClients);
router.post('/', requireRole('ADMIN'), createClient); // Only Admin can create clients initially? Or Supervisors too?
router.put('/:id', updateClient);

export default router;
