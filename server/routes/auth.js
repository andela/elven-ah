import {
  Router
} from 'express';
import passport from '../auth/authStrategies';
import JwtHelper from '../helpers/JwtHelper';
import userValidator from '../middlewares/validations/UserValidation';
import AuthController from '../controllers/AuthController';
import ValidateController from '../controllers/ValidateController';

const authRouter = Router();

//  Auth routes will be added here
authRouter.post('/signup', userValidator.signupValidation, AuthController.signUpUser, ValidateController.verifyEmail);

// passport mock route
authRouter.get('/mock', passport.authenticate('mock'));

authRouter.get('/google', passport.authenticate('google', {
  scope: [
    'profile', 'email',
  ],
}));

authRouter.get('/google/callback', (req, res, next) => {
  passport.authenticate('google', (err, user) => {
    if (err) {
      return res.send(err);
    }
    if (!user) {
      return res.status(401).send({
        status: 401,
        success: false,
        message: 'Google Authentication Failed'
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
  passport.authenticate('facebook', (err, user) => {
    if (err) {
      return res.send(err);
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

export default authRouter;
