import { Router } from 'express';
import PaymentController from '../controllers/PaymentController';
import isLoggedIn from '../middlewares/isLoggedIn';
import checkReference from '../middlewares/checkReference';

const payRouter = Router();

// Search routes will be added here
payRouter.get('/', isLoggedIn, checkReference, PaymentController.checkPaymentType);

export default payRouter;
