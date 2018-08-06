import models from '../models';
import JwtHelper from '../helpers/JwtHelper';
import Mailer from '../helpers/Mailer';
import emails from '../helpers/emailMessages';

const { User } = models;

/**
 * This class handles all authentication operations
 * such as signup, login and OAuth.
 */
class VerifyController {
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
   * @description authenticate user with Google passport-Startegy
   * @param {Object} user The user object to be compared
   * @param {String} email The email to be compared
   * @param {String} username The username to be compared
   * @returns Returns a message object specifiying which property of
   * the user is present in the user object
   */
  static verifyEmail(req, res, next) {
    const { email } = req.user || req.body;
    const payload = { email };
    const token = JwtHelper.createToken(payload, '24h');
    const url = `${req.protocol}://${req.get('host')}/api/auth/verify?evc=${token}`;
    const msg = emails.emailVerification(email, url);
    Mailer.sendMail(msg)
      .then((response) => {
        if (response[0].statusCode === 202) {
          return res.status(201).json({
            status: 'success',
            message: req.emailVerificationMessage,
          });
        }
        res.status(400).send('Unable to send email');
      })
      .catch(err => next(err));
  }

  /**
   * Verifies a user account
   * @param {object} req the request object
   * @param {object} res the response object
   */
  static activateUser(req, res, next) {
    const token = req.query.evc;
    if (token) {
      const decoded = JwtHelper.verifyToken(token);
      if (decoded) {
        VerifyController.updateVerifiedStatus(decoded, req, res, next);
      } else {
        res.status(401).send({
          status: 'fail',
          message: 'This verification link is invalid or expired. Please try again'
        });
      }
    } else {
      res.status(401).send({
        status: 'fail',
        message: 'Please click the link sent to your email to verify your account.'
      });
    }
  }

  /**
   * @description authenticate user with Facebook passport-Startegy
   * @param {Object} user The user object to be compared
   * @param {String} email The email to be compared
   * @param {String} username The username to be compared
   * @returns Returns a message object specifiying which property of
   * the user is present in the user object
   */
  static updateVerifiedStatus(decoded, req, res, next) {
    User.update({ verified: true }, {
      returning: true,
      where: { email: decoded.email, verified: false }
    })
      .then(([, [user]]) => {
        if (!user) {
          return res.status(400).json({
            status: 'error',
            message: 'The account has already been verified.',
          });
        }
        const { id, email, username } = user;
        const loginToken = JwtHelper.createToken({
          user: {
            id,
            email,
            username,
          }
        }, '720h');
        res.status(200).send({
          status: 'success',
          token: loginToken,
          message: 'Account successfully verified.',
        });
      })
      .catch(err => next(err));
  }

  /**
   * Re-sends a verification email to the user
   * @param {object} req the request object
   * @param {object} res the response object
   * @param {object} next the next middleware function
   */
  static resendVerificationEmail(req, res, next) {
    User.find({ where: { email, verified: false } })
      .then((user) => {
        if (user) {
          req.emailVerificationMessage = 'Email verification link re-sent successfully';
          return VerifyController.verifyEmail(req, res, next);
        }
        return res.status(400).json({
          status: 'error',
          errors: {
            user: [
              'Invalid email or the account has already been verified.'
            ],
          },
        });
      })
      .catch(err => next(err));
  }
}

export default VerifyController;
