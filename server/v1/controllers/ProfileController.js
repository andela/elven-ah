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
  static getUserProfile(req, res) {
    const { username: loggedInUser } = req.user;
    const { username } = req.params;
    return User.findOne(Object.assign({}, queryHelper.userProfile, { where: { username } }))
      .then((data) => {
        if (data) {
          const user = NotificationController.filterNotifications(data, loggedInUser);
          return res.status(200).json({
            status: 'success',
            user,
          });
        }
        res.status(404).json({
          status: 'error',
          message: 'User with the supplied username does not exist.'
        });
      });
  }

  /**
  * @description Updates the profile of the authenticated user.
  * @param {object} req the request object
  * @param {object} res the response object
  * @returns the updated user profile
  */
  static async updateUserProfile(req, res) {
    const {
      email, firstName, lastName, bio, image, username
    } = req.body;
    const { username: loggedInUser } = req.user;
    const { username: userToUpdate } = req.params;
    if (await ProfileController.usernameExists(username) !== null && username !== loggedInUser) {
      return res.status(409).json({
        status: 'error',
        message: 'The username already exists',
      });
    }
    if (loggedInUser === userToUpdate) {
      return User.update({
        email, firstName, lastName, bio, image, username,
      }, { returning: true, where: { username: loggedInUser } })
        .then(([, [user]]) => res.status(200).json({
          status: 'success',
          user: AuthController.stripeUser(user),
        }));
    }
    return res.status(403).json({
      status: 'error',
      message: 'You can only edit your own profile',
    });
  }

  /**
   * @description checks if new username exists in the db
   * @param {string} username the new username
   */
  static async usernameExists(username) {
    const existingUser = await User.findOne({ where: { username: `${username}` } });
    return existingUser;
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
          message: `User with the email: ${email} already exists.`,
        });
      });
  }
}
