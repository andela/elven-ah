
import { Router } from 'express';
import authRouter from './auth';
import profileRouter from './profile';
import articleRouter from './article';
import userRouter from './users';
import followRouter from './follow';
import searchRouter from './search';
import payRouter from './pay';

const v1Router = Router();

v1Router.use('/auth', authRouter);
v1Router.use('/user', profileRouter);
v1Router.use('/users', userRouter);
v1Router.use('/search', searchRouter);
v1Router.use('/articles', articleRouter);
v1Router.use('/user', followRouter);
v1Router.use('/pay', payRouter);


// Matches /api the API home route
v1Router.get('/', (req, res) => {
  res.status(200).send({
    url: `${req.protocol}://${req.headers.host}`,
    status: 'success',
    message: "Authors' Haven API V1"
  });
});

export default v1Router;
