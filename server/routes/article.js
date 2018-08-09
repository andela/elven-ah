import { Router } from 'express';
import ArticleController from '../controllers/ArticleController';
import userAuthenticate from '../middlewares/isLoggedIn';
import ArticleValidation from '../middlewares/validations/ArticleValidation';
import ArticleControllerTag from '../controllers/ArticleControllerTag';

const articleRouter = Router();

<<<<<<< HEAD
articleRouter.post('/', userAuthenticate, ArticleValidation.validateCreateArticle, ArticleController.createArticle);
=======

articleRouter.post('/articles', userAuthenticate, ArticleValidation.validateCreateArticle, ArticleControllerTag.createArticle);
>>>>>>> feat(tagArticle): implement user tag article

articleRouter.put('/:slug', userAuthenticate, ArticleValidation.validateUpdateArticle, ArticleController.updateArticle);

articleRouter.delete('/:slug', userAuthenticate, ArticleController.removeArticle);

export default articleRouter;
