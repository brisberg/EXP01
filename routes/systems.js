var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('system', { name: 'Earth', subTitle: 'the Sol System', wares: ['Trillium', 'Dalaxian Wheat', 'Microchips']});
});

module.exports = router;
