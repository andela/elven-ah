import { Router } from 'express';
import userRouter from './users';
import authRouter from './auth';
import profileRouter from './profile';

const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/user', profileRouter);

export default router;
