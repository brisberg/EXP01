var logger = require('winston');
var Pilot = require('../../models/pilotModel');

module.exports.listPilots = function (req, res, next) {
    Pilot.find({}, function (err, records) {
        if (err) return next(err);

        res.render('pilot/list', {title: 'Pilot List', pilots: records});
    });
};

module.exports.getPilot = function (req, res, next) {
    var pilot_id = req.params.id;

    Pilot.findById(pilot_id).populate('inventory.ware').exec(function (err, pilot) {
        if (err) return next(err);
        if (!pilot) return next(err);

        logger.debug(pilot.inventory);
        res.render('pilot/show', {title: 'Pilot', pilot: pilot});
    });
};
