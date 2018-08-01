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
      firstName: 'required|alpha|min:2|max:15',
      lastName: 'required|alpha|min:2|max:15',
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
   * @description Validates that a password contains a number, an upper and lower case letter
   * @param {String} password The password to be validated
   * @returns The value of the evaluation
   */
  static passwordCheck(password) {
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
      return true;
    }
    return false;
  }
}

export default UserValidation;
