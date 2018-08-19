import { Router } from 'express';
import passport from '../auth/authStrategies';
import userValidator from '../middlewares/validations/UserValidation';
import AuthController from '../controllers/AuthController';
import VerifyController from '../controllers/VerifyController';

const authRouter = Router();

authRouter.post('/signup', userValidator.signupValidation, AuthController.signUpUser, VerifyController.verifyEmail);


authRouter.post('/login', userValidator.loginValidation, AuthController.login);


/**
 * Handles email verification url
 */
authRouter.get('/verify', VerifyController.activateUser);

/**
 * Handles email verification url resend
 */
authRouter.post('/verify', userValidator.emailValidation, VerifyController.resendVerificationEmail);

// passport mock route
authRouter.get('/mock', passport.authenticate('mock'));

authRouter.get('/google', passport.authenticate('google', {
  scope: [
    'profile', 'email',
  ],
}));

authRouter.get('/google/callback', (req, res, next) => {
  passport.authenticate('google', (err, user) => {
    AuthController.finishSocialLogin(err, user, res, 'Google');
  })(req, res, next);
});

authRouter.get('/facebook', passport.authenticate('facebook', {
  scope: ['email']
}));

authRouter.get('/facebook/callback', (req, res, next) => {
  passport.authenticate('facebook', (err, user) => {
    AuthController.finishSocialLogin(err, user, res, 'Facebook');
  })(req, res, next);
});

export default authRouter;
