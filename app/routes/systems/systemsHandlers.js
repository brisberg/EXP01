var System = require('../../models/systemModel');
var Ware = require('../../models/wareModel');

module.exports.listSystems = function(req, res, next) {
  System.find({}, function(err, records) {
    if (err) return next(err);

    res.render('system/list', { title: 'System List', systems: records });
  });
};

module.exports.getSystem = function(req, res, next) {
  var system_id = req.params.id;

  System.findById(system_id).populate('wares').exec(function(err, record) {
    if (err) return next(err);
    if (!record) return res.status(404).send('Couldn\'t find the system');

      res.render('system/show', { title: 'System', system:record });
  });
};

module.exports.trade = function(req, res, next) {
  var system_id = req.params.id;

  System.findById(system_id).populate('wares').exec(function(err, record) {
    if (err) return next(err);
    if (!record) return res.status(404).send('Couldn\'t find the system');

    res.status(302).redirect('/system/list');
  });
};
