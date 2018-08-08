import models from '../models';
import randomString from '../helpers/randomString';
import dashReplace from '../helpers/replaceDash';

const {
  Article
} = models;
/**
 * This class contains all the methods responsible for creating and querying
 * articles on the app
 * It is made up static methods which can be called from anywhere in the app.
 */
export default class ArticleController {
  /**
   * Create an article and return the Data.
   * @param {object} req the request object
   * @param {object} res the response object
   * @returns {object} the article that was created.
   */
  static createArticle(req, res) {
    const {
      id,
      username
    } = req.user;
    const slug = `${dashReplace(req.body.title)}-${randomString(10)}`;
    const {
      title,
      body,
      imageUrl,
      categoryId
    } = req.body;

    Article.create({
      slug: slug.toLowerCase(),
      title,
      body,
      imageUrl,
      categoryId,
      userId: id,
      createdAt: Date.now(),
    })
      .then(newArticle => res.status(200).json({
        status: 200,
        success: true,
        message: 'Article has been created',
        article: {
          slug: newArticle.slug,
          authorId: newArticle.userId,
          categoryId: newArticle.categoryId,
          title: newArticle.title,
          body: newArticle.body,
          imageUrl: newArticle.imageUrl,
          Author: username,
          createdAt: new Date(newArticle.createdAt).toLocaleString('en-GB', { hour12: true }),
        },
      }))
      .catch(() => {
        res.status(400).json({
          status: 400,
          success: false,
          error: 'Request was not successfully created',
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
    const {
      slug
    } = req.params;
    const {
      title,
      body,
      imageUrl,
      categoryId,
      createdAt
    } = req.body;
    Article.findOne({
      where: {
        slug
      },
      attributes: ['title', 'slug', 'body', 'imageUrl', 'categoryId', 'createdAt'],
    })
      .then((foundArticle) => {
        if (!foundArticle) {
          return res.status(404).json({
            status: 404,
            success: false,
            message: 'The specified artcile does not exist',
          });
        }

        Article.update({
          slug: foundArticle.slug,
          title: title || foundArticle.title,
          body: body || foundArticle.body,
          imageUrl: imageUrl || foundArticle.imageUrl,
          categoryId: categoryId || foundArticle.categoryId,
          createdAt,
          updatedAt: Date.now()
        }, {
          returning: true,
          where: {
            slug
          }
        })
          .then(([, [updatedArticle]]) => res.status(200).json({
            status: 200,
            success: true,
            message: `Article with ${slug} has been updated`,
            newArticle: {
              slug: updatedArticle.slug,
              title: updatedArticle.title,
              body: updatedArticle.body,
              imageUrl: updatedArticle.imageUrl,
              categoryId: updatedArticle.categoryId,
              createdAt: new Date(updatedArticle.createdAt).toLocaleString('en-GB', { hour12: true }),
              updatedAt: new Date(updatedArticle.updatedAt).toLocaleString('en-GB', { hour12: true })
            }
          }))
          .catch(() => {
            res.status(400).json({
              status: 400,
              success: false,
              error: 'Request not successfully updated',
            });
          });
      });
  }

  /**
   * Delet an article and return the Data.
   * @param {object} req the request object
   * @param {object} res the response object
   * @returns {object} the article that was deleted.
   */

  static removeArticle(req, res) {
    const {
      slug
    } = req.params;
    Article.findOne({
      where: {
        slug
      },
      attributes: ['title', 'slug', 'body', 'imageUrl', 'categoryId', 'createdAt'],
    })
      .then((foundArticle) => {
        if (!foundArticle) {
          return res.status(404).json({
            status: 404,
            success: false,
            message: 'The specified artcile does not exist',
          });
        }
        Article.destroy({
          where: {
            slug
          },
        })
          .then(() => {
            res.status(200).json({
              status: 200,
              success: true,
              message: `Article with ${slug} has been successfully deleted`,
            });
          });
      })
      .catch(() => res.status(400).json({
        status: 400,
        success: false,
        Error: 'Article can not be deleted'
      }));
  }
}
