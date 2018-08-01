import { } from 'dotenv/config';
import JwtHelper from '../helpers/JwtHelper';
import models from '../models'; // user model

const { User } = models;
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

  static getLoggedInUser(req, res) {
    const { username } = req.user;
    User.findOne({
      where: { username },
      attributes: ['id', 'username', 'email', 'bio', 'image'],
    })
      .then(user => res.status(200).send({
        status: 'success',
        user,
      }));
  }
}
