import { Router } from 'express';
import UserController from '../controllers/UserController';
import isLoggedIn from '../middlewares/isLoggedIn';

const userRouter = Router();

userRouter.post('/testUser', UserController.createTestUser);

userRouter.get('/', isLoggedIn, UserController.getLoggedInUser);

userRouter.post('/login', UserController.login);

userRouter.get('/', isLoggedIn, UserController.getLoggedInUser);

export default userRouter;
