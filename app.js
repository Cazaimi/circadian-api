const _ = require('lodash'),
  express = require('express'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  logger = require('morgan'),
  locals = require(path.join(__dirname, '/config/locals')),

// Change later.
  indexRouter = require('./config/routes/index');
// const usersRouter = require('./config/routes/users');

  app = express();

  console.log('path.join(__dirname, /config/routes/hourdata):', path.join(__dirname, '/config/routes/hourdata'));

  hourData = require(path.join(__dirname, '/config/routes/hourdata.js'));

_.assign(app.locals, locals);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

console.log('hourdata:', hourData);

// app.use('hourdata', hourData);
app.use('/hourdata', hourData);

module.exports = app;
