import { Router } from 'express';
import userRouter from './users';
import authRouter from './auth';
import profileRouter from './profile';
import verifyRouter from './verify.js';
import articleRouter from './article.js';

const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/user', profileRouter);
router.use('/auth', verifyRouter);
router.use(articleRouter);

export default router;
