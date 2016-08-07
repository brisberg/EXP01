var express = require('express');
var router = express.Router();

router.use('/', require('./home/routes.js'));
router.use('/pilot', require('./pilots/routes.js'));
router.use('/system', require('./systems/routes.js'));
router.use('/map', require('./map/routes.js'));
router.use('/user', require('./users/routes.js'));

module.exports = router;
