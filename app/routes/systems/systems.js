var express = require('express');
var router = express.Router();
var System = require('../../models/systemModel');
var Ware = require('../../models/wareModel');

/* GET system list listing. */
router.get('/list', function(req, res, next) {
  System.find({}, function(err, records) {
    if (err) return next(err);

    res.render('system/list', { title: 'System List', systems: records });
  });
});

/* GET specific system page. */
router.get('/:id', function(req, res, next) {
  var system_id = req.params.id;

  System.findById(system_id).populate('wares').exec(function(err, record) {
    if (err) return next(err);
    if (!record) return res.status(404).send('Couldn\'t find the system');

      res.render('system/show', { title: 'System', system:record });
  });
});

/* POST trade with a system. */
router.post('/:id/trade', function(req, res, next) {
  var system_id = req.params.id;

  System.findById(system_id).populate('wares').exec(function(err, record) {
    if (err) return next(err);
    if (!record) return res.status(404).send('Couldn\'t find the system');

    res.status(302).redirect('/system/list');
  });
});

module.exports = router;
