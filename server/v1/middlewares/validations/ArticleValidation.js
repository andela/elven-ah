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
      isAttributed: 'required|boolean|in:true,false',
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
      isAttributed: 'required|boolean',
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
   * Validates the offset and limit parameters in the
   * url query
   * @param {Object} req The HTTP request object
   * @param {Object} res The HTTP response object
   * @param {Object} next The next middleware on the route
   */
  static paginationValidation(req, res, next) {
    const queryProperties = {
      offset: 'integer|min:0',
      limit: 'integer|min:0'
    };

    const validator = new Validator(req.query, queryProperties);
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
