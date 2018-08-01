import models from '../models';

const { User } = models;
/**
  * This class contains all the methods responsible for creating and querying
  * user profiles on the app
  * It is made up static methods which can be called from anywhere in the app.
  */
export default class ProfileController {
  /**
  * Create a profile for the user and returns it.
  * @param {object} req the request object
  * @param {object} res the response object
  * @returns {user} the user object
  */
  static getUserProfile(req, res, next) {
    const { username } = req.user;
    User.findOne({ where: { username }, attributes: ['firstName', 'lastName', 'email', 'username', 'bio', 'image'] })
      .then((user) => {
        res.status(200).json({
          status: 'success',
          user,
        });
      })
      .catch(err => next(err, req, res));
  }

  // Other profiles related methods
}
