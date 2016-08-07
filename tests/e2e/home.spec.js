
describe('Home', function () {

  var server;

  beforeEach(function(done) {
    server = require('../../bin/www');
    done();
  });

  it('should respond with a title on / GET', function(done) {
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

  it('should respond with a title on / GET 2', function(done) {
    chai.request(server)
      .get('/')
      .end(function(err, res) {
        res.should.have.status(200);
        done();
      });
  });

  it('should respond with a title on / GET 3', function(done) {
    chai.request(server)
      .get('/')
      .end(function(err, res) {
        res.should.have.status(200);
        done();
      });
  });
});
