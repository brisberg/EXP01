var express = require('express');
var router = express.Router();

var getHome = require('./getHome.js');

/* GET home page. */
router.get('/', getHome);

module.exports = router;
