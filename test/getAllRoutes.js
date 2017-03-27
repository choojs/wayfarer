var wayfarer = require('../')
var getAllRoutes = require('../get-all-routes')
var tape = require('tape')

tape('getAllRoutes', function (t) {
  t.test('should assert input types', function (t) {
    t.plan(1)
    t.throws(getAllRoutes.bind(null), /function/, 'assert first arg is function')
  })

  t.test('should getAllRoutes', function (t) {
    t.plan(4)
    var router = wayfarer()
    router.on('/foo', function (x, y) { return x * y })
    router.on('/bar', function (x, y) { return x / y })

    var routes = getAllRoutes(router)

    t.equal(routes instanceof Object, true)
    t.equal(Object.keys(routes).length, 2)
    t.equal(typeof routes['/foo'], 'function')
    t.equal(typeof routes['/bar'], 'function')
  })

  t.test('should getAllRoutes from a nested tree', function (t) {
    t.plan(6)
    var router = wayfarer()
    router.on('/foo', function (x, y) { return x * y + 2 })
    router.on('/foo/baz', function (x, y) { return x * y })
    router.on('/bar/bin/barb', function (x, y) { return x / y })
    router.on('/bar/bin/bla', function (x, y) { return x / y })

    var routes = getAllRoutes(router)

    t.equal(routes instanceof Object, true)
    t.equal(Object.keys(routes).length, 4)
    t.equal(typeof routes['/foo'], 'function')
    t.equal(typeof routes['/foo/baz'], 'function')
    t.equal(typeof routes['/bar/bin/barb'], 'function')
    t.equal(typeof routes['/bar/bin/bla'], 'function')
  })

  t.test('should getAllRoutes from a routes with params', function (t) {
    t.plan(5)
    var router = wayfarer()
    router.on('/foo', function (x, y) { return x / y })
    router.on('/foo/:slug', function (x, y) { return x * y + 2 })
    router.on('/foo/:slug/:id', function (x, y) { return x * y })

    var routes = getAllRoutes(router)

    t.equal(routes instanceof Object, true)
    t.equal(Object.keys(routes).length, 3)
    t.equal(typeof routes['/foo'], 'function')
    t.equal(typeof routes['/foo/:slug'], 'function')
    t.equal(typeof routes['/foo/:slug/:id'], 'function')
  })
})
