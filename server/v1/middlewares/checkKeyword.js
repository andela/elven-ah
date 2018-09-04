/**
  * This middleware intercepts the request and checks that the request
  * contains a search keyword in the query parameter.
  * @param {object} req the request object
  * @param {object} res the response object
  * @param {object} next the next middleware function

  */
const checkKeyword = (req, res, next) => {
  const keyword = req.query.q;
  if (keyword === undefined || keyword === '' || keyword == null) {
    return res.status(400).json({
      status: 'fail',
      message: 'Please enter a search keyword'
    });
  }
  return next();
};

export default checkKeyword;
