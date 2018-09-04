import { } from 'dotenv/config';
import bcrypt from 'bcrypt';
import models from '../../models';
import Mailer from '../helpers/Mailer';
import JwtHelper from '../helpers/JwtHelper';
import emails from '../helpers/emailMessages';

const { User } = models;

/**
  * This class contains all the methods responsible for user
  * related operations on the app including creating and querying
  * users from the database
  * It is made up static methods which can be called from anywhere in the app.
  */
export default class PasswordResetController {
  /**
  * Checks if email exist and sends a reset email if email exit.
  * @param {object} req the request object
  * @param {object} res the response object
  */
  static sendResetEmail(req, res, next) {
    const { email } = req.body;

    const token = JwtHelper.createToken({ email }, 1800);

    User.findOne({ where: { email } })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            status: 'fail',
            errors: {
              email: [
                'The email you provided does not exist, please check again.',
              ],
            },
          });
        }
        const passwordResetUrl = `${req.protocol}://${req.headers.host}/api/users/account/password/reset?tokenId=${token}`;
        const resetEmailMessage = emails.passwordReset(email, passwordResetUrl, user.firstName);
        const message = 'A password reset link has been sent to your email. Please check your email';

        // Send User Email Method Using SendGrid
        PasswordResetController.resetProcessEmail(req, res, resetEmailMessage, message);
      })
      .catch(err => next(err));
  }

  /**
  * Checks if email exist and sends a reset email if email exit.
  * @param {object} req the request object
  * @param {object} res the response object
  */
  static verifyPasswordResetToken(req, res) {
    const { email } = req.decoded;
    const passwordUpdateToken = JwtHelper.createToken({ email }, 900);
    return res.status(200).send({
      status: 'success',
      message: 'Please use the link below to change your password',
      redirectUrl: `${req.protocol}://${req.headers.host}/api/users/account/password/reset?tokenId=${passwordUpdateToken}`,
    });
  }

  /**
  * Update user password and sends a confirmation mail on succesful password reset.
  * @param {object} req the request object
  * @param {object} res the response object
  */
  static updateUserPassword(req, res, next) {
    const { email } = req.decoded;
    const { password } = req.body;
    const encryptedPassword = bcrypt.hashSync(password, 10);

    User.find({
      where: {
        email,
      }
    }).then((updatePassword) => {
      if (updatePassword) {
        updatePassword.updateAttributes({
          password: encryptedPassword,
        }).then((user) => {
          const resetConfirmMessage = emails.passwordResetConfirmation(email, user.firstName);
          const message = 'Your Password has been updated successfully! You can login to enjoy stories accross the globe.';
          // Send User Email Method Using SendGrid
          PasswordResetController.resetProcessEmail(req, res, resetConfirmMessage, message);
        });
      }
    })
      .catch(err => next(err));
  }

  /**
  * Send an email notifying user on successful password reset or email update
  * @param {object} req the request object
  * @param {object} res the response object
  */
  static resetProcessEmail(req, res, emailMessage, message, token, next) {
    Mailer.sendMail(emailMessage)
      .then((response) => {
        if (response[0].statusCode === 202) {
          return res.status(201).json({
            status: 'success',
            message,
          });
        }
        return res.status(400).send({
          status: 'fail',
          message: 'Email could not be sent. Please try again',
        });
      })
      .catch(err => next(err));
  }
}
