const _ = require('lodash'),
  express = require('express'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  logger = require('morgan'),
  locals = require(path.join(__dirname, '/config/locals')),

  app = express(),

  hourData = require(path.join(__dirname, '/config/routes/hourdata.js')),
  aggregate = require(path.join(__dirname, '/config/routes/aggregate.js'));

_.assign(app.locals, locals);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/hourdata', hourData);
app.use('/aggregate', aggregate);

module.exports = app;
