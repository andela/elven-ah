import models from '../models';
import randomString from '../helpers/randomString';
import dashReplace from '../helpers/replaceDash';
import queryHelper from '../helpers/queryHelper';

const { Article } = models;
const error = {
  message: 'Request can not be processed at the moment, please try again shortly,',
  status: 400,
};

/**
 * This class contains all the methods responsible for creating and querying
 * articles on the app
 * It is made up static methods which can be called from anywhere in the app.
 */
export default class ArticleController {
  /**
   * Formats and sends the response to the user when an article is created or updated.
   * @param {object} article the created/updated article
   * @param {object} statusCode HTTP status code (201 or 200)
   * @param {object} res the response object
   * @returns {object} the article that was created/updated.
   */
  static articleResponse(article, statusCode, res) {
    const updatedAt = statusCode === 201 ? undefined : new Date(article.updatedAt).toLocaleString('en-GB', { hour12: true });
    return res.status(statusCode).send({
      status: 'success',
      message: statusCode === 201 ? 'The article has been created successfully' : `The article with slug: ${article.slug} has been updated successfully`,
      article: {
        slug: article.slug,
        authorId: article.userId,
        categoryId: article.categoryId,
        title: article.title,
        body: article.body,
        imageUrl: article.imageUrl,
        createdAt: new Date(article.createdAt).toLocaleString('en-GB', { hour12: true }),
        updatedAt,
      },
    });
  }

  /**
   * Create an article and return the Data.
   * @param {object} req the request object
   * @param {object} res the response object
   * @returns {object} the article that was created.
   */
  static createArticle(req, res) {
    const { id: userId } = req.user;
    const slug = `${dashReplace(req.body.title).toLowerCase()}-${randomString(10)}`;
    const {
      title, body, imageUrl, categoryId
    } = req.body;

    Article.create({
      slug, title, body, imageUrl, categoryId, userId,
    })
      .then(newArticle => ArticleController.articleResponse(newArticle, 201, res))
      .catch(() => {
        res.status(400).json({
          status: 400,
          success: false,
          error: 'Article was not successfully created',
        });
      });
  }
  /**
   * Update an article and return the Data.
   * @param {object} req the request object
   * @param {object} res the response object
   * @returns {object} the article that was updated.
   */

  static updateArticle(req, res) {
    const { id } = req.user;
    const { slug } = req.params;
    const {
      title, body, imageUrl, categoryId,
    } = req.body;

    Article.findOne({
      where: { slug },
      attributes: ['title', 'userId', 'slug', 'body', 'imageUrl', 'categoryId', 'createdAt', 'updatedAt'],
    })
      .then((foundArticle) => {
        if (!foundArticle) {
          return res.status(404).json({
            status: 404,
            success: false,
            message: 'The specified article does not exist',
          });
        }
        if (foundArticle.userId !== id) {
          return res.status(403).json({
            status: 403,
            success: false,
            message: 'You can only update an article that belongs to you',
          });
        }
        Article.update({
          title: title || foundArticle.title,
          body: body || foundArticle.body,
          imageUrl: imageUrl || foundArticle.imageUrl,
          categoryId: categoryId || foundArticle.categoryId,
          updatedAt: Date.now()
        }, {
          returning: true,
          where: { slug }
        })
          .then(([, [updatedArticle]]) => {
            ArticleController.articleResponse(updatedArticle, 200, res);
          })
          .catch(() => {
            res.status(400).json({
              status: 400,
              success: false,
              error: 'Article not successfully updated',
            });
          });
      });
  }

  /**
   * Delete an article and return the Data.
   * @param {object} req the request object
   * @param {object} res the response object
   * @returns {object} the article that was deleted.
   */

  static removeArticle(req, res) {
    const { id } = req.user;
    const { slug } = req.params;
    Article.findOne({
      where: { slug },
      attributes: ['title', 'slug', 'body', 'userId', 'imageUrl', 'categoryId', 'createdAt'],
    })
      .then((foundArticle) => {
        if (!foundArticle) {
          return res.status(404).json({
            status: 404,
            success: false,
            message: 'The specified article does not exist',
          });
        }
        if (foundArticle.userId !== id) {
          return res.status(403).json({
            status: 403,
            success: false,
            message: 'You can only delete an article that belongs to you',
          });
        }
        Article.destroy({
          where: { slug },
        })
          .then(() => {
            res.status(200).json({
              status: 200,
              success: true,
              message: `Article with slug: ${slug} has been successfully deleted`,
            });
          });
      })
      .catch(() => res.status(400).json({
        status: 400,
        success: false,
        error: 'Article can not be deleted'
      }));
  }

  /**
   * Gets a list of paginated articles
   *
   * @param {Object} req The HTTP request object
   * @param {Object} res The HTTP response object
   * @param {Object} next The next middleware to be called
   */
  static getAllArticles(req, res, next) {
    const limit = req.query.limit || 100;
    const offset = req.query.offset || 0;
    Article.findAll(Object.assign({}, queryHelper.allArticles, { offset, limit }))
      .then((articles) => {
        ArticleController.sendPaginationResponse(res, articles, false);
      })
      .catch(() => next(error));
  }

  /**
   * Gets a list of paginated articles belonging to the user
   * in the url route parameter
   *
   * @param {Object} req The HTTP request object
   * @param {Object} res The HTTP response object
   * @param {Object} next The next middleware to be called
   */
  static getUserArticles(req, res, next) {
    const limit = req.query.limit || 100;
    const offset = req.query.offset || 0;
    let { userId } = req.params;
    if (!/[0-9]/.test(userId)) {
      return res.status(400).json({
        status: 'fail',
        errors: { userId: ['userId must be a number.'] }
      });
    }
    userId = Number.parseInt(userId, 10);
    Article
      .findAll(Object.assign({}, queryHelper.allArticles, { where: { userId }, offset, limit }))
      .then((articles) => {
        ArticleController.sendPaginationResponse(res, articles, userId);
      })
      .catch(() => next(error));
  }

  /**
  * Gets a single article with the slug specified
  * in the url route parameter
  *
  * @param {Object} req The HTTP request object
  * @param {Object} res The HTTP response object
  * @param {Object} next The next middleware to be called
  */
  static getSingleArticle(req, res, next) {
    const { slug } = req.params;
    Article.findOne(Object.assign({}, queryHelper.singleArticle, { where: { slug } }))
      .then((article) => {
        if (article) {
          return res.status(200).json({
            status: 'success',
            article,
          });
        }
        return res.status(404).json({
          status: 'fail',
          errors: {
            article: [`Article with slug: ${slug} not found.`],
          },
        });
      })
      .catch(() => next(error));
  }

  /**
   * Sends the response to the user when a list of paginated articles are requested
   * For a given user or random articles
   *
   * @param {Object} res The HTTP response object
   * @param {Object} articles A list of articles returned
   * @param {String} userId The userId of the user whose articles are requested
   * @returns {Object} The response object returned to the user
   */
  static sendPaginationResponse(res, articles, userId) {
    if (articles[0]) {
      return res.status(200).json({
        status: 'success',
        articles,
      });
    }
    if (!userId) {
      return res.status(404).json({
        status: 'fail',
        errors: {
          articles: ['No articles found.'],
        },
      });
    }
    return res.status(404).json({
      status: 'fail',
      errors: {
        articles: [`Articles not found for user with userId: ${userId}.`],
      },
    });
  }
}
