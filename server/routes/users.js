import { Router } from 'express';
import UserController from '../controllers/UserController';
import isLoggedIn from '../middlewares/isLoggedIn';

const userRouter = Router();

// Just to test the database connection
userRouter.post('/testUser', UserController.createTestUser);

userRouter.post('/', UserController.signup);

userRouter.get('/', isLoggedIn, UserController.getLoggedInUser);

userRouter.put('/', UserController.updateUser);

userRouter.post('/login', UserController.login);

export default userRouter;
