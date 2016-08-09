module.exports.getHome = function(req, res, next) {
  res.render('home', { title: 'Space Game' });
};
