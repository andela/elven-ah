import { Router } from 'express';
import ArticleController from '../controllers/ArticleController';
import userAuthenticate from '../middlewares/isLoggedIn';
import ArticleValidation from '../middlewares/validations/ArticleValidation';

const articleRouter = Router();

articleRouter.post('/articles', userAuthenticate, ArticleValidation.validateCreateArticle, ArticleController.createArticle);

articleRouter.put('/articles/:slug', userAuthenticate, ArticleValidation.validateUpdateArticle, ArticleController.updateArticle);

articleRouter.delete('/articles/:slug', userAuthenticate, ArticleController.removeArticle);

export default articleRouter;
