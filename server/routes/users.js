import { Router } from 'express';
import PasswordResetController from '../controllers/PasswordResetController';
import UserValidation from '../middlewares/validations/UserValidation';
import checkToken from '../middlewares/checkToken';

const userRouter = Router();

userRouter.post(
  '/account/password/reset',
  UserValidation.passwordResetValidation,
  PasswordResetController.sendResetEmail
);

userRouter.get(
  '/account/password/reset', checkToken,
  PasswordResetController.verifyPasswordResetToken
);

userRouter.put(
  '/account/password/reset', checkToken,
  UserValidation.newPasswordValidation,
  PasswordResetController.updateUserPassword
);

export default userRouter;
