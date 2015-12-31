const assert = require('assert')
const trie = require('./trie')

module.exports = Wayfarer

// create a router
// str -> obj
function Wayfarer (defaultPath) {
  if (!(this instanceof Wayfarer)) return new Wayfarer(defaultPath)

  const _default = (defaultPath || '').replace(/^\//, '')
  const _trie = trie()
  var dft = null

  emit._trie = _trie
  emit.emit = emit
  emit.on = on
  emit._wayfarer = true

  return emit

  // define a route
  // (str, fn) -> obj
  function on (route, cb) {
    assert.equal(typeof route, 'string')
    assert.equal(typeof cb, 'function')

    route = route || '/'

    if (cb && cb._wayfarer && cb._trie) {
      _trie.mount(route, cb._trie.trie)
    } else {
      const node = _trie.create(route)
      node.cb = cb
    }

    return emit
  }

  // match and call a route
  // (str, any?...) -> null
  function emit (route, arg1, arg2, arg3, arg4) {
    assert.notEqual(route, undefined, "'route' must be defined")

    var node = _trie.match(route)
    if (!node || !node.cb) {
      if (dft === null) dft = _trie.match(_default)
      if (dft) node = dft
      if (!dft || !dft.cb) {
        throw new Error("route '" + route + "' did not match")
      }
    }

    const cb = node.cb
    const params = node.params || {}

    switch (arguments.length) {
      case 1: return cb(params)
      case 2: return cb(params, arg1)
      case 3: return cb(params, arg1, arg2)
      case 4: return cb(params, arg1, arg2, arg3)
      case 5: return cb(params, arg1, arg2, arg3, arg4)
      default: cb.apply(null, Array.prototype.slice.call(arguments, 0))
    }
  }
}
