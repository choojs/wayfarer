const assert = require('assert')

module.exports = getAllRoutes

const transform = function (trie, prev = '/') {
  const routes = []
  const nodes = trie.nodes
  Object.keys(nodes).forEach(key => {
    const route = `${prev === '/' ? prev : prev + '/'}${key === '$$' ? ':' + trie.name : key}`
    if (nodes[key].cb !== undefined) {
      routes.push(route)
    }
    if (Object.keys(nodes[key].nodes).length !== 0) {
      routes.push(...transform(nodes[key], route))
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
