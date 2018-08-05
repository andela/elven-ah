import { Router } from 'express';
import authRouter from './auth';
import profileRouter from './profile';
import verifyRouter from './verify.js';
import userRouter from './users';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', profileRouter);
router.use('/users', userRouter);
router.use('/auth', verifyRouter);


// Matches /api the API home route
router.get('/*', (req, res) => {
  res.status(200).send({
    url: `${req.protocol}://${req.headers.host}`,
    status: 'success',
    message: "Welcome to Author's Haven - A Social platform for the creative at heart."
  });
});

export default router;
