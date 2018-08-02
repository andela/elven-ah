
import { Router } from 'express';
import ProfileController from '../controllers/ProfileController';
import UserValidation from '../middlewares/validations/UserValidation';
import isLoggedIn from '../middlewares/isLoggedIn';

const profileRouter = Router();

// Profile routes will be added here
profileRouter.get('/', isLoggedIn, ProfileController.getUserProfile);
profileRouter.put('/', isLoggedIn,
  UserValidation.updateUserProfile,
  ProfileController.userEmailExists,
  ProfileController.updateUserProfile);

export default profileRouter;
