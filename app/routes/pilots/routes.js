var express = require('express');
var router = express.Router();

var pilots = require('./handlers.js');

/* GET pilot list. */
router.get('/list', pilots.listPilots);

/* GET specific pilot. */
router.get('/:id', pilots.getPilot);

module.exports = router;
