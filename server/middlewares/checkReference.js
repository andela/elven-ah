/**
  * This middleware intercepts the request and checks that the request
  * contains a payment reference in the query parameter.
  * @param {object} req the request object
  * @param {object} res the response object
  * @param {object} next the next middleware function

  */
const checkReference = (req, res, next) => {
  const reference = req.query.ref;
  if (reference === undefined || reference === '' || reference == null) {
    return res.status(400).json({
      status: 'fail',
      message: 'No payment reference provided'
    });
  }
  return next();
};

export default checkReference;
