/**
 * Module dependencies
 */
 
var should = require('should');
var wayfarer = require('./index.js');
 
/**
 * Test
 */
 
describe('Wayfarer', function () {
  it('should catch type errors', function () {
    var router = wayfarer();
 
    router.path.bind(router, 123)
      .should.throw('Path should be a string');
    router.path.bind(router, '/hi', 123)
      .should.throw('Callback should be a function');
    router.path.bind(router, '/hi', function(){})
      .should.not.throw();
  });
 
  it('should match simple routes', function (done) {
    var router = wayfarer();
    router
      .path('/hello', function(){done()})
      .path('/hi', function(){});

    router.match('/hello');
  });
 
  it('should match dynamic routes', function (done) {
    var router = wayfarer();
    router
      .path('/hello', function() {})
      .path('/:user', function() {done()});

    router.match('/tobi');
  });
});