
import { Router } from 'express';
import ProfileController from '../controllers/ProfileController';
import isLoggedIn from '../middlewares/isLoggedIn';

const profileRouter = Router();

// Profile routes will be added here
profileRouter.get('/', isLoggedIn, ProfileController.getUserProfile);

export default profileRouter;
