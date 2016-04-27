var express = require('express');
var router = express.Router();

var pilots = ['Brennen', 'Xin\'ui', 'Karas'];

/* GET pilot listing. */
router.get('/list', function(req, res, next) {
  res.render('pilot/pilot', { title: 'Pilot List', pilots: pilots });
});

router.get('/:id', function(req,res,next) {
  var pilot_id = req.params.id;
  res.send(pilots[pilot_id])
});

module.exports = router;
