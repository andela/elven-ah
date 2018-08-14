import { Router } from 'express';
import ArticleController from '../controllers/ArticleController';
import userAuthenticate from '../middlewares/isLoggedIn';
import ArticleValidation from '../middlewares/validations/ArticleValidation';
import CommentValidation from '../middlewares/validations/CommentValidation';
import CommentController from '../controllers/CommentController';

const articleRouter = Router();

articleRouter.post('/', userAuthenticate, ArticleValidation.validateCreateArticle, ArticleController.createArticle);

articleRouter.put('/:slug', userAuthenticate, ArticleValidation.validateUpdateArticle, ArticleController.updateArticle);

articleRouter.delete('/:slug', userAuthenticate, ArticleController.removeArticle);

articleRouter.post('/:slug/comments', userAuthenticate, CommentValidation.validateComment, CommentController.createComment);

articleRouter.get('/:slug/comments', userAuthenticate, CommentController.getComments);

articleRouter.get('/:slug/comments/:id', userAuthenticate, CommentController.getComment);

articleRouter.put('/:slug/comments/:id', userAuthenticate, CommentValidation.validateComment, CommentController.updateComment);

articleRouter.delete('/:slug/comments/:id', userAuthenticate, CommentController.deleteComment);

export default articleRouter;
