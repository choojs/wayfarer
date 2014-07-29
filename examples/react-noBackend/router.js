/* global window*/

/**
 * Module dependencies
 */

var wayfarer = require('wayfarer');
var react = require('react');
var dispatcher = require('../../dispatcher/dispatcher');
// var notFound = require('./views/404');
var pathStore = require('./pathStore');
// var home = require('./views/home');
var router = wayfarer();

/**
 * Manage routes.
 *
 * @props {String} path
 * @api public
 */

module.exports = react.createClass({
  displayName: 'router',
  componentWillMount: componentWillMount,
  render: render,
  componentDidMount: componentDidMount,
  shouldComponentUpdate: shouldComponentUpdate
});

/**
 * ComponentWillMount: set initial state locally and in 'pathStore'.
 */

function componentWillMount() {
  dispatcher.dispatch('path_initialize');
  this.setState({path: pathStore.get(0)});
}

/**
 * Render DOM.
 */

function render() {
  router
    .default('404')
    .path('/', home)
    .path('404', notFound);

  return router.match(this.state.path);
}

/**
 * ComponentDidMount: set url change listeners.
 */

function componentDidMount() {
  // listen to changes in 'pathStore'.
  pathStore.on('update', function(newPath) {
    this.setState({path: newPath.path});
  }.bind(this));

  // update only stores when history API is used.
  window.onpopstate = function() {
    dispatcher.dispatch('path_softUpdate');
  };
}

/**
 * ShouldComponentUpdate.
 */
 
function shouldComponentUpdate(nextProps, nextState) {
  return nextState.path !== this.state.path;
}