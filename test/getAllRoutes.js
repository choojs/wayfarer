const wayfarer = require('../')
const getAllRoutes = require('../getAllRoutes')
const tape = require('tape')

tape('getAllRoutes', function (t) {
  t.test('should assert input types', (t) => {
    t.plan(1)
    t.throws(getAllRoutes.bind(null), /function/, 'assert first arg is function')
  })

  t.test('should getAllRoutes', (t) => {
    t.plan(3)
    const router = wayfarer()
    router.on('/foo', (x, y) => x * y)
    router.on('/bar', (x, y) => x / y)

    const routes = getAllRoutes(router)

    t.equal(routes instanceof Array, true)
    t.equal(routes.length, 2)
    t.deepEqual(routes, ['/foo', '/bar'])
  })

  t.test('should getAllRoutes from a nested tree', (t) => {
    t.plan(3)
    const router = wayfarer()
    router.on('/foo', (x, y) => x * y + 2)
    router.on('/foo/baz', (x, y) => x * y)
    router.on('/bar/bin/barb', (x, y) => x / y)
    router.on('/bar/bin/bla', (x, y) => x / y)

    const routes = getAllRoutes(router)

    t.equal(routes instanceof Array, true)
    t.equal(routes.length, 4)
    t.deepEqual(routes, ['/foo', '/foo/baz', '/bar/bin/barb', '/bar/bin/bla'])
  })

  t.test('should getAllRoutes from a routes with params', (t) => {
    t.plan(3)
    const router = wayfarer()
    router.on('/foo', (x, y) => x / y)
    router.on('/foo/:slug', (x, y) => x * y + 2)
    router.on('/foo/:slug/:id', (x, y) => x * y)

    const routes = getAllRoutes(router)

    t.equal(routes instanceof Array, true)
    t.equal(routes.length, 3)
    t.deepEqual(routes, ['/foo', '/foo/:slug', '/foo/:slug/:id'])
  })
})
