const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

//Sequelize
const { sequelize } = require('./models/index');

//Check DB Connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection successful!');
  })
  .catch(() => {
    console.log('Error connecting');
  });

//Sync Models
sequelize
  .sync()
  .then(() => {
    console.log('Sync Successful!');
  })
  .catch(() => {
    console.log('Error in creating tables');
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Static files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward it to error handler
app.use(function (req, res, next) {
  const err = new Error('404 Error');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  err.status = err.status || 500;
  res.status(err.status || 500);

  // 404 errors
  if (err.status === 404) {
    res.render('page-not-found', { title: 'Page Not Found | 404 Error' });
  }

  res.locals.message = 'Server Error';
  res.locals.description = 'Sorry! There was an unexpected error on the server.';
  res.locals.error = err;
  res.render('error', { title: 'Server Error' });
});

module.exports = app;
