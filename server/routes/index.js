import { Router } from 'express';
import authRouter from './auth';
import profileRouter from './profile';
import verifyRouter from './verify.js';
import articleRouter from './article.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', profileRouter);
router.use('/auth', verifyRouter);
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
