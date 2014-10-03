# wayfarer
[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Dependency Status][david-image]][david-url]
[![Downloads][downloads-image]][downloads-url]

A simple [trie based](https://github.com/jonathanong/routington/)
router built for minimalism and speed. Works best with
[React](facebook.github.io/react) and [Browserify](github.com/substack/browserify).

## Installation
```bash
$ npm i --save wayfarer
```

## Overview
```js
var wayfarer = require('wayfarer');
var router = wayfarer();

// Register routes.

router
  .default('/404')
  .path('/', function() {console.log('/')})
  .path('/home', function() {console.log('/home')})
  .path('/404', function() {console.log('/404')})
  .path('/:user', function() {console.log('/user')});

// Match a route.

router.match('/tobi')
// => '/user'
```

## API
#### .path(path, cb)
Register a new path. Partial paths are supported through the /: operator.
Wayfarer uses a trie to match routes, so the order in which routes are
registered does not matter.
```js
router.path('/', function() {console.log('do stuff')});
router.path('/:user', function() {console.log('do user stuff')});
```

#### .default(defaultPath)
Sets a default path to match. This is particularly
useful for setting 404 pages.
```js
router.default('/404');
router.path('/404', function() {console.log('sunglasses not found')});
```

#### .match(path)
Match a path against the saved paths in the router. If a match is
found the registered callback will be executed.
```js
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
[david-image]: http://img.shields.io/david/yoshuawuyts/wayfarer.svg?style=flat-square
[david-url]: https://david-dm.org/yoshuawuyts/wayfarer
[downloads-image]: http://img.shields.io/npm/dm/wayfarer.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/wayfarer
