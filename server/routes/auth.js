
import { Router } from 'express';
import userValidator from '../middlewares/validations/UserValidation';
import AuthController from '../controllers/AuthController';
import passport from '../auth/authStrategies';

const authRouter = Router();

// Auth routes will be added here
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
      return res.status(401).send({ status: 401, success: false, message: 'Google Authentication Failed' });
    }
    req.login(user, (loginErr) => {
      if (loginErr) {
        return next(loginErr);
      }
      return res.status(200).send({ status: 200, success: true, message: 'Google Authentication Succeeded' });
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
      return res.status(401).send({ status: 401, success: false, message: 'Facebook Authentication Failed' });
    }
    req.login(user, (loginErr) => {
      if (loginErr) {
        return next(loginErr);
      }
      return res.send({ success: true, message: 'Facebook Authentication Succeeded' });
    });
  })(req, res, next);
});

export default authRouter;
