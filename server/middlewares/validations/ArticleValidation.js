/* eslint-disable class-methods-use-this */
import Validator from 'validatorjs';

/**
 * @export
 * @class Validation
 */
export default class ArticleValidation {
  /**
     * Validate create Article Data
     *
     * @param {object} req - HTTP Request
     * @param {object} res - HTTP Response
     * @param {function} next
     * @returns {object} Class instance
     * @memberof Validation
     */
  static validateCreateArticle(req, res, next) {
    const articleProperties = {
      categoryId: 'required|integer|min:1|max:5',
      title: 'required|string',
      body: 'required|string',
    };

    const validator = new Validator(req.body, articleProperties);
    if (validator.passes()) return next();

    validator.fails(() => {
      const errors = validator.errors.all();
      return res.status(400).json({
        status: 'error',
        errors,
      });
    });
  }

  /**
     * Validate create Article Data
     *
     * @param {object} req - HTTP Request
     * @param {object} res - HTTP Response
     * @param {function} next
     * @returns {object} Class instance
     * @memberof Validation
     */
  static validateUpdateArticle(req, res, next) {
    const articleProperties = {
      categoryId: 'integer|min:1|max:5',
      title: 'string',
      body: 'string',
    };

    const validator = new Validator(req.body, articleProperties);
    if (validator.passes()) return next();

    validator.fails(() => {
      const errors = validator.errors.all();
      return res.status(400).json({
        status: 'error',
        errors,
      });
    });
  }
}
