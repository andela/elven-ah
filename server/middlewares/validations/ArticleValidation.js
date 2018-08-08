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
    const articleRules = {
      categoryId: 'required|integer|max:5',
      title: 'required|string',
      body: 'required|string',
    };

    const validate = new Validator(req.body, articleRules);
    if (validate.passes()) return next();

    const error = {};
    const categoryId = validate.errors.first('categoryId');
    const title = validate.errors.first('title');
    const body = validate.errors.first('body');

    if (categoryId) {
      error.categoryId = categoryId;
    }
    if (title) {
      error.title = title;
    }
    if (body) {
      error.body = body;
    }

    return res.status(400).json({
      message: 'A Required Field is Missing',
      status: 400,
      error,
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
    const articleRules = {
      categoryId: 'integer|max:5',
      title: 'string',
      body: 'string',
    };

    const validate = new Validator(req.body, articleRules);
    if (validate.passes()) return next();

    const error = {};
    const categoryId = validate.errors.first('categoryId');
    const title = validate.errors.first('title');
    const body = validate.errors.first('body');

    if (categoryId) {
      error.categoryId = categoryId;
    }
    if (title) {
      error.title = title;
    }
    if (body) {
      error.body = body;
    }

    return res.status(400).json({
      message: 'A Required Field is Missing',
      status: 400,
      error,
    });
  }
}
