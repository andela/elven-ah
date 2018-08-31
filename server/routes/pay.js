import { Router } from 'express';
import PaymentController from '../controllers/PaymentController';
import isLoggedIn from '../middlewares/isLoggedIn';

const payRouter = Router();

// Search routes will be added here
payRouter.get('/', isLoggedIn, PaymentController.ValidatePayment);

export default payRouter;
