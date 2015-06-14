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
  t.plan(1)
  const r = wayfarer()
  r.on('/:user', function (param) {
    t.equal(param.user, 'tobi')
  })
  r('/tobi')
})

test('.emit() should throw if no matches are found', function (t) {
  t.plan(1)
  const r1 = wayfarer()
  t.throws(r1.bind(r1, '/woops'), /path/)
})

test('.emit() should allow nesting', function (t) {
  t.plan(7)

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
  r7.on('/foo/:parent', r8)
  r8.on('/:child', r9)
  r9.on('/:grandchild', function (param) {
    t.equal(param.parent, 'bin')
    t.equal(param.child, 'bar')
    t.equal(param.grandchild, 'baz')
  })

  r7('/foo/bin/bar/baz')
})

test('aliases', function (t) {
  t.plan(1)
  const r = wayfarer()
  t.equal(r, r.emit)
})
