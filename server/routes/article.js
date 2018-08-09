import { Router } from 'express';
import ArticleController from '../controllers/ArticleController';
import userAuthenticate from '../middlewares/isLoggedIn';
import ArticleValidation from '../middlewares/validations/ArticleValidation';

const articleRouter = Router();

articleRouter.post('/', userAuthenticate, ArticleValidation.validateCreateArticle, ArticleController.createArticle);

articleRouter.put('/:slug', userAuthenticate, ArticleValidation.validateUpdateArticle, ArticleController.updateArticle);

articleRouter.delete('/:slug', userAuthenticate, ArticleController.removeArticle);

export default articleRouter;
