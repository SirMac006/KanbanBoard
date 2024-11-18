import { Router } from 'express';
import { ticketRouter } from './api/ticket-routes.js';
import { userRouter } from './api/user-routes.js';

const router = Router();

router.use('/tickets', ticketRouter);
router.use('/users', userRouter);

export default router;
/*
import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/api', authenticateToken, apiRoutes);

export default router;
*/