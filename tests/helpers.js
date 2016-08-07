global.chai = require('chai');
var chaiHttp = require('chai-http');

chai.config.includeStack = true;
chai.use(chaiHttp);

global.expect = chai.expect;
global.AssertionError = chai.AssertionError;
global.Assertion = chai.Assertion;
global.assert = chai.assert;
global.should = chai.should();

module.exports = chai;
