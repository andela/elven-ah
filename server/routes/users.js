import { Router } from 'express';
import UserController from '../controllers/UserController';
import isLoggedIn from '../middlewares/isLoggedIn';
import PasswordResetController from '../controllers/PasswordResetController';
import UserValidation from '../middlewares/validations/UserValidation';
import checkToken from '../middlewares/checkToken';

const userRouter = Router();

// Just to test the database connection
userRouter.post('/testUser', UserController.createTestUser);

userRouter.post('/', UserController.signup);

userRouter.get('/', isLoggedIn, UserController.getLoggedInUser);

userRouter.put('/', UserController.updateUser);

userRouter.post('/login', UserController.login);


// Password reset
userRouter.post('/account/password/reset',
  UserValidation.passwordResetValidation,
  PasswordResetController.sendResetEmail);

userRouter.get('/account/password/reset', checkToken,
  PasswordResetController.verifyPasswordResetToken);

userRouter.put('/account/password/reset', checkToken,
  UserValidation.newPasswordValidation,
  PasswordResetController.updateUserPassword);

export default userRouter;
