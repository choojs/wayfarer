# wayfarer
[![NPM version][npm-image]][npm-url] [![build status][travis-image]][travis-url] [![Test coverage][coveralls-image]][coveralls-url]

A simple [trie based](https://github.com/jonathanong/routington/)
router built for minimalism and speed. Works best with
[React](facebook.github.io/react) and [Browserify](github.com/substack/browserify).

## Installation
```bash
$ npm i --save wayfarer
```

## Overview
```js
/**
 * Initialize wayfarer.
 */

var wayfarer = require('wayfarer');
var router = wayfarer();

/**
 * Register routes.
 */

router
  .default('/404')
  .path('/', function() {console.log('/')})
  .path('/home', function() {console.log('/home')})
  .path('/404', function() {console.log('/404')})
  .path('/:user', function() {console.log('/user')});

/**
 * Match a route.
 */

router.match('/tobi')
// => '/user'
```

## API
#### .path()
```js
// Register a new path. Takes a {String} pathName that calls a
// {Function} callback. Partial paths are supported through the /: operator.
// Wayfarer uses a trie to match routes, so the order in which routes are
// registered does not matter.

router.path('/', function() {console.log('do stuff')});
router.path('/:user', function() {console.log('do user stuff')});
```

#### .default()
```js
// Set a {String} pathName as the default path to match. This is particularly
// useful for setting 404 pages.

router.default('/404');
router.path('/404', function() {console.log('sunglasses not found')});
```

#### .match()
```js
// Match a {String} path against the saved paths in the router. If a match is
// found the registered callback will be executed.

router.match('/tobi');
// => 'do user stuff'
```

## License
[MIT](https://tldrlegal.com/license/mit-license) ©
[Yoshua Wuyts](i@yoshuawuyts.com)

[npm-image]: https://img.shields.io/npm/v/wayfarer.svg?style=flat-square
[npm-url]: https://npmjs.org/package/wayfarer
[travis-image]: https://img.shields.io/travis/yoshuawuyts/wayfarer.svg?style=flat-square
[travis-url]: https://travis-ci.org/yoshuawuyts/wayfarer
[coveralls-image]: https://img.shields.io/coveralls/yoshuawuyts/wayfarer.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/yoshuawuyts/wayfarer?branch=master
