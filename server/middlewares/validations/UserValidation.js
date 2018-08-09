import Validator from 'validatorjs';

class UserValidation {
  /**
   * @description Validates the request payload to create a user
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @param {Object} next The next middleware
   * @returns The next middleware to handle the user signup
   */
  static signupValidation(req, res, next) {
    const userProperties = {
      firstName: 'required|alpha|min:2|max:100',
      lastName: 'required|alpha|min:2|max:100',
      email: 'required|email',
      username: 'required|alpha_num|min:5|max:15',
      password: 'required|alpha_num|min:8|max:20',
      confirmPassword: 'required|alpha_num|min:8|max:20|same:password',
    };

    const validator = new Validator(req.body, userProperties);
    validator.passes(() => {
      if (UserValidation.passwordCheck(req.body.password)) return next();
      return res.status(400).json({
        status: 'error',
        errors: {
          password: ['Password must contain an Upper case letter, a lower case letter and a number.'],
        },
      });
    });
    validator.fails(() => {
      const errors = validator.errors.all();
      return res.status(400).json({
        status: 'error',
        errors,
      });
    });
  }

  /**
   * @description Validates that a p§assword contains a number, an upper and lower case letter
   * @param {String} password The password to be validated
   * @returns The value of the evaluation
   */
  static passwordCheck(password) {
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
      return true;
    }
    return false;
  }

  /**
   * @description Validates the request payload to update a user profile
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @param {Object} next The next middleware
   * @returns The next middleware to prevent email duplicates
   */
  static updateUserProfile(req, res, next) {
    const userUpdateProperties = {
      firstName: 'alpha|min:2|max:100',
      lastName: 'alpha|min:2|max:100',
      email: 'required|email',
      bio: 'min:20|max:4000',
      image: 'url'
    };
    const validator = new Validator(req.body, userUpdateProperties);
    validator.passes(() => next());
    validator.fails(() => {
      const errors = validator.errors.all();
      return res.status(400).json({
        status: 'error',
        errors,
      });
    });
  }

  /**
   * @description Validates the email payload to re-send verification email
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @param {Object} next The next middleware
   * @returns The next middleware to handle the user signup
   */
  static emailValidation(req, res, next) {
    const emailProperties = {
      email: 'required|email',
    };
    const validator = new Validator(req.body, emailProperties);
    validator.passes(() => next());
    validator.fails(() => {
      const errors = validator.errors.all();
      return res.status(400).json({
        status: 'error',
        errors,
      });
    });
  }

  /**
   * @description Validates the payload to send a user a password link
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @param {Object} next The next middleware
   * @returns The next middleware to handle the user reset password process
   */

  static passwordResetValidation(req, res, next) {
    const userPayloadData = {
      email: 'required|email',
    };

    const userDataValidation = new Validator(req.body, userPayloadData);

    userDataValidation.passes(() => next());
    userDataValidation.fails(() => {
      const errors = userDataValidation.errors.all();
      return res.status(400).json({
        status: 'error',
        errors,
      });
    });
  }

  static newPasswordValidation(req, res, next) {
    const passwordPayloadData = {
      password: 'required|alpha_num|min:8|max:20',
      confirmPassword: 'required|alpha_num|min:8|max:20|same:password',
    };

    const passwordDataValidation = new Validator(req.body, passwordPayloadData);

    passwordDataValidation.passes(() => {
      if (UserValidation.passwordCheck(req.body.password)) return next();
      return res.status(400).json({
        status: 'error',
        errors: {
          password: ['Password must contain an Upper case letter, a lower case letter and a number.'],
        },
      });
    });
    passwordDataValidation.fails(() => {
      const errors = passwordDataValidation.errors.all();
      return res.status(400).json({
        status: 'error',
        errors,
      });
    });
  }
}

export default UserValidation;
