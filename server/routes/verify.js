import { Router } from 'express';
import UserValidator from '../middlewares/validations/UserValidation';
import VerifyController from '../controllers/VerifyController';

const validateRouter = Router();

/**
 * Handles email verification url
 */
validateRouter.get('/verify', VerifyController.activateUser);

/**
 * Handles email verification url resend
 */
validateRouter.post('/verify', UserValidator.emailValidation, VerifyController.resendVerificationEmail);

export default validateRouter;
