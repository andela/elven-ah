import models from '../../models';

const { Article } = models;


/**
 * Checks that the slug supplied is valid and refers to an article
 * @param {object} req the request object
 * @param {object} res the response object
 * @param {object} next the next middleware function
 * @returns {promise} the article object found
 */
const validateSlug = async (req, res, next) => {
  const { slug } = req.params;
  const article = await Article.findOne({
    where: { slug },
    attributes: [
      'id', 'title', 'userId', 'slug', 'body',
      'imageUrl', 'categoryId', 'createdAt', 'updatedAt'
    ],
  });
  if (article === null) {
    return res.status(400).json({
      status: 'error',
      message: 'The article slug supplied is invalid.',
    });
  }
  res.locals.article = article;
  return next();
};

export default validateSlug;
