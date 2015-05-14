const test = require('tape')
const wayfarer = require('./index.js')

test('wayfarer() should initialize with empty properties', function (t) {
  t.plan(1)
  const router = wayfarer()
  t.equal(router.defaultPath, '')
})

test('wayfarer should set accept a default path', function (t) {
  t.plan(1)
  const router = wayfarer({ default: '/404' })
  t.equal(router.defaultPath, '/404')
})

test('.on() should catch type errors', function (t) {
  t.plan(2)
  const router = wayfarer()
  t.throws(router.on.bind(router, 123), /string/)
  t.throws(router.on.bind(router, '/hi', 123), /function /)
})

test('.match() should match simple routes', function (t) {
  t.plan(1)
  const router = wayfarer()
  router.on('/hello', function () { t.ok(true, 'correct path called') })
  router.on('/hi', function () { t.ok(false, 'incorrect path called') })
  router.match('/hello')
})

test('.match() should match dynamic routes', function (t) {
  t.plan(1)
  const router = wayfarer()
  router.on('/hi', function () { t.ok(false, 'incorrect path called') })
  router.on('/:user', function () { t.ok(true, 'correct path called') })
  router.match('/tobi')
})

test('.match() should provide param object on dynamic routes', function (t) {
  t.plan(1)
  const router = wayfarer()
  router.on('/hi', function () { t.ok(false, 'incorrect path called') })
  router.on('/:user', function (uri, param) { t.equal(param.user, 'tobi') })
  router.match('/tobi')
})

test('.match() should match the default path if no matches found', function (t) {
  t.plan(1)
  const router = wayfarer({ default: '/404' })
  router.on('/hi', function () { t.ok(false, 'incorrect path called') })
  router.on('/howdy', function () { t.ok(false, 'incorrect path called') })
  router.on('/404', function () { t.ok(true, 'correct path called') })
  router.match('/derpderp')
})

test('.match() should not match queryStrings', function (t) {
  t.plan(1)
  const router = wayfarer()
  router.on('/hi', function () { t.ok(false, 'incorrect path called') })
  router.on('/howdy', function () { t.ok(false, 'incorrect path called') })
  router.on('/404', function () { t.ok(true, 'correct path called') })
  router.match('/404?derp=darp')
})

test('.match() should provide the uri string to callback', function (t) {
  t.plan(1)
  const router = wayfarer()
  const sub = wayfarer()
  router.on('/home', sub.match.bind(sub))
  sub.on('/home', function (uri) { t.equal(uri, '/home') })
  router.match('/home')
})

test('aliases', function (t) {
  t.plan(2)
  const router = wayfarer()
  t.equal(router.route, router.on, '.route() == .on()')
  t.equal(router.path, router.on, '.path() == .on()')
})
