
import { Router } from 'express';
import FollowController from '../controllers/FollowController';
import isLoggedIn from '../middlewares/isLoggedIn';

const followRouter = Router();

followRouter.post('/follow/:id', isLoggedIn, FollowController.createAuthorsFollower);

followRouter.get('/follower', isLoggedIn, FollowController.getAuthorsFollowers);

followRouter.get('/following', isLoggedIn, FollowController.getAuthorsFollowee);

followRouter.delete('/follow/:id', isLoggedIn, FollowController.unfollowAuthor);

export default followRouter;
