import { } from 'dotenv/config';
import methodOverride from 'method-override';
import morgan from 'morgan';
import passport from 'passport';
import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import session from 'express-session';
import cors from 'cors';

import v1Router from './v1/routes';

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
app.use(express.static(path.join(__dirname, 'public')));


app.use(passport.initialize());
app.use(passport.session());

app.use(
  session({
    secret: process.env.SESSION_KEY,
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: false,
  }),
);

app.use('/api/v1', v1Router);

// catch un-available routes
app.all('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Oh-oh! Seems like the resource you requested does not exist. Please check the URL again.',
  });
});

// Error handler
// no stack traces leaked to user in production
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    status: 'error',
    message: err.message,
    error: env === 'production' ? {} : err,
  });
});
// finally, let's start our server...
app.listen(PORT);

export default app;
