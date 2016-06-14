var express = require('express');
var logger = require('winston');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  logger.debug('Router: /map');
  res.render('map', { title: 'System', name: 'Earth', subTitle: 'the Sol System', wares: ['Trillium', 'Dalaxian Wheat', 'Microchips']});
});

module.exports = router;
