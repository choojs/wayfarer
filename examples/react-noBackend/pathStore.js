/**
 * Module dependencies
 */

var store = require('dad');

/**
 * Initialize 'path' store.
 */

var path = store('path');

/**
 * Expose 'path';
 */

module.exports = path;

/**
 * Define properties
 */

path
  .attr('path', {required: true});