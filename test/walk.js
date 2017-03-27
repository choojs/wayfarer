var wayfarer = require('../')
var walk = require('../walk')
var noop = require('noop2')
var tape = require('tape')

tape('walk', function (t) {
  t.test('should assert input types', function (t) {
    t.plan(3)
    t.throws(walk.bind(null), /function/, 'assert first arg is function')
    t.throws(walk.bind(null, noop), /function/, 'assert second arg is a function')
    t.throws(walk.bind(null, noop, noop), /object/, 'assert trie exists')
  })

  t.test('should walk a trie', function (t) {
    t.plan(2)
    var router = wayfarer()
    router.on('/foo', function (x, y) { return x * y })
    router.on('/bar', function (x, y) { return x / y })

    walk(router, function (route, cb) {
      var y = 2
      return function (params, x) {
        return cb(x, y)
      }
    })

    t.equal(router('/foo', 4), 8, 'multiply')
    t.equal(router('/bar', 8), 4, 'divide')
  })

  t.test('should walk a nested trie', function (t) {
    t.plan(3)
    var router = wayfarer()
    router.on('/foo/baz', function (x, y) { return x * y })
    router.on('/bar/bin/barb', function (x, y) { return x / y })
    router.on('/bar/bin/bla', function (x, y) { return x / y })

    walk(router, function (route, cb) {
      var y = 2
      return function (params, x) {
        return cb(x, y)
      }
    })

    t.equal(router('/foo/baz', 4), 8, 'multiply')
    t.equal(router('/bar/bin/barb', 8), 4, 'divide')
    t.equal(router('/bar/bin/bla', 8), 4, 'divide')
  })

  t.test('should walk partials', function (t) {
    t.plan(4)
    var router = wayfarer()
    router.on('/foo', function (route) { return route })
    router.on('/:foo', function (route) { return route })
    router.on('/:foo/bar', function (route) { return route })
    router.on('/:foo/:bar', function (route) { return route })

    walk(router, function (route, cb) { return function () { return cb(route) } })

    t.equal(router('/foo'), '/foo', 'no partials')
    t.equal(router('/bleep'), '/:foo', 'one partial')
    t.equal(router('/bleep/bar'), '/:foo/bar', 'partial and normal')
    t.equal(router('/bleep/bloop'), '/:foo/:bar', 'two partials')
  })
})
