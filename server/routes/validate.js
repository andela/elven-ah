import {
  Router
} from 'express';
import UserValidator from '../middlewares/validations/UserValidation';
import ValidateController from '../controllers/ValidateController';

const validateRouter = Router();

/**
 * Handles email verification url
 */
validateRouter.get('/verify', ValidateController.activateUser);

/**
 * Handles email verification url resend
 */
validateRouter.post('/verify', UserValidator.emailValidation, ValidateController.resendVerificationEmail);

export default validateRouter;
