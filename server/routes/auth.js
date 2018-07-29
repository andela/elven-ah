
import { Router } from 'express';
import userValidator from '../middlewares/validations/UserValidation';
import AuthController from '../controllers/AuthController';
import passport from '../auth/authStrategies';

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
authRouter.post('/signup', userValidator.signupValidation, AuthController.signUpUser);
// import '../auth/google';

authRouter.get('/google', passport.authenticate('google', {
  scope: [
    'profile', 'email',
  ],
}));

authRouter.get('/google/callback', (req, res, next) => {
  passport.authenticate('google', (err, user, info) => {
    if (err) {
      return res.redirect('/');
    }
    if (!user) {
      return res.status(401).send({ status: 401, success: false, message: 'authentication failed' });
    }
    req.login(user, (loginErr) => {
      if (loginErr) {
        return next(loginErr);
      }
      return res.send({ success: true, message: 'authentication succeeded' });
    });
  })(req, res, next);
});

authRouter.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

authRouter.get('/facebook/callback',(req, res, next) => {
  passport.authenticate('facebook', (err, user, info) => {
    if (err) {
      return res.redirect('/');
    }
    if (!user) {
      return res.send({ success: false, message: 'authentication failed' });
    }
    req.login(user, (loginErr) => {
      if (loginErr) {
        return next(loginErr);
      }
      return res.send({ success: true, message: 'authentication succeeded' });
    });
  })(req, res, next);
});

export default authRouter;
