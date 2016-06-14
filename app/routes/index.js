var express = require('express');
var logger = require('winston');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  logger.debug("Router: /");
  res.render('index', { title: 'Space Game' });
});

module.exports = router;
