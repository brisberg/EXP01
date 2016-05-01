var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var packageJson = require('./package.json');

var app = express();

//app helpers
var version = packageJson.version;
var root = __dirname;
var appPath = function(path) {
  return root + '/' + path
};
var model = function(path) {
  return require(appPath("app/models/" + path))
};
var route = function(path) {
  return require(appPath("app/routes/" + path))
};
var util = function(path) {
  return require(appPath("app/utils/" + path))
};
var helper = function(path) {
  return require(appPath("app/helpers/" + path))
};

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');
app.set('view options', { pretty: app.get('env') === 'development'});

app.use(favicon(path.join(__dirname, 'app/public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app/public')));

app.use('/', route('index'));
app.use('/pilot', route('pilots'));
app.use('/system', route('systems'));
app.use('/map', route('map'));
app.use('/signup', route('user'));


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
