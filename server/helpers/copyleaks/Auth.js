import httpClient from 'request-promise';
import { } from 'dotenv/config';

/**
 * This class contains all the methods responsible for copyleaks authentication
 */
class Auth {
  constructor(email, apiKey) {
    this.options = {
      method: 'POST',
      uri: 'https://api.copyleaks.com/v1/account/login-api',
      body: {
        Email: email,
        ApiKey: apiKey,
      },
      json: true,
    };
    this.accessToken = {};
    this.login();
  }

  /**
   * returns the access token gotten after login
   */
  get accesstoken() {
    return this.accessToken.access_token;
  }

  /**
   * logs into the copyleaks api to get an access token
   */
  login() {
    httpClient(this.options)
      .then((response) => {
        this.accessToken = response;
      })
      .catch(error => error);
  }
}

export default new Auth(process.env.COPYLEAKS_EMAIL, process.env.COPYLEAKS_KEY);
