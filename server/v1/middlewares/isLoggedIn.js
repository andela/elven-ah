import JwtHelper from '../helpers/JwtHelper';

/**
  * This middleware intercepts the request and checks that the request
  * contains and x-access-token in the header.
  * The token must be valid for the request to proceed beyond here.
  * This middleware expects the token to contain a user object.
  * @param {object} req the request object
  * @param {object} res the response object
  * @param {object} next the next middleware function
  * @returns {user} the user object
  */
const isLoggedIn = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).send({
      errors: {
        token: [
          'You must be logged in to perform this operation',
        ],
      },
    });
  }
  const decoded = await JwtHelper.verifyToken(token);
  if (decoded) {
    const { user } = decoded;
    req.user = user;
    return next();
  }
  return res.status(401).send({
    errors: {
      token: [
        'Your access token is invalid or expired. Please login again',
      ],
    },
  });
};

export default isLoggedIn;
