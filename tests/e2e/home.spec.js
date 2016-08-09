
describe('Home', function () {

  var server;

  before(function(done) {
    this.timeout(3000);
    server = require('../../bin/server.js').initServer(done);
  });

  after(function() {
    server.close();
  });

  it('should respond with html on / GET', function(done) {
    chai.request(server)
      .get('/')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.have.property('type');
        res.type.should.equal('text/html');
        // res.body.head.title.should.equal('Space Game');
        done();
      });
  });
});
