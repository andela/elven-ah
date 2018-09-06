import RavePay from 'ravepay';
import { } from 'dotenv/config';
import models from '../models';

const { Payment, User, ArticleSubscription } = models;
const PUBLIC_KEY = process.env.RAVE_PUBLIC_KEY;
const SECRET_KEY = process.env.RAVE_SECRET_KEY;
const MONTHLY_SUBSCRIPTION_RATE = parseInt(process.env.MONTHLY_SUBSCRIPTION_RATE, 10);
const rave = new RavePay(PUBLIC_KEY, SECRET_KEY, false);

/**
 * This class handles all payment process of the application
 */
class PaymentController {
  /**
  * @description checks the payment type
  * @param {object} req the request object
  * @param {object} res the response object
  * @returns Returns a message object specifying the state of
  * the user subscription
  */

  static checkPaymentType(req, res) {
    const paymentType = req.query.type;
    return paymentType === 'upgrade'
      ? PaymentController.upgradeAccount(req, res)
      : PaymentController.articleSubscriptionPayment(req, res);
  }

  /**
  * @description this does the user account upgrade
  * @param {object} req the request object
  * @param {object} res the response object
  * @returns Returns a message object specifying the state of
  * the user account upgrade
  */

  static upgradeAccount(req, res) {
    const reference = req.query.ref;
    const transactionReference = {
      flw_ref: reference,
    };
    rave.Status.requery(transactionReference)
      .then((response) => {
        const { id: userId, email } = req.user;
        const transactionValues = response.body.data;
        const subscriptionType = transactionValues.amount === MONTHLY_SUBSCRIPTION_RATE ? 'month' : 'annual';
        if (transactionValues.status === 'successful' && transactionValues['customer.email'] === email) {
          return PaymentController
            .processAccountUpgrade({ userId, reference, subscriptionType }, res);
        }
        const message = 'Your upgrade process failed. Kindly contact the helpdesk team.';
        return PaymentController.failedPaymentResponse(message, res);
      });
  }

  /**
  * @description this processes the user account upgrade from the free account to premium account
  * @param {object} req the request object
  * @param {object} res the response object
  * @returns Returns a message object specifying the state of
  * the user account upgrade
  */
  static processAccountUpgrade(paymentInfo, res) {
    const { userId, reference, subscriptionType } = paymentInfo;
    const subscriptionDueDate = subscriptionType === 'month' ? Date.now() + (30 * 86400000) : Date.now() + (365 * 86400000);
    const createPaymentDetail = Payment.create({
      userId,
      transactionReference: reference,
      subscriptionType,
      dueDate: subscriptionDueDate,
    });
    if (createPaymentDetail) {
      PaymentController.userSubscriptionDetailUpdate(userId, subscriptionDueDate);
      const successMessage = 'Your account has been successfully ugraded to premium account';
      return PaymentController.successPaymentResponse(successMessage, res);
    }
    const failedMessage = 'Your account upgrade failed. Kindly contact our helpdesk team.';
    return PaymentController.failedPaymentResponse(failedMessage, res);
  }

  /**
  * @description this updates the due date column on the user table
  * @param {number} userId the user id
  * @param {number} subscriptionDueDate the subscription date
  */

  static userSubscriptionDetailUpdate(userId, subscriptionDueDate) {
    User.update(
      {
        subscriptionDueDate,
      },
      { where: { id: userId }, }
    );
  }


  /**
  * @description this processes a single article subscription for a user
  * @param {object} req the request object
  * @param {object} res the response object
  * @returns Returns a message object specifying the state of
  * the single article upgrade
  */

  static articleSubscriptionPayment(req, res) {
    const reference = req.query.ref;
    const { aId } = req.query;
    if (!aId) {
      return res.status(400).json({
        status: 'fail',
        message: 'Article Id cannot be empty!'
      });
    }
    if (Number.isNaN(parseFloat(aId))) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please supply a valid article id.',
      });
    }
    const transactionReference = {
      flw_ref: reference,
    };
    rave.Status.requery(transactionReference)
      .then((response) => {
        const { id: userId, email } = req.user;
        const articleId = parseInt(aId, 10);
        const transactionValues = response.body.data;
        if (transactionValues.status === 'successful' && transactionValues['customer.email'] === email) {
          ArticleSubscription.create({
            userId,
            articleId
          });
          const successMessage = 'You have been successfully subscribed to this article';
          return PaymentController.successPaymentResponse(successMessage, res);
        }
        const failedMessage = 'Your subscription for this article failed. Kindly contact our helpdesk team.';
        return PaymentController.failedPaymentResponse(failedMessage, res);
      });
  }

  /**
  * @description sends success response message to the user on successful payment processes
  * @param {string} message the response message
  * @param {object} res the response object
  */

  static successPaymentResponse(message, res) {
    return res.status(200).send({
      status: 'success',
      message,
    });
  }

  /**
  * @description sends failed response message to the user on successful payment processes
  * @param {string} message the response message
  * @param {object} res the response object
  */
  static failedPaymentResponse(message, res) {
    return res.status(400).send({
      status: 'fail',
      message,
    });
  }
}

export default PaymentController;
