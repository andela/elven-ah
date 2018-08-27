
import { Router } from 'express';
import SearchController from '../controllers/SearchController';
import checkKeyword from '../middlewares/checkKeyword';

const searchRouter = Router();

// Search routes will be added here
searchRouter.get('/', checkKeyword, SearchController.searchProcess);

export default searchRouter;
