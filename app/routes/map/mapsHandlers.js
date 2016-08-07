var getMaps = function(req, res, next) {
  res.render('map', { title: 'System', name: 'Earth', subTitle: 'the Sol System', wares: ['Trillium', 'Dalaxian Wheat', 'Microchips']});
};

module.exports = getMaps;
