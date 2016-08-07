var express = require('express');
var router = express.Router();

router.use('/', require('./home/routes.js'));
router.use('/pilot', require('./pilots/pilots.js'));
router.use('/system', require('./systems/systems.js'));
router.use('/map', require('./map/map.js'));
router.use('/user', require('./users/users.js'));

module.exports = router;
