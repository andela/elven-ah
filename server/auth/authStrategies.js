import passport from 'passport';
import google from 'passport-google-oauth20';
import facebook from 'passport-facebook';
import { MockStrategy, setupSerializeAndDeserialize } from 'passport-mock-strategy';
import AuthController from '../controllers/AuthController';
import config from '../config/passport';
import init from './init';

if (process.env.NODE_ENV === 'test') {
  passport.use(new MockStrategy({
    user: {
      id: 1,
      firtsName: 'lara',
      lastName: 'simbi',
      email: 'fit@gmail.com'
    }
  }, (user, done) => done(null, user)));
  setupSerializeAndDeserialize(passport, null, (id, done) => {
    done(null, id);
  });
}

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

init();

export default passport;
