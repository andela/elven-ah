/**
  * This middleware intercepts the request and checks that the request
  * contains and x-access-token in the query parameter.
  * The token must be valid for the request to proceed beyond here.
  * This middleware expects the token to contain a user object.
  * @param {object} req the request object
  * @param {object} res the response object
  * @param {object} next the next middleware function

  */
const checkToken = (req, res, next) => {
  const token = req.query.tokenId;
  if (!token) {
    return res.status(401).send({
      errors: {
        token: [
          'Unauthorized access!',
        ],
      },
    });
  }

  return next();
};

export default checkToken;
