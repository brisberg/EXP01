/**
 * Created by Brandon Risberg on 4/30/2016.
 */

var logger = require('winston');
var passport = require('passport');
var User = require('../../models/userModel');

module.exports.signup = function(req, res, next) {
    var u = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: req.body.password
    });
    u.save(function(err) {
        if (err) {
            logger.error('Couldn\'t create user: ' + err.message);
            res.status(422).send('Problem: ' + err.message);
        } else {
            res.status(200).send('Welcome to the game.');
        }
    });
};

module.exports.getRegister = function(req, res) {
    res.render('users/signup', { });
};

module.exports.postRegister = function(req, res) {
    User.register(new User({
        username : req.body.username,
        email : req.body.email
    }),
        function(err, user) {
        if (err) {
            logger.error('Couldn\'t create user: ' + err.message);
            res.status(422).send('Problem: ' + err.message);
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
};

module.exports.getLogin = function(req, res) {
    res.render('users/login', { user : req.user });
};

module.exports.postLogin = function(req, res) {
    res.redirect('/');
};

module.exports.logout = function(req, res) {
    req.logout();
    res.redirect('/');
};
