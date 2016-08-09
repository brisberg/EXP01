var express = require('express');
var router = express.Router();

var systems = require('./handlers.js');

/* GET list systems. */
router.get('/list', systems.listSystems);

/* GET specific systems. */
router.get('/:id', systems.getSystem);

/* POST trade with a systems. */
router.post('/:id/trade', systems.trade);

module.exports = router;
