import models from '../models';

const { Payment } = models;
/**
  * This middleware intercepts the request and checks that the request
  * contains a payment reference in the query parameter.
  * @param {object} req the request object
  * @param {object} res the response object
  * @param {object} next the next middleware function

  */
const checkReference = (req, res, next) => {
  const reference = req.query.ref;
  if (!reference) {
    return res.status(400).json({
      status: 'fail',
      message: 'No payment reference provided'
    });
  }

  /**
  * This function intercepts the request and checks that the payment reference
  * in the query parameter hasn't been used.
  */
  Payment.findOne({ where: { transactionReference: reference } })
    .then((findReference) => {
      if (findReference) {
        return res.status(400).json({
          status: 'fail',
          message: 'This payment reference has already been used'
        });
      }
      return next();
    });
};

export default checkReference;
