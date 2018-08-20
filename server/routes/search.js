
import { Router } from 'express';
import SearchController from '../controllers/SearchController';

const searchRouter = Router();

// Search routes will be added here
searchRouter.get('/', SearchController.searchProcess);

export default searchRouter;
