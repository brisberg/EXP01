var express = require('express');
var router = express.Router();
var passport = require('passport');

var users = require('./usersHandlers.js');

/* POST signup new user. */
router.post('/signupaction', users.signup);

/* GET registration page. */
router.get('/register', users.getRegister);

/* POST register action. */
router.post('/register', users.postRegister);

/* GET login page. */
router.get('/login', users.getLogin);

/* POST login action. */
router.post('/login', passport.authenticate('local'), users.postLogin);

/* GET logout user. */
router.get('/logout', users.logout);

module.exports = router;
