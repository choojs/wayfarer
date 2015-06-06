const test = require('tape')
const wayfarer = require('./')

test('should match a path', function (t) {
  t.plan(1)
  const r = wayfarer()
  r.on('/', function () {
    t.pass('called')
  })
  r('/')
})

test('should match a default path', function (t) {
  t.plan(1)
  const r = wayfarer('/404')
  r.on('/404', function () {
    t.pass('default')
  })
  r('/nope')
})

test('.on() should catch type errors', function (t) {
  t.plan(2)
  const r = wayfarer()
  t.throws(r.on.bind(r, 123), /string/)
  t.throws(r.on.bind(r, '/hi', 123), /function/)
})

test('.emit() should match partials', function (t) {
  t.plan(2)
  const r = wayfarer()
  r.on('/:user', function (uri, param) {
    t.equal(uri, '/tobi')
    t.equal(param.user, 'tobi')
  })
  r('/tobi')
})

test('.emit() should allow nesting', function (t) {
  t.plan(1)
  const r1 = wayfarer()
  const r2 = wayfarer()
  r1.on('/home', r2)
  r2.on('/home', function (uri) {
    t.equal(uri, '/home')
  })
  r1('/home')
})

test('aliases', function (t) {
  t.plan(1)
  const r = wayfarer()
  t.equal(r, r.emit)
})

test('.match()', function (t) {
  t.plan(2)
  const r = wayfarer()
  r.on('/user/:id', function () {
    t.fail('route should not be called with .match()')
  })
  const matched = r.match('/user/123')
  t.equal(matched.param.id, '123')
  t.equal(typeof matched.node.cb, 'function')
})
