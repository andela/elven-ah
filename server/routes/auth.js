
import { Router } from 'express';
import userValidator from '../middlewares/validations/UserValidation';
import AuthController from '../controllers/AuthController';

const authRouter = Router();

// Auth routes will be added here
authRouter.post('/signup', userValidator.signupValidation, AuthController.signUpUser, AuthController.verifyEmail);

/**
 * Handles email verification url
 */
authRouter.get('/verify', AuthController.activateUser);

/**
 * Handles email verification url resend
 */
authRouter.post('/verify', userValidator.emailValidation, AuthController.resendVerificationEmail);

export default authRouter;
