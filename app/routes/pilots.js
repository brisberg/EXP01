var express = require('express');
var router = express.Router();
var PilotModel = require('../models/pilotModel');

var pilots = [
  { id: 1, name: 'Brennen'},
  { id: 2, name: 'Xin\'ui'},
  { id: 3, name: 'Karas'}
];

/* GET pilot listing. */
router.get('/list', function(req, res, next) {
  PilotModel.find({}, function(err, records) {
    if (err) return res.status(422).send('Problem loading the records:', err.message);

    res.render('pilot/pilot', { title: 'Pilot List', pilots: records });
  })
});

router.get('/:id', function(req,res,next) {
  var pilot_id = req.params.id;

  PilotModel.findById(id, function(err, pilot) {
    if (err) return res.status(422).send('Problem loading the pilot:', error.message);
    if (!pilot) return res.status(404).send('Couldn\'nt find the pilot');

    res.send(pilot)
  })
});

module.exports = router;
