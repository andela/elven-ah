import dotenv from 'dotenv';

dotenv.config();

const strategies = {
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://authors-haven-staging.herokuapp.com/api/auth/google/callback',
  },
  facebook: {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: 'https://authors-haven-staging.herokuapp.com/api/auth/facebook/callback',
  },
  twitter: {
    consumerKey: 'get_your_own',
    consumerSecret: 'get_your_own',
    callbackURL: '/api/auth/twitter/callbackssss',
  },
};

export default strategies;
