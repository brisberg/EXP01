var express = require('express');
var router = express.Router();

var maps = require('./handlers.js');

/* GET map list. */
router.get('/', maps.getMaps);

module.exports = router;
