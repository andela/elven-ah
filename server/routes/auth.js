import {
  Router
} from 'express';
import userValidator from '../middlewares/validations/UserValidation';
import AuthController from '../controllers/AuthController';
import passport from '../auth/authStrategies';
import JwtHelper from '../helpers/JwtHelper';

const authRouter = Router();

// passport mock route
authRouter.get('/mock', passport.authenticate('mock'));

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
      return res.send(err);
    }
    if (!user) {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> return token with authenticated user response
      return res.status(401).send({
        status: 401,
        success: false,
        message: 'Google Authentication Failed'
      });
<<<<<<< HEAD
=======
      return res.status(401).send({ status: 401, success: false, message: 'Google Authentication Failed' });
>>>>>>> validating social authentication route for google and facebook
=======
>>>>>>> return token with authenticated user response
    }
    req.login(user, (loginErr) => {
      if (loginErr) {
        return next(loginErr);
      }
      const token = JwtHelper.createToken({
        id: user.id,
        email: user.email
      }, '24h');
      return res.status(200).send({
        status: 200,
        success: true,
        message: 'Google Authentication Succeeded',
        user: {
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          token,
        }
      });
    });
  })(req, res, next);
});

authRouter.get('/facebook', passport.authenticate('facebook', {
  scope: ['email']
}));

authRouter.get('/facebook/callback', (req, res, next) => {
  passport.authenticate('facebook', (err, user, info) => {
    if (err) {
<<<<<<< HEAD
      console.log(err);
      return res.send(err);
=======
      return res.send('err');
>>>>>>> return token with authenticated user response
    }
    if (!user) {
      return res.status(401).send({
        status: 401,
        success: false,
        message: 'Facebook Authentication Failed'
      });
    }
    req.login(user, (loginErr) => {
      if (loginErr) {
        return next(loginErr);
      }
      const token = JwtHelper.createToken({
        id: user.id,
        email: user.email
      }, '24h');
      return res.status(200).send({
        status: 200,
        success: true,
        message: 'Facebook Authentication Succeeded',
        user: {
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          token,
        },
      });
    });
  })(req, res, next);
});

<<<<<<< HEAD

export default authRouter;
=======
export default authRouter;
>>>>>>> return token with authenticated user response
