/**
 * Module dependencies
 */
 
var router = require('routington');
var assert = require('assert');
 
/**
 * Wayfarer prototype
 */
 
var wayfarer = Wayfarer.prototype;
 
/**
 * Expose 'router'
 */
 
module.exports = Wayfarer;
 
/**
 * Create a new router
 *
 * @return {Wayfarer}
 * @api public
 */
 
function Wayfarer() {
  if (!(this instanceof Wayfarer)) return new Wayfarer();
  this.router = router();
  this.defaultPath = '';
}
 
/**
 * Define a new path.
 *
 * @param {String} path
 * @param {Function} cb
 * @return {Wayfarer}
 * @api public
 */
 
wayfarer.path = function(path, cb) {
  assert('string' == typeof path, 'Path should be a string');
  assert('function' == typeof cb, 'Callback should be a function');
  var node = this.router.define(path)[0];
  node.cb = cb;
  
  return this;
}

/**
 * Define the default path.
 *
 * @param {String} path
 * @return {Wayfarer}
 * @api public
 */

wayfarer.default = function(path) {
  assert('string' == typeof path, 'Path should be a string');
  this.defaultPath = path;

  return this;
}
 
/**
 * Math a route against the paths.
 *
 * @param {String} path
 * @return {Any}
 * @api public
 */
 
wayfarer.match = function(path) {
  assert('string' == typeof path, 'Path should be a string');
  var match = this.router.match(path);
  if (!match) match = this.router.match(this.defaultPath);
  return match.node.cb();
}