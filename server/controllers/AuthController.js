import bcrypt from 'bcrypt';
import models from '../models';
import JwtHelper from '../helpers/JwtHelper';

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
      email, username, firstName, lastName, bio, image, updatedAt, createdAt,
    } = user;
    return {
      email, username, firstName, lastName, bio, image, updatedAt, createdAt,
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
  static async successResponse(status, user, res) {
    const { id, username } = user;
    user.token = await JwtHelper.createToken({ user: { id, username } }, '720h');
    const { code, message } = status;
    return res.status(code).send({
      status: 'success',
      message,
      user,
    });
  }

  /**
   * @description Formats the message sent to the user on failed login/registration
   * This will ensure that all response is formatted in the same way.
   * @param {Object} status The status of the response (include statusCode and error messages)
   * @param {object} res The express response object
   * @returns Returns an object to the user containing status, message and
   */
  static failureResponse(status, res) {
    const { code, errors } = status;
    return res.status(code).send({
      status: 'error',
      errors,
    });
  }

  /**
   * @description Checks which property of the user exists already
   * @param {Object} user The user object to be compared
   * @param {String} email The email to be compared
   * @param {String} username The username to be compared
   * @returns Returns a message object specifiying which property of
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
      return {
        email: [`User with email: ${email} already exists.`],
      };
    }
    return {
      username: [`User with username: ${username} already exists.`],
    };
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
    User.findOrCreate({
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
          status: 'fail',
          errors: AuthController.userExists(newUser, email, username),
        });
      }
      req.user = AuthController.stripeUser(newUser);
      req.emailVerificationMessage = 'User signup successful and verification email sent.';
      next();
    });
  }

  static googleCallback(accessToken, refreshToken, profile, done) {
    const displayName = profile.displayName.split(' ').join('-');
    User.findOrCreate({
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
        if (created) {
          return done(null, user);
        }
        return done(null, user);
      });
  }

  static facebookCallback(accessToken, refreshToken, profile, done) {
    const displayName = (`${profile.name.givenName}-${profile.name.familyName}`);
    User.findOrCreate({
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
        if (created) {
          return done(null, user);
        }
        return done(null, user);
      });
  }

  /**
   * @description Handles logging in a user locally
   * @param {Object} req The HTTP request payload object
   * @param {Object} res The HTTP response payload object
   */
  static login(req, res) {
    const { email, username, password } = req.body;
    User.findOne({
      where: { $or: [{ email }, { username }] },
    })
      .then((user) => {
        if (!user) {
          const errors = { user: ['No user with the provided credentials found'] };
          return AuthController.failureResponse({ code: 404, errors }, res);
        }

        if (!user.verified) {
          const errors = { user: ['You must verify your email before you can login!'] };
          return AuthController.failureResponse({ code: 403, errors }, res);
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
          const errors = { user: ['Incorrect credentials! Please try again'] };
          return AuthController.failureResponse({ code: 401, errors }, res);
        }

        const { id, firstName, lastName } = user;

        const status = { code: 200, message: 'login successful!' };
        AuthController.successResponse(status, {
          id, firstName, lastName, email: user.email, username: user.username
        }, res);
      })
      .catch(() => {
        const errors = { user: ['Oops! Something unexpected happened. Please try again'] };
        return AuthController.failureResponse({ code: 500, errors }, res);
      });
  }
}
