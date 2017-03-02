var assert = require('assert')

module.exports = walk

// walk a wayfarer trie
// (obj, fn) -> null
function walk (router, transform) {
  assert.equal(typeof router, 'function', 'wayfarer.walk: router should be an function')
  assert.equal(typeof transform, 'function', 'wayfarer.walk: transform should be a function')

  var trie = router._trie
  assert.equal(typeof trie, 'object', 'wayfarer.walk: trie should be an object')

  // (str, obj) -> null
  ;(function walk (route, trie) {
    if (trie.cb) {
      trie.cb = transform(route, trie.cb)
    }

    if (trie.nodes) {
      var nodes = trie.nodes
      Object.keys(nodes).forEach(function (key) {
        var node = nodes[key]
        var newRoute = (key === '$$')
          ? route + '/:' + trie.name
          : route + '/' + key
        walk(newRoute, node)
      })
    }
  })('', trie.trie)
}
