import models from '../../models';
import AuthController from './AuthController';
import queryHelper from '../helpers/queryHelper';
import NotificationController from './NotificationController';

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
    const { id } = req.user;
    User.findOne(Object.assign({}, queryHelper.userProfile, { where: { id } }))
      .then((data) => {
        const user = NotificationController.filterNotifications(data);
        res.status(200).json({
          status: 'success',
          user,
        });
      })
      .catch(err => next(err));
  }

  /**
  * @description Updates the profile of the authenticated user.
  * @param {object} req the request object
  * @param {object} res the response object
  * @returns the updated user profile
  */
  static updateUserProfile(req, res, next) {
    const {
      email, firstName, lastName, bio, image
    } = req.body;
    const { username } = req.user;
    User.update({
      email, firstName, lastName, bio, image
    }, { returning: true, where: { username } })
      .then(([, [user]]) => {
        res.status(200).json({
          status: 'success',
          user: AuthController.stripeUser(user),
        });
      }).catch(err => next(err));
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
    User.findOne({ where: { email } })
      .then((user) => {
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
}
