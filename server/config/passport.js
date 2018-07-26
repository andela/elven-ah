import passport from 'passport';
import local from 'passport-local';

const LocalStrategy = local.Strategy;

passport.use(
  new LocalStrategy(
    // To be implemented
  ),
);
