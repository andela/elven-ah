import { Router } from 'express';
import UserController from '../controllers/UserController';
import isLoggedIn from '../middlewares/isLoggedIn';
import PasswordResetController from '../controllers/PasswordResetController';
import UserValidation from '../middlewares/validations/UserValidation';

const userRouter = Router();

userRouter.get('/', isLoggedIn, UserController.getLoggedInUser);

userRouter.get('/', isLoggedIn, UserController.getLoggedInUser);


// Password reset
userRouter.post('/account/password/reset',
  UserValidation.passwordResetValidation,
  PasswordResetController.sendResetEmail);


export default userRouter;
