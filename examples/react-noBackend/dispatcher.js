/* global window*/

/**
 * Module dependencies
 */

var barracks = require('barracks');
var path = require('./pathStore');

/**
 * Initialize 'Dispatcher'
 */

var dispatcher = barracks();

/**
 * Expose 'Dispatcher()'.
 */

module.exports = dispatcher;

/**
 * Update the url path.
 */

dispatcher.register('path_initialize', function(path) {
  pathStore.add({cid: 0, path: getPath()});
});

/**
 * Only update the url store.
 */

dispatcher.register('path_softUpdate', function() {
  var path = getPath();

  if ('/' == path) {
    pathStore.update({cid: 0, path: '/'});
    return;
  }
  pathStore.update({cid: 0, path: path});
});

/**
 * Update the url path.
 */

dispatcher.register('path_update', function(path) {
  if ('/' == path) {
    window.history.pushState({}, '', '/');
    pathStore.update({cid: 0, path: '/'});
    return;
  }
  window.history.pushState({}, '', '#' + path);
  pathStore.update({cid: 0, path: path});
});

/**
 * Get the current path.
 *
 * @return {String}
 * @api private
 */

function getPath() {
  return window.location.hash.replace(/(#)/, '') || '/';
}