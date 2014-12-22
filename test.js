/**
 * Module dependencies
 */

var should = require('should');
var wayfarer = require('./index.js');

/**
 * Test
 */

describe('wayfarer()', function () {
  it('should initialize with empty properties', function() {
    var router = wayfarer();
    router.defaultPath.should.be.empty;
  });
});

describe('.path()', function () {
  it('should catch type errors', function () {
    var router = wayfarer();
    router.path.bind(router, 123)
      .should.throw('Path should be a string');
    router.path.bind(router, '/hi', 123)
      .should.throw('Callback should be a function');
    router.path.bind(router, '/hi', function(){})
      .should.not.throw();
  });
  it('should set a default path', function() {
    var router = wayfarer({ default: '/404' });
    router.defaultPath.should.eql('/404');
  });
});

describe('.match()', function () {
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

  it('should match the default path if no other paths match', function (done) {
    var router = wayfarer({ default: '/404' });
    router
      .path('/hello', function() {})
      .path('/howdy', function() {})
      .path('/404', function() {done()})

    router.match('/anotherPath');
  });

  it('should not match queryStrings', function(done) {
    var router = wayfarer({ default: '/404' });
    router
      .path('/hello', function() {done()})
      .path('/howdy', function() {})
      .path('/404', function() {});

    router.match('/hello?hello=false');
  });
});

describe('aliases', function() {
  it('.route == .path', function() {
    var router = wayfarer();
    router.path.should.eql(router.route);
  });
});
