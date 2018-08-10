import Validator from 'validatorjs';

/**
 * @export
 * @class Validation
 */
export default class CommentValidation {
/**
  * Validate data for comment creation
  *
  * @param {object} req - HTTP Request
  * @param {object} res - HTTP Response
  * @param {function} next
  * @returns {object} Class instance
  * @memberof Validation
  */
  static validateNewComment(req, res, next) {
    const commentProperties = {
      body: 'required|string',
    };

    const validator = new Validator(req.body, commentProperties);
    validator.passes(() => next());
    validator.fails(() => {
      const errors = validator.errors.all();
      return res.status(400).json({
        status: 'error',
        errors,
      });
    });
  }
}
