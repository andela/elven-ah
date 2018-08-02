import {
  Router
} from 'express';
import userRouter from './users';
import authRouter from './auth';
import profileRouter from './profile';
import validateRouter from './validate.js';

const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/user', profileRouter);
router.use('/auth', validateRouter);

export default router;
