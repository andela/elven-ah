import jwt from 'jsonwebtoken';

const secret = process.env.TOKEN_SECRET;
/**
  * This helper class contains the methods for signing and
  * verifying jwt tokens used by the API
  */
export default class JwtHelper {
  /**
  * This method takes a payload and a duration for which the token
  * is expected to be valid and signs a jwt token.
  * @param {object} payload contains the user information to be signed into the token
  * @param {number} expiresIn the validity period of the token
  * @returns {string} the signed jwt token
  */
  static createToken(payload, expiresIn) {
    return jwt.sign(payload, secret, {
      expiresIn,
    });
  }

  /**
  * This method takes a token and returns the decoded payload.
  * @param {object} token the jwt token
  * @return {object} the decoded token payload
  */
  static verifyToken(token) {
    return jwt.verify(token, secret, (err, decoded) => {
      if (decoded) {
        return decoded;
      }
      return false;
    });
  }
}
