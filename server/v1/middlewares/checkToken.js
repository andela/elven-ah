import JwtHelper from '../helpers/JwtHelper';
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
  const decoded = JwtHelper.verifyToken(req.query.tokenId);
  if (!token) {
    return res.status(401).send({
      status: 'error',
      message: 'Please click the password reset link sent to your email',
    });
  }
  if (!decoded) {
    return res.status(401).send({
      status: 'error',
      message: 'Password Reset link is invalid or has expired. Please request a new password reset.',
    });
  }

  req.decoded = decoded;
  return next();
};

export default checkToken;
