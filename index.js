const routington = require('routington')
const symbol = require('es6-symbol')
const assert = require('assert')
const xtend = require('xtend')

const sym = symbol('wayfarer')

module.exports = wayfarer

// create a router
// str -> obj
function wayfarer (dft) {
  dft = sanitizeUri(dft) || ''
  const router = routington()
  const mounts = routington()

  emit[sym] = true
  emit.emit = emit
  emit.on = on

  return emit

  // define a path
  // (str, fn) -> obj
  function on (path, cb) {
    assert.equal(typeof path, 'string')
    assert.equal(typeof cb, 'function')
    path = sanitizeUri(path) || ''

    if (cb[sym]) return mount(path, cb)

    const node = router.define(path)[0]
    node.cb = cb
    return emit
  }

  // match and call a route
  // str -> null
  function emit (path, param) {
    path = sanitizeUri(path) || ''
    param = param || {}

    const mountPath = mountMatch(path)
    if (mountPath) {
      const nw = path.split('/')
      nw.shift()
      path = nw.join('/')
    }

    const mch = mountPath ? mountPath : router.match(path) || router.match(dft)
    assert.ok(mch, 'path ' + path + ' did not match')
    param = xtend(param, mch.param)
    mch.node.cb('/' + path, param)
  }

  // mount a subrouter
  // str -> null
  function mount (path, cb) {
    path = path.split('/')[0]
    const node = mounts.define(path)[0]
    node.cb = cb
    return emit
  }

  // match a mounted router
  // str -> str|bool
  function mountMatch (path) {
    const nw = path.split('/')[0]
    const matched = mounts.match(nw)
    return matched
  }
}

// strip leading `/`
// str -> str
function sanitizeUri (str) {
  str = str || ''
  return str.replace(/^\//, '')
}
