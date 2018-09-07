import models from '../../models';
import NotificationController from './NotificationController';

const { Article, Rating } = models;
/**
 * This class contains all the methods responsible for rating
 * articles on the app
 * It is made up static methods which can be called from anywhere in the app.
 */
export default class RatingController {
  /**
  * Prepares the the information needed to rate the article. It also checks that
  * a user does not rate his/her own article
  * @param {object} req the request object
  * @param {object} res the response object
  */
  static prepRating(req, res) {
    const { id: userId, username } = req.user;
    const { slug, rating, author } = req.params;
    if (username === author) {
      return res.status(403).send({
        status: 'error',
        errors: 'You cannot rate your own article',
      });
    }
    let value = rating < 1 ? 1 : rating;
    value = value > 5 ? 5 : value;
    return RatingController.rateArticle({
      userId, slug, author, value
    }, res);
  }

  /**
  * Rate an article and return the rating (number of stars).
  * @param {object} req the request object
  * @param {object} res the response object
  */
  static rateArticle(ratingInfo, res) {
    const { slug } = ratingInfo;
    Article.findOne({
      where: { slug },
      attributes: ['id'],
    })
      .then((article) => {
        if (!article) {
          return res.status(404).send({
            status: 'error',
            errors: {
              article: ['No article with the given URL. Please check the URL again']
            }
          });
        }
        const { id: articleId } = article.dataValues;
        RatingController.processTheRating(articleId, ratingInfo, res);
      });
  }

  /**
  * Rate an article and subscribe the user to get notifications on the article
  * then return the rating.
  * @param {number} articleId the ID of the article to be rated
  * @param {object} ratingInfo contains the information to be used to rate the article
  * @param {object} res the response object
  */
  static async processTheRating(articleId, ratingInfo, res) {
    const { userId, value, slug } = ratingInfo;
    const channel = `article-${slug}`;
    const rating = await Rating.findOne({ where: { articleId, userId } });
    if (!rating) {
      const newRating = await Rating.create({ userId, articleId, value });
      RatingController.ratingResponse(newRating, res);
      NotificationController.subscribe(channel, userId);
      const notificationInfo = {
        userId,
        slug,
        resourceId: newRating.id,
        username: ratingInfo.author,
      };
      return NotificationController.notifyAuthor('rated', notificationInfo);
    }
    const [, [updatedRating]] = await Rating.update({ value }, {
      returning: true,
      where: { articleId, userId },
    });
    RatingController.ratingResponse(updatedRating, res, true);
    await NotificationController.subscribe(channel, userId);
    ratingInfo.resourceId = updatedRating.id;
    return NotificationController.notifyAuthor('rated', ratingInfo);
  }

  /**
  * Prepares the response to be sent to the user.
  * @param {object} rating the rating object returned from the database
  * @param {object} res the response object
  * @param {boolean} updated a boolean that indicates if it is a new rating or an
  * updated rating (used to set the appropriate status code and message)
  */
  static ratingResponse(rating, res, updated = false) {
    const statusCode = updated ? 200 : 201;
    const {
      id, userId, value, articleId
    } = rating;
    return res.status(statusCode).send({
      status: 'success',
      message: `rating ${updated ? 'updated' : 'created'} successfully`,
      rating: {
        id, userId, value, articleId
      },
    });
  }
}
