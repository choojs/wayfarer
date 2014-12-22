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

describe('.on()', function () {
  it('should catch type errors', function () {
    var router = wayfarer();
    router.on.bind(router, 123)
      .should.throw('Path should be a string');
    router.on.bind(router, '/hi', 123)
      .should.throw('Callback should be a function');
    router.on.bind(router, '/hi', function(){})
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
      .on('/hello', function(){done()})
      .on('/hi', function(){});

    router.match('/hello');
  });

  it('should match dynamic routes', function (done) {
    var router = wayfarer();
    router
      .on('/hello', function() {})
      .on('/:user', function() {done()});

    router.match('/tobi');
  });
  
  it('should provide param object on dynamic routes', function (done) {
    var router = wayfarer();
    router
    .path('/:user', function(param) {
      param.should.have.property('user', 'tobi');
      done();
    });
    
    router.match('/tobi');
  });

  it('should match the default path if no other paths match', function (done) {
    var router = wayfarer({ default: '/404' });
    router
      .on('/hello', function() {})
      .on('/howdy', function() {})
      .on('/404', function() {done()})

    router.match('/anotherPath');
  });

  it('should not match queryStrings', function(done) {
    var router = wayfarer({ default: '/404' });
    router
      .on('/hello', function() {done()})
      .on('/howdy', function() {})
      .on('/404', function() {});

    router.match('/hello?hello=false');
  });
});

describe('aliases', function() {
  it('.route == .on', function() {
    var router = wayfarer()
    router.route.should.eql(router.on)
  });

  it('.path == .on', function() {
    var router = wayfarer()
    router.path.should.eql(router.on)
  });
});
