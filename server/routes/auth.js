
import { Router } from 'express';
import userValidator from '../middlewares/validations/UserValidation';
import AuthController from '../controllers/AuthController';

const authRouter = Router();

// Auth routes will be added here
authRouter.post('/signup', userValidator.signupValidation, AuthController.signUpUser);

export default authRouter;
