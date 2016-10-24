const assert = require('assert')

module.exports = getAllRoutes

const transform = function (trie, previous) {
  const prev = previous || '/'
  const routes = {}
  const nodes = trie.nodes
  Object.keys(nodes).forEach(function (key) {
    const path = prev === '/' ? prev : prev + '/'} + key === '$$' ? ':' + trie.name : key
    const cb = nodes[key].cb
    if (cb !== undefined) {
      routes[path] = cb
    }
    if (Object.keys(nodes[key].nodes).length !== 0) {
      Object.assign(routes, transform(nodes[key], path))
    }
  })
  return routes
}

// walk a wayfarer trie
// (obj, fn) -> null
function getAllRoutes (router) {
  assert.equal(typeof router, 'function', 'wayfarer.getAllRoutes: router should be an function')

  const trie = router._trie
  assert.equal(typeof trie, 'object', 'wayfarer.getAllRoutes: trie should be an object')

  const tree = trie.trie
  return transform(tree)
}
