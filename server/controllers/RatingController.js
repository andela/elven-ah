import models from '../models';

const { Article, Rating } = models;
/**
 * This class contains all the methods responsible for rating
 * articles on the app
 * It is made up static methods which can be called from anywhere in the app.
 */
export default class RatingController {
  /**
  * Prep the request that is sent and get the information needed to rate
  * the article.
  * @param {object} req the request object
  * @param {object} res the response object
  */
  static prepRating(req, res) {
    const { id: userId, username } = req.user;
    const { slug, rating, author } = req.params;
    if (username === author) {
      return res.status(403).send({
        status: 'error',
        errors: {
          user: ['You cannot rate your own article']
        }
      });
    }
    let star = rating < 1 ? 1 : rating;
    star = star > 5 ? 5 : star;
    return {
      userId, slug, star
    };
  }

  /**
  * Prepares the response to be sent to the user.
  * @param {object} rating the rating object returned from the database
  * @param {object} res the response object
  * @param {boolean} updated a boolean that indicates if it is a new rating or an
  * updated rating (used to set the appropriate status code)
  */
  static ratingResponse(rating, res, updated = false) {
    const statusCode = updated ? 200 : 201;
    const {
      userId, value, slug
    } = rating.dataValues;
    return res.status(statusCode).send({
      status: 'success',
      rating: {
        userId, value, slug
      },
    });
  }

  /**
  * Rate an article and return the rating (number of stars).
  * @param {object} req the request object
  * @param {object} res the response object
  */
  static rateArticle(req, res) {
    const ratingInfo = RatingController.prepRating(req, res);
    const { userId, slug, star } = ratingInfo;
    if (!slug) return;
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
        Rating.findOne({ where: { articleId, userId } })
          .then((rating) => {
            if (!rating) {
              return Rating.create({ userId, articleId, value: star })
                .then(newRating => RatingController.ratingResponse(newRating, res));
            }
            return Rating.update({ value: star }, {
              returning: true,
              where: { articleId, userId },
            })
              .then(([, [updatedRating]]) => {
                RatingController.ratingResponse(updatedRating, res, true);
              });
          });
      });
  }
}
