import { Router } from 'express';
import UsersController from '../controllers/UsersController';

const userRouter = Router();

// Just to test the database connection
userRouter.post('/testUser', UsersController.createTestUser);

userRouter.post('/', UsersController.signup);

userRouter.get('/', UsersController.FindUserById);

userRouter.put('/', UsersController.updateUser);

userRouter.post('/login', UsersController.login);

export default userRouter;
