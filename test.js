const test = require('tape')
const wayfarer = require('./')

// helper to reset routers
function teardown () {
  var i = wayfarer.routers.length
  while (i--) {
    wayfarer.routers[i].destroy()
  }
}

test('should match a path', function (t) {
  t.plan(1)
  const r = wayfarer()
  r.on('/', function () {
    t.pass('called')
  })
  r('/')
  teardown()
})

test('should match a default path', function (t) {
  t.plan(1)
  const r = wayfarer('/404')
  r.on('/404', function () {
    t.pass('default')
  })
  r('/nope')
  teardown()
})

test('.go() should dispatch to all routers', function (t) {
  t.plan(2)
  const r1 = wayfarer()
  const r2 = wayfarer()
  r1.on('/', function () {
    t.pass('call 1')
  })
  r2.on('/', function () {
    t.pass('call 2')
  })
  wayfarer.go('/')
  teardown()
})

test('.on() should catch type errors', function (t) {
  t.plan(2)
  const r = wayfarer()
  t.throws(r.on.bind(r, 123), /string/)
  t.throws(r.on.bind(r, '/hi', 123), /function/)
  teardown()
})

test('.emit() should match partials', function (t) {
  t.plan(1)
  const r = wayfarer()
  r.on('/:user', function (param) {
    t.equal(param.user, 'tobi')
  })
  r('/tobi')
  teardown()
})

test('.emit() should throw if no matches are found', function (t) {
  t.plan(1)
  const r1 = wayfarer()
  t.throws(r1.bind(r1, '/woops'), /path/)
  teardown()
})

test('.emit() should allow multiple handlers', function (t) {
  t.plan(2)

  const r1 = wayfarer()
  r1.on('/', function () {
    t.pass('call 1')
  })
  r1.on('/', function () {
    t.pass('call 2')
  })

  r1('/')
  teardown()
})

test('.emit() should allow nesting', function (t) {
  t.plan(8)

  const r1 = wayfarer()
  const r2 = wayfarer()

  r1.on('/home', r2)
  r2.on('/', function () {
    t.pass('/home')
  })

  r1('/home')

  const r3 = wayfarer()
  const r4 = wayfarer()
  r3.on('/parent', r4)
  r4.on('/child', function () {
    t.pass('/child')
  })

  r3('/parent/child')

  const r5 = wayfarer()
  const r6 = wayfarer()
  r5.on('/:parent', r6)
  r6.on('/child', function (param) {
    t.equal(typeof param, 'object')
    t.equal(param.parent, 'hello')
  })

  r5('/hello/child')

  const r7 = wayfarer()
  const r8 = wayfarer()
  const r9 = wayfarer()
  r7.on('/foo', r8)
  r8.on('/bin', r9)
  r9.on('/bar', function (param) {
    t.pass('called')
  })

  r7('/foo/bin/bar')

  const r10 = wayfarer()
  const r11 = wayfarer()
  const r12 = wayfarer()
  r10.on('/foo/:parent', r11)
  r11.on('/:child', r12)
  r12.on('/:grandchild', function (param) {
    t.equal(param.parent, 'bin')
    t.equal(param.child, 'bar')
    t.equal(param.grandchild, 'baz')
  })

  r10('/foo/bin/bar/baz')
  teardown()
})

test('.default() should trigger the default route', function (t) {
  t.plan(5)
  const r = wayfarer('/404')
  r.on('/404', function (param) {
    t.pass('called')
    t.equal(typeof param, 'object')
    if (param.foo) t.equal(param.foo, 'bar')
  })
  r._default()
  r._default({ foo: 'bar' })
  teardown()
})

test('.go() should dispatch to all routers', function (t) {
  t.plan(2)
  const r1 = wayfarer()
  const r2 = wayfarer()
  r1.on('/', function () {
    t.pass('call 1')
  })
  r2.on('/', function () {
    t.pass('call 2')
  })
  wayfarer.go('/')
  teardown()
})

test('.destroy() should unbind the router', function (t) {
  t.plan(2)
  const r = wayfarer()
  t.equal(wayfarer.routers.length, 1)
  r.destroy()
  t.equal(wayfarer.routers.length, 0)
  teardown()
})

test('nested routes should call parent default route', function (t) {
  t.plan(6)
  var baz = false
  const r1 = wayfarer('/404')
  const r2 = wayfarer()
  const r3 = wayfarer()

  r1.on('foo', r2)
  r1.on('/404', pass)
  r2.on('/bar', r3)
  r2.on('/beep/:baz', r3)

  r1('')
  r1('foo')
  r1('foo/bar')

  baz = true
  r1('foo/beep/boop')

  function pass (params) {
    if (baz) {
      t.equal(typeof params, 'object')
      t.equal(params.baz, 'boop')
    }
    t.pass('called')
  }
  teardown()
})

test('aliases', function (t) {
  t.plan(1)
  const r = wayfarer()
  t.equal(r, r.emit)
  teardown()
})
