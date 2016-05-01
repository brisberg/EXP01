var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('system/show', {
    title: 'System',
    name: 'Earth',
    subTitle: 'the Sol System',
    population: 8.54,
    wares: [
      {name:'Trillium', baseValue:400},
      {name:'Dalaxian Wheat', baseValue:50},
      {name:'Microchips', baseValue:1000}
    ]});
});

module.exports = router;
