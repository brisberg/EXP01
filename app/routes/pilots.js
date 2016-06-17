var express = require('express');
var logger = require('winston');
var router = express.Router();
var Pilot = require('../models/pilotModel');

/* GET pilot listing. */
router.get('/list', function (req, res, next) {
    Pilot.find({}, function (err, records) {
        if (err) return next(err);

        res.render('pilot/list', {title: 'Pilot List', pilots: records});
    });
});

/* GET specific pilot. */
router.get('/:id', function (req, res, next) {
    var pilot_id = req.params.id;

    Pilot.findById(pilot_id).populate('inventory.ware').exec(function (err, pilot) {
        if (err) return next(err);
        if (!pilot) return next(err);

        logger.debug(pilot.inventory);
        res.render('pilot/show', {title: 'Pilot', pilot: pilot});
    });
});

module.exports = router;
