import RavePay from 'ravepay';
import { } from 'dotenv/config';
import models from '../models';

const { Payment } = models;
const PUBLIC_KEY = process.env.RAVE_PUBLIC_KEY;
const SECRET_KEY = process.env.RAVE_SECRET_KEY;
const SUBSCRIPTION_RATE = parseInt(process.env.MONTHLY_SUBSCRIPTION_RATE, 10);
/**
 * This class handles all payment process of the application
 */
class PaymentController {
  /**
  * @description Validates the user payment information and upgrade if successful
  * @param {object} req the request object
  * @param {object} res the response object
  * @returns Returns a message object specifying the state of
  * the user account upgrade
  */

  static ValidatePayment(req, res) {
    const rave = new RavePay(PUBLIC_KEY, SECRET_KEY, false);
    const reference = req.query.ref;
    const transactionReference = {
      flw_ref: reference,
    };
    rave.Status.requery(transactionReference)
      .then((response) => {
        const { id: userId, email } = req.user;
        const transactionValues = response.body.data;
        const subscriptionType = transactionValues.amount === SUBSCRIPTION_RATE ? 'month' : 'annual';
        if (transactionValues.status === 'successful' && transactionValues['customer.email'] === email) {
          return PaymentController.ProcessUpgrade({ userId, reference, subscriptionType }, res);
        }
        return res.status(400).json({
          status: 'fail',
          message: 'Your upgrade process failed. Kindly contact the helpdesk team.',
        });
      })
      .catch(() => {
        res.status(400).json({
          status: 'fail',
          message: 'Error from Payment Processor',
        });
      });
  }

  static ProcessUpgrade(paymentInfo, res) {
    const { userId, reference, subscriptionType } = paymentInfo;
    Payment.findOne({ where: { userId } })
      .then((upgrade) => {
        if (!upgrade) {
          Payment.create({
            userId,
            transactionReference: reference,
            subscriptionType,
            dueDate: Date.now() + (30 * 86400000),
          });
          return PaymentController.PaymentResponse(res);
        }
        Payment.update(
          {
            transactionReference: reference,
            subscriptionType,
            dueDate: Date.now() + (30 * 86400000),
          },
          { where: { userId }, }
        );
        return PaymentController.PaymentResponse(res);
      })
      .catch(err => res.status(400).json({
        status: 'error',
        err: err.message,
      }));
  }

  static PaymentResponse(res) {
    return res.status(200).send({
      status: 'success',
      message: 'You have been upgraded to a premium account.',
    });
  }
}

export default PaymentController;
