var express = require('express');
var router = express.Router();
var Ware = require('../models/wareModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  Ware.find({}, function(err, records) {
    if (err) return res.status(422).send('Problem loading the wares records:', err.message);

    res.render('system/show', {
      title: 'System',
      name: 'Earth',
      subTitle: 'the Sol System',
      population: 8.54,
      wares: records});
  });
});

module.exports = router;
