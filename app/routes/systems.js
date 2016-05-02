var express = require('express');
var router = express.Router();
var System = require('../models/systemModel');
var Ware = require('../models/wareModel');

/* GET system list listing. */
router.get('/list', function(req, res, next) {
  System.find({}, function(err, records) {
    if (err) return res.status(422).send('Problem loading the records:', err.message);

    res.render('system/list', { title: 'System List', systems: records });
  });
});

/* GET specific system page. */
router.get('/:id', function(req, res, next) {
  var system_id = req.params.id;

  System.findById(system_id).populate('wares').exec(function(err, record) {
    if (err) return res.status(422).send('Problem loading the system record:', err.message);
    if (!record) return res.status(404).send('Couldn\'nt find the system');

      res.render('system/show', { title: 'System', system:record });
  });
});

module.exports = router;
