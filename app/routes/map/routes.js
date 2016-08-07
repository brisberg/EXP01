var express = require('express');
var router = express.Router();

var getMaps = require('./mapsHandlers.js');

/* GET map list. */
router.get('/', getMaps);

module.exports = router;
