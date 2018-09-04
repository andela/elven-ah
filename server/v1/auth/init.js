import passport from 'passport';

const init = () => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });
};

export default init;
