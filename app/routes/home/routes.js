var express = require('express');
var router = express.Router();

var getHome = require('./homeHandlers.js');

/* GET home page. */
router.get('/', getHome);

module.exports = router;
