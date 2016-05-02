var express = require('express');
var router = express.Router();
var Pilot = require('../models/pilotModel');

/* GET pilot listing. */
router.get('/list', function(req, res, next) {
  Pilot.find({}, function(err, records) {
    if (err) return res.status(422).send('Problem loading the records:', err.message);

    res.render('pilot/list', { title: 'Pilot List', pilots: records });
  });
});

router.get('/:id', function(req,res,next) {
  var pilot_id = req.params.id;

  Pilot.findById(pilot_id, function(err, pilot) {
    if (err) return res.status(422).send('Problem loading the pilot:', error.message);
    if (!pilot) return res.status(404).send('Couldn\'nt find the pilot');

    res.send(pilot);
  });
});

module.exports = router;
