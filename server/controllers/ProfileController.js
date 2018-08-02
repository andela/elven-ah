import models from '../models';
import AuthController from './AuthController';

const { User } = models;
/**
  * This class contains all the methods responsible for creating and querying
  * user profiles on the app
  * It is made up static methods which can be called from anywhere in the app.
  */
export default class ProfileController {
  /**
  * Gets the profile of the authenticated user and returns it.
  * @param {object} req the request object
  * @param {object} res the response object
  * @returns {user} the user object
  */
  static getUserProfile(req, res, next) {
    const { username } = req.user;
    // find a user with the username in the token
    User.findOne({ where: { username }, attributes: ['firstName', 'lastName', 'email', 'username', 'bio', 'image'] })
      .then((user) => {
        res.status(200).json({
          status: 'success',
          user,
        });
      })
      .catch(err => next(err, req, res));
  }

  /**
  * @description Updates the profile of the authenticated user.
  * @param {object} req the request object
  * @param {object} res the response object
  * @returns the updated user profile
  */
  static updateUserProfile(req, res, next) {
    // destructure the needed properties to avoid updating sensitive information
    const {
      email, firstName, lastName, bio, image
    } = req.body;
    const { username } = req.user;
    // update the user profile
    User.update({
      email, firstName, lastName, bio, image
    }, { returning: true, where: { username } })
    /* destructure the object coming from the database to access
    the updated user in an array of an array */
      .then(([, [user]]) => {
        res.status(200).json({
          status: 'success',
          // stripe sensitive information from the user object
          user: AuthController.stripeUser(user),
        });
      }).catch(err => next(err, req, res));
  }

  /**
  * @description Prevents email duplicates by checking if the email already exists.
  * @param {object} req the request object
  * @param {object} res the response object
  * @returns {next} the next middleware to update the user profile
  */
  static userEmailExists(req, res, next) {
    const { username } = req.user;
    const { email } = req.body;
    // find a user that matches the email in the request body
    User.findOne({ where: { email } })
      .then((user) => {
        // check if some properties where sent and overides null values
        if (user && user.username === username) {
          req.body.lastName = req.body.lastName || user.lastName;
          req.body.firstName = req.body.firstName || user.firstName;
          req.body.image = req.body.image || user.image;
          req.body.bio = req.body.bio || user.bio;
          return next();
        }
        return res.status(409).json({
          status: 'error',
          errors: {
            email: [`User with the email: ${email} already exists.`]
          }
        });
      });
  }

  // Other profiles related methods
}
