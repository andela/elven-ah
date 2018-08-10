import { Router } from 'express';
import ArticleController from '../controllers/ArticleController';
import userAuthenticate from '../middlewares/isLoggedIn';
import ArticleValidation from '../middlewares/validations/ArticleValidation';
import isUser from '../middlewares/isUser';
import CommentValidation from '../middlewares/validations/CommentValidation';
import CommentController from '../controllers/CommentController';

const articleRouter = Router();

articleRouter.post('/', userAuthenticate, ArticleValidation.validateCreateArticle, ArticleController.createArticle);

articleRouter.put('/:slug', userAuthenticate, ArticleValidation.validateUpdateArticle, ArticleController.updateArticle);

articleRouter.delete('/:slug', userAuthenticate, ArticleController.removeArticle);

articleRouter.post('/articles/:slug/comments', userAuthenticate, CommentValidation.validateNewComment, CommentController.createComment);

articleRouter.get('/articles/:slug/comments', userAuthenticate, CommentController.getComments);

export default articleRouter;
