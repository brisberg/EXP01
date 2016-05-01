/**
 * Created by Brandon Risberg on 4/30/2016.
 */

var express = require('express');
var router = express.Router();
var User = require('../models/userModel');

/* GET home page. */
router.get('/signup', function(req, res, next) {
    res.render('users/signup');
});

module.exports = router;

router.post('/signupaction', function(req, res, next) {
    var u = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    u.save(function(err) {
        if (err) {
            res.status(422).send('Problem: ' + err.message);
        } else {
            res.status(200).send('welcome to the game.');
        }
    });
});