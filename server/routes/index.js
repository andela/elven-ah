import {
  Router
} from 'express';
import userRouter from './users';
import authRouter from './auth';
import profileRouter from './profile';
import verifyRouter from './verify.js';

const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/user', profileRouter);
router.use('/auth', verifyRouter);

export default router;
