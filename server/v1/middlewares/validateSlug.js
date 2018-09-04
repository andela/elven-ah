import CommentController from '../controllers/CommentController';

const validateSlug = async (req, res, next) => {
  const { slug } = req.params;
  const article = await CommentController.getArticleFromSlug(slug);
  if (article === null) {
    return res.status(400).json({
      status: 'fail',
      message: 'The article slug supplied is invalid.',
    });
  }
  res.locals.article = article;
  return next();
};

export default validateSlug;
