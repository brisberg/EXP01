var sinon = require('sinon');

var getHome = require('../../../../app/routes/home/getHome.js');

describe('Home Route GET', function() {
  it('should render the index template for / GET', function() {
    var req,res,spy;

    req = res = {};
    spy = res.render = sinon.spy();

    getHome(req, res);
    expect(spy.calledOnce).to.equal(true);
  });
});
