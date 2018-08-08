import { Router } from 'express';
import ArticleController from '../controllers/ArticleController';
import userAuthenticate from '../middlewares/isLoggedIn';
import ArticleValidation from '../middlewares/validations/ArticleValidation';
import isUser from '../middlewares/isUser';

const articleRouter = Router();

articleRouter.post('/articles', userAuthenticate, ArticleValidation.validateCreateArticle, ArticleController.createArticle);

articleRouter.put('/articles/:slug', userAuthenticate, isUser, ArticleValidation.validateUpdateArticle, ArticleController.updateArticle);

articleRouter.delete('/articles/:slug', userAuthenticate, isUser, ArticleController.removeArticle);

export default articleRouter;
