import { } from 'dotenv/config';
import { User } from '../models/user';
/**
  * This class contains all the methods responsible for user
  * related operations on the app including creating and querying
  * users from the database
  * It is made up static methods which can be called from anywhere in the app.
  */
export default class UserController {
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
}
