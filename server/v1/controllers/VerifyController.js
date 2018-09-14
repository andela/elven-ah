import models from '../../models';
import JwtHelper from '../helpers/JwtHelper';
import Mailer from '../helpers/Mailer';
import emails from '../helpers/emailMessages';
import AuthController from './AuthController';

const { User } = models;

/**
 * This class handles all authentication operations
 * such as signup, login and OAuth.
 */
class VerifyController {
  /**
   * @description Checks which property of the user exists already
   * @param {Object} user The user object to be compared
   * @param {String} email The email to be compared
   * @param {String} username The username to be compared
   * @returns Returns a message object specifying which property of
   * the user is present in the user object
   */

  /**
   * @description authenticate user with Google passport-Strategy
   * @param {Object} user The user object to be compared
   * @param {String} email The email to be compared
   * @param {String} username The username to be compared
   * @returns Returns a message object specifying which property of
   * the user is present in the user object
   */
  static verifyEmail(req, res, next) {
    const { email } = req.user || req.body;
    const hostUrl = req.get('origin')
      ? `${req.protocol}://${req.get('origin')}/auth/verify`
      : `${req.protocol}://${req.get('host')}/api/v1/auth/verify`;
    const payload = { email };
    const token = JwtHelper.createToken(payload, '24h');
    const url = `${hostUrl}?evc=${token}`;
    const msg = emails.emailVerification(email, url);
    return Mailer.sendMail(msg, next)
      .then((response) => {
        if (response && response[0].statusCode === 202) {
          return res.status(201).json({
            status: 'success',
            message: req.emailVerificationMessage,
          });
        }
        return res.status(400).send({
          status: 'error',
          message: 'Unable to send email.'
        });
      });
  }

  /**
   * Verifies a user account
   * @param {object} req the request object
   * @param {object} res the response object
   */
  static activateUser(req, res) {
    const token = req.query.evc;
    if (token) {
      const decoded = JwtHelper.verifyToken(token);
      if (decoded) {
        return VerifyController.updateVerifiedStatus(decoded, res);
      }
      return res.status(401).send({
        status: 'error',
        message: 'This verification link is invalid or expired. Please try again'
      });
    }
    return res.status(401).send({
      status: 'error',
      message: 'Please click the link sent to your email to verify your account.'
    });
  }

  /**
   * @description authenticate user with Facebook passport-Strategy
   * @param {Object} user The user object to be compared
   * @param {String} email The email to be compared
   * @param {String} username The username to be compared
   * @returns Returns a message object specifying which property of
   * the user is present in the user object
   */
  static updateVerifiedStatus(decoded, res) {
    return User.update({ verified: true }, {
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
        const status = { code: 200, message: 'Account successfully verified and logged in' };
        return AuthController.successResponse(status, user, res);
      });
  }

  /**
   * Re-sends a verification email to the user
   * @param {object} req the request object
   * @param {object} res the response object
   * @param {object} next the next middleware function
   */
  static resendVerificationEmail(req, res) {
    const { email } = req.body;
    return User.find({ where: { email, verified: false } })
      .then((user) => {
        if (user) {
          req.emailVerificationMessage = 'Email verification link re-sent successfully';
          return VerifyController.verifyEmail(req, res);
        }
        return res.status(400).json({
          status: 'error',
          message: 'The email is invalid or the account has already been verified.',
        });
      });
  }
}

export default VerifyController;
