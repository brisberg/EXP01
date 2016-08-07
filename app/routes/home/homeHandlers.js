getHome = function(req, res, next) {
  res.render('home', { title: 'Space Game' });
};

module.exports = getHome;
