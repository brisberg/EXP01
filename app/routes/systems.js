var express = require('express');
var router = express.Router();
var Ware = require('../models/wareModel');
var System = require('../models/systemModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  System.findOne({}, function(err, record) {
    if (err) return res.status(422).send('Problem loading the system record:', err.message);

      res.render('system/show', { title: 'System', system:record });
  }).populate('wares');
});

module.exports = router;
