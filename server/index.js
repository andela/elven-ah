import { } from 'dotenv/config';
import methodOverride from 'method-override';
import morgan from 'morgan';
import passport from 'passport';
import bodyParser from 'body-parser';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import router from './routes';
import JwtHelper from './helpers/JwtHelper';

const env = process.env.NODE_ENV;

// Create global app object
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Normal express config defaults
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(methodOverride());
app.use(express.static(`${__dirname}/public`));

app.use(
  session({
    secret: process.env.SESSION_KEY,
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', router);

// catch un-available routes
app.all('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Oh-oh! Seems like the page you requested does not exist. Please check the url again.',
  });
});

// no stack traces leaked to user in production
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: env === 'production' ? {} : err,
    },
  });
});

<<<<<<< HEAD
=======
const token = JwtHelper.createToken({
  user: {
    id: 1,
    username: 'unique',
    email: 'testseeder@test.com'
  }
}, '720h');

console.log(token);
>>>>>>> feat(tagArticle): implement user tag article
// finally, let's start our server...
export const server = app.listen(PORT);

export default app;
