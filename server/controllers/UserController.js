import { } from 'dotenv/config';
import { User } from '../models/index';
import JwtHelper from '../helpers/JwtHelper';

/**
  * This class contains all the methods responsible for user
  * related operations on the app including creating and querying
  * users from the database
  * It is made up static methods which can be called from anywhere in the app.
  */
export default class UserController {
  /**
   * This is just a method to create a test user to test that database connection
   * is working as expected.
   * @param {object} req the request object
   * @param {object} res the response object
   * @returns {user} the user object
   */
  static createTestUser(req, res) {
    const { username, email, password } = req.body;

    User.create({ username, email, password })
      .then((newUser) => {
        const { id, bio, image } = newUser;
        const validity = 2592000; // 30 days
        const token = JwtHelper.createToken({ user: { id, username, email } }, validity);
        return res.status(201).send({
          status: 'success',
          user: {
            id, email, username, token, bio, image,
          },
        });
      })
      .catch(err => res.status(500).send({ errors: { message: err.message } }));
  }

  /**
   * Logs in the user and return a user with jwt token.
   * @param {object} req the request object
   * @param {object} res the response object
   * @returns {user} the user object
   */
  static login(req, res) {
    // to be implemented
  }

  /**
  * Gets the current/authenticated user using the username.
  * @param {object} req the request object
  * @param {object} res the response object
  * @returns {user} the user object
  */
  static getLoggedInUser(req, res) {
    // This is just to test the isLoggedIn middleware.
    // The real immplementation may be different.
    const { username } = req.user;
    User.findOne({
      where: { username },
      attributes: ['id', 'username', 'email', 'bio', 'image'],
    })
      .then(user => res.status(200).send({
        status: 'success',
        user,
      }));
    // to be implemented
  }

  /**
   * Updates the currently logged in user and returns a user object.
   * @param {object} req the request object
   * @param {object} res the response object
   * @returns {user} the user object
   */
  static updateUser(req, res) {
    // to be implemented
  }
}
