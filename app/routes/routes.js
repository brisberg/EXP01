var express = require('express');
var router = express.Router();

var homeRouter = require('./home/routes.js');
var pilotsRouter = require('./pilots/routes.js');
var systemsRouter = require('./systems/routes.js');
var mapRouter = require('./map/routes.js');
var usersRouter = require('./users/routes.js');

router.use('/', homeRouter);
router.use('/pilot', pilotsRouter);
router.use('/system', systemsRouter);
router.use('/map', mapRouter);
router.use('/user', usersRouter);

module.exports = router;
