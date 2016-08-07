var express = require('express');
var router = express.Router();

var maps = require('./mapsHandlers.js');

/* GET map list. */
router.get('/', maps.getMaps);

module.exports = router;
