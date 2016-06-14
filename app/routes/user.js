/**
 * Created by Brandon Risberg on 4/30/2016.
 */

var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/userModel');

router.post('/signupaction', function(req, res, next) {
    var u = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: req.body.password
    });
    u.save(function(err) {
        if (err) {
            res.status(422).send('Problem: ' + err.message);
        } else {
            res.status(200).send('Welcome to the game.');
        }
    });
});

/* GET The registration page */
router.get('/register', function(req, res) {
    res.render('users/signup', { });
});

router.post('/register', function(req, res) {
    User.register(new User({
        username : req.body.username,
        email : req.body.email
    }),
        function(err, user) {
        if (err) {
            res.status(422).send('Problem: ' + err.message);
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('users/login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
