import bcrypt from 'bcrypt';
import models from '../../models';
import JwtHelper from '../helpers/JwtHelper';
import NotificationController from './NotificationController';

const { User } = models;

/**
 * This class handles all authentication operations
 * such as signup, login and OAuth.
 */
export default class AuthController {
  /**
   * @description Stripes sensitive information out of the user object
   * @param {Object} user The user object to the striped
   * @returns {Object} Returns a striped user object
   */
  static stripeUser(user) {
    const {
      id, email, username, firstName, lastName, bio, image
    } = user;
    return {
      id, email, username, firstName, lastName, bio, image
    };
  }

  /**
   * @description Formats the message sent to the user on successful login/registration
   * This will ensure that all response is formatted in the same way.
   * @param {Object} status The status of the response (include statusCode and message)
   * @param {object} user The user object returned from the operation
   * @param {object} res The express response object
   * @returns Returns an object to the user containing status, message and the logged in or
   * registered user
   */
  static async successResponse(status, userObject, res) {
    const user = AuthController.stripeUser(userObject);
    const { id, username, email } = user;
    user.token = await JwtHelper.createToken({ user: { id, username, email } }, '720h');
    const { code, message } = status;
    const userChannel = `user-${username}`;
    NotificationController.subscribe(userChannel, id);
    return res.status(code).send({
      status: 'success',
      message,
      user,
    });
  }

  /**
   * @description Checks which property of the user exists already
   * @param {Object} user The user object to be compared
   * @param {String} email The email to be compared
   * @param {String} username The username to be compared
   * @returns Returns a message object specifying which property of
   * the user is present in the user object
   */
  static userExists(user, email, username) {
    if (user.email === email && user.username === username) {
      return {
        email: [`User with email: ${email} already exists.`],
        username: [`User with username: ${username} already exists.`],
      };
    }
    if (user.email === email) {
      return { email: [`User with email: ${email} already exists.`] };
    }
    return { username: [`User with username: ${username} already exists.`] };
  }

  /**
   * @description Handles the signup user operation
   * @param {Object} req The HTTP request payload object
   * @param {Object} res The HTTP response payload object
   * @param {Object} next The next middleware to handle email verification
   */
  static signUpUser(req, res, next) {
    const {
      email, username, firstName, lastName, password,
    } = req.body;
    return User.findOrCreate({
      where: {
        $or: [{
          email
        }, {
          username
        }]
      },
      defaults: {
        email,
        username,
        firstName,
        lastName,
        password: bcrypt.hashSync(password, 10),
      },
    }).spread((newUser, created) => {
      if (!created) {
        return res.status(409).json({
          status: 'error',
          errors: AuthController.userExists(newUser, email, username),
        });
      }
      req.user = AuthController.stripeUser(newUser);
      req.emailVerificationMessage = 'User signup successful and verification email sent.';
      return next();
    });
  }

  /**
  * This method is responsible for structuring the user information from
  * user login/signup through the passport Google
  * authentication strategy.
  * @param {object} accessToken the user token sent by Google
  * @param {object} refreshToken the user refresh token  sent by Google
  * @param {object} profile the user profile object containing the user information from Google
  * @param {*} done the callback function that completes passport auth and attach
  * the user object to the request
  */
  static googleCallback(accessToken, refreshToken, profile, done) {
    const displayName = profile.displayName.split(' ').join('-');
    return User.findOrCreate({
      where: {
        $or: [{
          email: profile.emails[0].value,
        }, {
          username: displayName,
        }]
      },
      defaults: {
        username: displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        googleId: profile.id,
        email: profile.emails[0].value,
        image: profile.photos[0].value,
        verified: true,
      },
    })
      .spread((user, created) => {
        user.created = created;
        return done(null, user);
      });
  }

  /**
  * This method is responsible for structuring the user information from
  * user login/signup through the passport Facebook authentication strategy.
  * @param {object} accessToken the user token sent by Facebook
  * @param {object} refreshToken the user refresh token  sent by Facebook
  * @param {object} profile the user profile object containing the user information from Facebook
  * @param {*} done the callback function that completes passport auth and attach
  * the user object to the request
  */
  static facebookCallback(accessToken, refreshToken, profile, done) {
    const displayName = (`${profile.name.givenName}-${profile.name.familyName}`);
    return User.findOrCreate({
      where: {
        $or: [{
          email: profile.emails[0].value,
        }, {
          username: displayName,
        }]
      },
      defaults: {
        username: displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        facebookId: profile.id,
        email: profile.emails[0].value,
        verified: true
      },
    })
      .spread((user, created) => {
        user.created = created;
        return done(null, user);
      });
  }

  /**
   * @description Finishes login/signup through social platform using passport
   * @param {Object} err passport error object
   * @param {Object} user user object gotten on successful login/signup
   * @param {Object} res The HTTP response payload object
   * @param {string} strategy The passport strategy used
   */
  static finishSocialLogin(err, user, res, strategy) {
    if (err) {
      return res.status(400).send({
        status: 'error',
        message: 'This token has already been used. Please login again'
      });
    }
    if (!user) {
      return res.status(401).send({
        status: 'error',
        message: `${strategy} authentication failed. Please try again`
      });
    }
    const code = user.created ? 201 : 200;
    const status = { code, message: `${strategy} authentication successful` };
    return AuthController.successResponse(status, user, res);
  }

  /**
   * @description Handles logging in a user locally
   * @param {Object} req The HTTP request payload object
   * @param {Object} res The HTTP response payload object
   */
  static login(req, res) {
    const { email, username } = req.body;
    User.findOne({
      where: { $or: [{ email }, { username }] },
    })
      .then((user) => {
        const loginError = AuthController.loginError(user, req);
        if (loginError) {
          return res.status(loginError.statusCode).send({
            status: 'error',
            message: loginError.message
          });
        }
        const status = { code: 200, message: 'login successful!' };
        AuthController.successResponse(status, user, res);
      });
  }

  /**
   * @description Handles logging in a user locally
   * @param {Object} req The HTTP request payload object
   * @param {Object} res The HTTP response payload object
   */
  static loginError(user, req) {
    const { email, password } = req.body;
    const credential = email ? 'email' : 'username';
    if (!user) {
      return {
        statusCode: 404,
        message: `No user with the provided ${credential} found`,
      };
    }
    if (!user.verified) {
      return {
        statusCode: 403,
        message: 'You must verify your account before you can login',
      };
    }
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return {
        statusCode: 401,
        message: `The ${credential} and/or password you entered is incorrect.`,
      };
    }
    return false;
  }
}
