
import { Router } from 'express';
import ProfileController from '../controllers/ProfileController';
import UserValidation from '../middlewares/validations/UserValidation';
import isLoggedIn from '../middlewares/isLoggedIn';

const profileRouter = Router();

// Profile routes will be added here
profileRouter.get('/:username', isLoggedIn, ProfileController.getUserProfile);

profileRouter.put('/:username', isLoggedIn, UserValidation.profileValidation, ProfileController.userEmailExists, ProfileController.updateUserProfile);

export default profileRouter;
