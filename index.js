var routington = require('routington')
var assert = require('assert')

module.exports = wayfarer

// create a router
// str -> obj
function wayfarer (dft) {
  dft = dft || ''
  var router = routington()

  emit.emit = emit
  emit.on = on
  emit.match = match

  return emit

  // define a path
  // str, fn -> obj
  function on (path, cb) {
    assert.equal(typeof path, 'string')
    assert.equal(typeof cb, 'function')
    var node = router.define(path)[0]
    node.cb = cb
    return emit
  }

  // match and call a route
  // str -> null
  function emit (path) {
    path = path || ''
    var matched = match(path)
    if (matched) matched.node.cb(path, matched.param)
  }

  // match and return route
  // str -> obj
  function match (path) {
    return router.match(path) || router.match(dft)
  }
}
