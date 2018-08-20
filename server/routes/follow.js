
import { Router } from 'express';
import FollowController from '../controllers/FollowController';
import isLoggedIn from '../middlewares/isLoggedIn';

const FollowRouter = Router();

FollowRouter.post('/follow/:id', isLoggedIn, FollowController.createAuthorsFollower);

FollowRouter.get('/follower', isLoggedIn, FollowController.getAuthorsFollowers);

FollowRouter.get('/following', isLoggedIn, FollowController.getAuthorsFollowee);

FollowRouter.delete('/follow/:id', isLoggedIn, FollowController.unfollowAuthor);

export default FollowRouter;
