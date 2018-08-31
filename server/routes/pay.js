import { Router } from 'express';
import PaymentController from '../controllers/PaymentController';

const payRouter = Router();

// Search routes will be added here
payRouter.get('/', PaymentController.ValidatePayment);

export default payRouter;
