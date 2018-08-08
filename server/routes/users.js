import { Router } from 'express';
import UserController from '../controllers/UserController';
import isLoggedIn from '../middlewares/isLoggedIn';

const userRouter = Router();

userRouter.get('/', isLoggedIn, UserController.getLoggedInUser);

export default userRouter;
