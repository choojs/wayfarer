var wayfarer = require('../')
var noop = require('noop2')
var tape = require('tape')

tape('router', function (t) {
  t.test('should match a path', function (t) {
    t.plan(1)
    var r = wayfarer()
    r.on('/', function () {
      t.pass('called')
    })
    r('/')
  })

  t.test('should match a nested path', function (t) {
    t.plan(1)
    var r = wayfarer()
    r.on('/foo/bar', function () {
      t.pass('called')
    })
    r('/foo/bar')
  })

  t.test('should match a default path', function (t) {
    t.plan(1)
    var r = wayfarer('/404')
    r.on('/404', function () {
      t.pass('default')
    })
    r('/nope')
  })

  t.test('should allow passing of extra values', function (t) {
    t.plan(2)
    var foo = {}
    var bar = {}
    var r = wayfarer()
    r.on('/foo', function (params, arg1, arg2) {
      t.equal(arg1, foo, 'arg1 was passed')
      t.equal(arg2, bar, 'arg2 was passed')
    })
    r('/foo', foo, bar)
  })

  t.test('.on() should catch type errors', function (t) {
    t.plan(2)
    var r = wayfarer()
    t.throws(r.on.bind(r, 123), /string/, 'string')
    t.throws(r.on.bind(r, '/hi', 123), /function/, 'function')
  })

  t.test('.emit() should match paths', function (t) {
    t.plan(2)
    var r = wayfarer()
    r.on('/foo/bar', function (param) {
      t.pass('bar called')
    })
    r.on('/foo/baz', function (param) {
      t.pass('baz called')
    })
    r('/foo/bar')
    r('/foo/baz')
  })

  t.test('.match() should match paths', function (t) {
    t.plan(2)
    var r = wayfarer()
    r.on('/foo/bar', function () {
      t.fail('should not call callback')
    })
    r.on('/foo/baz', noop)

    var bar = r.match('/foo/bar')
    t.equal(bar.route, '/foo/bar')

    var baz = r.match('/foo/baz')
    t.equal(baz.route, '/foo/baz')
  })

  t.test('.emit() should match partials', function (t) {
    t.plan(1)
    var r = wayfarer()
    r.on('/:user', function (param) {
      t.equal(param.user, 'tobi', 'param matched')
    })
    r('/tobi')
  })

  t.test('.match() should match partials', function (t) {
    t.plan(1)
    var r = wayfarer()
    r.on('/:user', noop)
    var toby = r.match('/tobi')
    t.equal(toby.params.user, 'tobi')
  })

  t.test('.emit() should match paths before partials', function (t) {
    t.plan(1)
    var r = wayfarer()
    r.on('/foo', function () {
      t.pass('called')
    })
    r.on('/:user', noop)
    r('/foo')
  })

  t.test('.emit() should allow path overriding', function (t) {
    t.plan(1)
    var r = wayfarer()
    r.on('/:user', function () {
      t.fail('wrong callback called')
    })
    r.on('/:user', function () {
      t.pass('called')
    })
    r('/foo')
  })

  t.test('.emit() should match nested partials', function (t) {
    t.plan(2)
    var r = wayfarer()
    r.on('/:user/:name', function (param) {
      t.equal(param.user, 'tobi', 'param matched')
      t.equal(param.name, 'baz', 'param matched')
    })
    r('/tobi/baz')
  })

  t.test('.emit() should parse encoded params', function (t) {
    t.plan(1)
    var r = wayfarer()
    r.on('/:channel', function (param) {
      t.equal(param.channel, '#choo', 'param matched')
    })
    r('/%23choo')
  })

  t.test('.emit() should throw if no matches are found', function (t) {
    t.plan(1)
    var r1 = wayfarer()
    t.throws(r1.bind(r1, '/woops'), /route/, 'no matches found')
  })

  t.test('.emit() should return values', function (t) {
    t.plan(1)
    var r1 = wayfarer()
    r1.on('/foo', function () {
      return 'hello'
    })
    t.equal(r1('foo'), 'hello', 'returns value')
  })

  t.test('.emit() mount subrouters', function (t) {
    t.plan(5)

    var r4 = wayfarer()
    var r3 = wayfarer()
    r4.on('/kidlette', function () { t.pass('nested 2 levels') })
    r3.on('/mom', r4)
    r3('/mom/kidlette')

    var r1 = wayfarer()
    var r2 = wayfarer()
    r2.on('/', function () { t.pass('nested 1 level') })
    r1.on('/home', r2)
    r1('/home')

    var r5 = wayfarer()
    var r6 = wayfarer()
    r6.on('/child', function (param) {
      t.equal(typeof param, 'object', 'param is passed')
      t.equal(param.parent, 'hello', 'nested 2 levels with params')
    })
    r5.on('/:parent', r6)
    r5('/hello/child')

    var r7 = wayfarer()
    var r8 = wayfarer()
    var r9 = wayfarer()
    r9.on('/bar', function (param) { t.pass('called', 'nested 3 levels') })
    r8.on('/bin', r9)
    r7.on('/foo', r8)
    r7('/foo/bin/bar')
  })

  t.test('.emit() should match nested partials of subrouters', function (t) {
    t.plan(3)
    var r1 = wayfarer()
    var r2 = wayfarer()
    var r3 = wayfarer()
    r3.on('/:grandchild', function (param) {
      t.equal(param.parent, 'bin', 'nested 3 levels with params')
      t.equal(param.child, 'bar', 'nested 3 levels with params')
      t.equal(param.grandchild, 'baz', 'nested 3 levels with parmas')
    })
    r2.on('/:child', r3)
    r1.on('/foo/:parent', r2)
    r1('/foo/bin/bar/baz')
  })

  t.test('.match() should return nested partials of subrouters', function (t) {
    t.plan(3)
    var r1 = wayfarer()
    var r2 = wayfarer()
    var r3 = wayfarer()
    r3.on('/:grandchild', noop)
    r2.on('/:child', r3)
    r1.on('/foo/:parent', r2)
    var matched = r1.match('/foo/bin/bar/baz')
    t.equal(matched.params.parent, 'bin')
    t.equal(matched.params.child, 'bar')
    t.equal(matched.params.grandchild, 'baz')
  })

  t.test('.match() returns a handler of a route', function (t) {
    t.plan(1)
    var r = wayfarer()
    r.on('/:user', function () {
      t.pass('called')
    })
    var toby = r.match('/tobi')
    toby.cb()
  })

  t.test('nested routes should call parent default route', function (t) {
    t.plan(4)
    var r1 = wayfarer('/404')
    var r2 = wayfarer()
    var r3 = wayfarer()

    r2.on('/bar', r3)
    r1.on('foo', r2)
    r1.on('/404', pass)

    r1('')
    r1('foo')
    r1('foo/bar')
    r1('foo/beep/boop')

    function pass (params) {
      t.pass('called')
    }
  })

  t.test('aliases', function (t) {
    t.plan(1)
    var r = wayfarer()
    t.equal(r, r.emit)
  })

  t.test('wildcards', function (t) {
    t.plan(3)
    var r = wayfarer()

    r.on('/bar/*', function (params) {
      t.equal(params.wildcard, 'foo/beep/boop')
    })

    r.on('/foo/:match/*', function (params) {
      t.equal(params.match, 'bar')
      t.equal(params.wildcard, 'beep/boop')
    })

    r('/bar/foo/beep/boop')
    r('/foo/bar/beep/boop')
  })

  t.test('wildcards dont conflict with params', function (t) {
    t.plan(3)
    var router

    router = wayfarer()
    router.on('/*', function (params) {
      t.fail('wildcard called')
    })
    router.on('/:match', function (params) {
      t.pass('param called')
    })
    router('/foo')

    router = wayfarer()
    router.on('/*', function (params) {
      t.fail('wildcard called')
    })
    router.on('/:match/foo', function (params) {
      t.pass('param called')
    })
    router('/foo/foo')

    router = wayfarer()
    router.on('/*', function (params) {
      t.pass('wildcard called')
    })
    router.on('/:match/foo', function (params) {
      t.fail('param called')
    })
    router('/foo/bar')
  })

  t.test('safe decodeURIComponent', function (t) {
    t.plan(1)
    var r = wayfarer('/404')
    r.on('/test/:id', function (params) {
      t.fail('we should not be here')
    })
    r.on('/404', function () {
      t.pass('called')
    })
    r('/test/hel%"Flo')
  })

  t.test('safe decodeURIComponent - nested route', function (t) {
    t.plan(1)
    var r = wayfarer('/404')
    r.on('/test/hello/world/:id/blah', function (params) {
      t.fail('we should not be here')
    })
    r.on('/404', function () {
      t.pass('called')
    })
    r('/test/hello/world/hel%"Flo/blah')
  })

  t.test('safe decodeURIComponent - wildcard', function (t) {
    t.plan(1)
    var r = wayfarer('/404')
    r.on('/test/*', function (params) {
      t.fail('we should not be here')
    })
    r.on('/404', function () {
      t.pass('called')
    })
    r('/test/hel%"Flo')
  })

  t.test('should expose .route property', function (t) {
    t.plan(1)
    var r = wayfarer()
    r.on('/foo', function () {
      t.equal(this.route, '/foo', 'exposes route property')
    })
    r('/foo')
  })

  t.test('should not mutate callback parameter', function (t) {
    t.plan(4)
    var r = wayfarer()
    var routes = ['/foo', '/bar']
    r.on('/foo', callback)
    r.on('/bar', callback)
    r('/foo')
    r('/bar')
    function callback () {
      t.notEqual(this, callback, 'callback was proxied')
      t.equal(this.route, routes.shift(), 'proxy exposes route property')
    }
  })
})
