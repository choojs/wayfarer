const routington = require('routington')
const assert = require('assert')

module.exports = wayfarer

// create a router
// str -> obj
function wayfarer (dft) {
  dft = dft || ''
  const router = routington()

  emit.emit = emit
  emit.on = on

  return emit

  // define a path
  // str, fn -> obj
  function on (path, cb) {
    assert.equal(typeof path, 'string')
    assert.equal(typeof cb, 'function')
    const node = router.define(path)[0]
    node.cb = cb
    return emit
  }

  // match a route
  // str -> null
  function emit (path) {
    path = path || ''
    const match = router.match(path) || router.match(dft)
    match.node.cb(path, match ? match.param : {})
  }
}
