var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var winston = require('winston');
var expressWinston = require('express-winston');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');

var packageJson = require('./package.json');

var app = express();

//app helpers
var version = packageJson.version;
var root = __dirname;
var appPath = function(path) {
  return root + '/' + path;
};
var model = function(path) {
  return require(appPath("app/models/" + path));
};
var route = function(path) {
  return require(appPath("app/routes/" + path));
};
var util = function(path) {
  return require(appPath("app/utils/" + path));
};
var helper = function(path) {
  return require(appPath("app/helpers/" + path));
};

// setup logger
if (app.get('env') === 'development') {
  winston.level = 'debug';
}
winston.add(winston.transports.File, { filename: 'winston.log' });

// expressWinston request logger middleware (before the router)
app.use(expressWinston.logger({
      transports: [
        // new winston.transports.Console({
        //   json: true,
        //   colorize: true
        // }),
        new winston.transports.File({ filename: 'winston.log' })
      ],
      meta: true, // optional: control whether you want to log the meta data about the request (default to true)
      msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
      expressFormat: true, // Use the default Express/morgan request formatting, with the same colors. Enabling this will override any msg and colorStatus if true. Will only output colors on transports with colorize set to true
      colorStatus: true, // Color the status code, using the Express/morgan color palette (default green, 3XX cyan, 4XX yellow, 5XX red). Will not be recognized if expressFormat is true
      ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
    }));

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');
app.set('view options', { pretty: app.get('env') === 'development'});

app.use(favicon(path.join(__dirname, 'app/public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app/public')));

// set up passport
//require('./app/config/passport')(passport);
app.use(session({ secret : 'thisisatestsecret' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', route('routes'));

// express winston error logger (after the router)
app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    }),
    new winston.transports.File({ filename: 'errors.log' })
  ]
}));

// Passport config
require('./app/config/passport.js');

// db bootstrap
require('./app/config/database')(process.env.DATABASE_URL || 'mongodb://localhost/exp01');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
