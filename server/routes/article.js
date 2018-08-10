import { Router } from 'express';
import ArticleController from '../controllers/ArticleController';
import isLoggedIn from '../middlewares/isLoggedIn';
import ArticleValidation from '../middlewares/validations/ArticleValidation';
<<<<<<< HEAD
import CommentValidation from '../middlewares/validations/CommentValidation';
import CommentController from '../controllers/CommentController';
import RatingController from '../controllers/RatingController';
=======
>>>>>>> feat(tagArticle): implement user tag article

const articleRouter = Router();

articleRouter.post('/', isLoggedIn, ArticleValidation.validateCreateArticle, ArticleController.createArticle);

<<<<<<< HEAD
articleRouter.put('/:slug', isLoggedIn, ArticleValidation.validateUpdateArticle, ArticleController.updateArticle);
=======
articleRouter.post('/articles', userAuthenticate, ArticleValidation.validateCreateArticle, ArticleController.createArticle);
>>>>>>> feat(tagArticle): implement user tag article

articleRouter.delete('/:slug', isLoggedIn, ArticleController.removeArticle);

articleRouter.post('/:slug/comments', isLoggedIn, CommentValidation.validateComment, CommentController.createComment);

articleRouter.get('/:slug/comments', isLoggedIn, CommentController.getComments);

articleRouter.get('/:slug/comments/:id', isLoggedIn, CommentController.getComment);

articleRouter.put('/:slug/comments/:id', isLoggedIn, CommentValidation.validateComment, CommentController.updateComment);

articleRouter.delete('/:slug/comments/:id', isLoggedIn, CommentController.deleteComment);

articleRouter.post('/:author/:slug/:rating', isLoggedIn, RatingController.rateArticle);

articleRouter.get('/', ArticleValidation.paginationValidation, ArticleController.getAllArticles);

articleRouter.get('/:slug', ArticleController.getSingleArticle);

export default articleRouter;
