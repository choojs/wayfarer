
var router = require('routington')
var assert = require('assert')

var wayfarer = Wayfarer.prototype

module.exports = Wayfarer

// Create a new router.
// @param  {Object} opts
//   @prop {String} default
// @return {Object}
function Wayfarer(opts) {
  if (!(this instanceof Wayfarer)) return new Wayfarer(opts)
  opts = opts || {}
  this.router = router()
  this.defaultPath = opts.default || ''
}

// Define a new path.
// @param {String} path
// @param {Function} cb
// @return {Wayfarer}
wayfarer.on = function(path, cb) {
  assert('string' == typeof path, 'Path should be a string')
  assert('function' == typeof cb, 'Callback should be a function')
  var node = this.router.define(path)[0]
  node.cb = cb

  return this
}

// Math a route against the paths.
// @param {String} path
// @return {Any}
// @api public
wayfarer.match = function(path) {
  assert('string' == typeof path, 'Path should be a string')

  var nw = path.split('?')[0]
  var match = this.router.match(nw)
  if (!match) match = this.router.match(this.defaultPath)

  return match.node.cb(match ? match.param : {})
}

// Aliases.
wayfarer.path = wayfarer.on
wayfarer.route = wayfarer.on
