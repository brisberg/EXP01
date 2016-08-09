var sinon = require('sinon');

var homeHandlers = require('../../../../app/routes/home/handlers.js');

describe('Home Route GET', function() {
  it('should render the index template for / GET', function() {
    var req,res,spy;

    req = res = {};
    spy = res.render = sinon.spy();

    homeHandlers.getHome(req, res);

    expect(spy.calledOnce).to.equal(true);
    assert(spy.calledWith('home', { title: 'Space Game' }));
  });
});
