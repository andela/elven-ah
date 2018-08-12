import { } from 'dotenv/config';
import methodOverride from 'method-override';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import passport from 'passport';
import router from './routes';

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

app.use('/api/', (req, res) => {
  res.status(200).send({
    url: `${req.protocol}://${req.headers.host}`,
    status: 'success',
    message: 'Welcome to Author\'s Haven API',
  });
});

// catch un-available routes
app.all('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route unavailable on this server',
  });
});

// / catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handlers

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

// finally, let's start our server...
export const server = app.listen(PORT);

export default app;
