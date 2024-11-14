import { Router } from 'express';
import { ticketRouter } from './api/ticket-routes.js';
import { userRouter } from './api/user-routes.js';

const router = Router();

router.use('/tickets', ticketRouter);
router.use('/users', userRouter);

export default router;
