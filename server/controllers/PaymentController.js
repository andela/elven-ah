import RavePay from 'ravepay';
import { } from 'dotenv/config';
import models from "../models";

const { User } = models;
const PUBLIC_KEY = process.env.RAVE_PUBLIC_KEY
const SECRET_KEY = process.env.RAVE_SECRET_KEY;
/**
 * This class handles all authentication operations
 * such as signup, login and OAuth.
 */
class PaymentController {
  /**
   * @description Checks which property of the user exists already
   * @param {Object} user The user object to be compared
   * @param {String} email The email to be compared
   * @param {String} username The username to be compared
   * @returns Returns a message object specifying which property of
   * the user is present in the user object
   */

  static ValidatePayment(req, res, next) {
    const rave = new RavePay(PUBLIC_KEY, SECRET_KEY, false); 
    const reference = req.query.ref;
    const transactionReference = {
      flw_ref: reference,
    };
    rave.Status.requery(transactionReference)
    .then(response => {
      if (response.body.data.status === 'successful') {
        return res.status(200).json({
          status: 'success',
          message: 'Upgrade Successful',
        });
      }
      return res.status(400).json({
        status: 'fail',
        message: 'Payment upgrade process failed. Kindly contact the helpdesk team.',      
      });
    })
    .catch(err => {
      res.status(400).json({
        status: 'fail',
        message: 'Error from Payment Processor',
        err: err.message,
      });
    })
  }
}

export default PaymentController;
