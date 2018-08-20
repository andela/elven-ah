import httpClient from 'request-promise';
import { } from 'dotenv/config';

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

  get accesstoken() {
    return this.accessToken.access_token;
  }

  login() {
    httpClient(this.options)
      .then((response) => {
        this.accessToken = response;
      })
      .catch(error => error);
  }

  validToken() {
    return new Date(this.accessToken.expires).getTime() > new Date().getTime();
  }
}

export default new Auth(process.env.COPYLEAKS_EMAIL, process.env.COPYLEAKS_KEY);
