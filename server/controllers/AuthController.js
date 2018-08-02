import bcrypt from 'bcrypt';
import models from '../models';

const {
  User
} = models;

/**
 * This class handles all authentication operations
 * such as signup, login and OAuth.
 */
class AuthController {
  /**
   * @description Stripes sensitive information out of the user object
   * @param {Object} user The user object to the striped
   * @returns {Object} Returns a striped user object
   */
  static stripeUser(user) {
    const {
      email,
      username,
      firstName,
      lastName,
      bio,
      image,
      updatedAt,
      createdAt,
    } = user;
    return {
      email,
      username,
      firstName,
      lastName,
      bio,
      image,
      updatedAt,
      createdAt,
    };
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
      email,
      username,
      firstName,
      lastName,
      password,
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

  /**
   * @description authenticate user with Google passport-Startegy
   * @param {Object} user The user object to be compared
   * @param {String} email The email to be compared
   * @param {String} username The username to be compared
   * @returns Returns a message object specifiying which property of
   * the user is present in the user object
   */

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
   * @description authenticate user with Facebook passport-Startegy
   * @param {Object} user The user object to be compared
   * @param {String} email The email to be compared
   * @param {String} username The username to be compared
   * @returns Returns a message object specifiying which property of
   * the user is present in the user object
   */

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
      },
    })
      .spread((user, created) => {
        if (created) {
          return done(null, user);
        }
        return done(null, user);
      });
  }
}

export default AuthController;
