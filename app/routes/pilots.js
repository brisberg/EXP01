var express = require('express');
var router = express.Router();
var logger = require('winston');
var Pilot = require('../models/pilotModel');

/* GET pilot listing. */
router.get('/list', function (req, res, next) {
    logger.debug('Router: /pilots/list');
    Pilot.find({}, function (err, records) {
        if (err) return res.status(422).send('Problem loading the records:', err.message);

        res.render('pilot/list', {title: 'Pilot List', pilots: records});
    });
});

/* GET specific pilot. */
router.get('/:id', function (req, res, next) {
    logger.debug('Router: /pilots/' + req.params.id);
    var pilot_id = req.params.id;

    Pilot.findById(pilot_id).populate('inventory.ware').exec(function (err, pilot) {
        if (err) return res.status(422).send('Problem loading the pilot:', error.message);
        if (!pilot) return res.status(404).send('Couldn\'t find the pilot');

        logger.info("" + pilot.inventory);
        res.render('pilot/show', {title: 'Pilot', pilot: pilot});
    });
});

module.exports = router;
