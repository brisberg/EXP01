var express = require('express');
var router = express.Router();

var home = require('./handlers.js');

/* GET home page. */
router.get('/', home.getHome);

module.exports = router;
