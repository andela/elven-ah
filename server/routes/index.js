
import { Router } from 'express';
import authRouter from './auth';
import profileRouter from './profile';
import articleRouter from './article';
import isLoggedIn from '../middlewares/isLoggedIn';
import userRouter from './users';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', isLoggedIn, profileRouter);
router.use('/users', userRouter);
router.use('/articles', articleRouter);

// Matches /api the API home route
router.get('/*', (req, res) => {
  res.status(200).send({
    url: `${req.protocol}://${req.headers.host}`,
    status: 'success',
    message: "Welcome to Author's Haven - A Social platform for the creative at heart."
  });
});

export default router;
