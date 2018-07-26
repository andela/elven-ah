import { } from 'dotenv/config';
import { User } from '../models/index';

/**
  * This class contains all the methods responsible for user
  * related operations on the app including creating and querying
  * users from the database
  * It is made up static methods which can be called from anywhere in the app.
  */
export default class UsersController {
  /**
  * This is just a method to create a test user to test that database connection
  * is working as expected.
  * @param {object} req the request object
  * @param {object} res the response object
  * @returns {user} the user object
  */
  static createTestUser(req, res) {
    const {
      username,
      email,
      password,
    } = req.body;
    console.log(username, email, password);

    User.create({
      username,
      email,
      password,
    })
      .then(user => res.status(201).send({ user: user.toJSON() }))
      .catch(err => res.status(500).send({ errors: { message: err.message } }));
  }

  /**
  * Signs up a user by creating the user in the database, creating a profile
  * for the user, then logs in the user and return a user with jwt token
  * @param {object} req the request object
  * @param {object} res the response object
  * @returns {user} the user object
  */
  static signup(req, res) {
    // to be implemented
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
  * Gets the current/authenticated user using the id.
  * @param {object} req the request object
  * @param {object} res the response object
  * @returns {user} the user object
  */
  static FindUserById(req, res) {
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
