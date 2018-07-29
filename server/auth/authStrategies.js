import passport from 'passport';
import google from 'passport-google-oauth20';
import facebook from 'passport-facebook';
import AuthController from '../controllers/AuthController';
import config from '../config/passport';
import init from './init';

const GoogleStrategy = google.Strategy;
const FacebookStrategy = facebook.Strategy;

passport.use(new GoogleStrategy({
  clientID: config.google.clientID,
  clientSecret: config.google.clientSecret,
  callbackURL: config.google.callbackURL,
  scope: ['profile', 'email'],
}, AuthController.googleCallback));

passport.use(new FacebookStrategy({
  clientID: config.facebook.clientID,
  clientSecret: config.facebook.clientSecret,
  callbackURL: config.facebook.callbackURL,
  profileFields: ['id', 'emails', 'name'],
}, AuthController.facebookCallback));

// serialize user into the session
init();

export default passport;
