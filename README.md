# wayfarer
[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Downloads][downloads-image]][downloads-url]

A simple [trie based](https://github.com/jonathanong/routington/)
router built for minimalism and speed. Works best with
[Browserify](github.com/substack/browserify).

## Installation
```bash
npm install wayfarer
```

## Overview
```js
var router = require('wayfarer');

// Register routes.

router({qs: false})
  .default('/404')
  .route('/', function() {console.log('/')})
  .route('/home', function() {console.log('/home')})
  .route('/404', function() {console.log('/404')})
  .route('/:user', function() {console.log('/user')})
  .match('/tobi');
  // => '/user'
```

## API
#### wayfarer(opts)
Initialize wayfarer with options. Setting `qs` to false stops wayfarer from
triggering on changes to the querystring.
```js
var router = wayfarer({qs: false});
```

#### .route(path, cb)
Register a new path. Partial paths are supported through the `/:` operator.
Wayfarer uses a trie to match routes, so the order in which routes are
registered does not matter.
```js
router.route('/', function() {console.log('do stuff')});
router.route('/:user', function() {console.log('do user stuff')});
```

#### .default(defaultPath)
Sets a default path to match. This is particularly
useful for setting 404 pages.
```js
router.default('/404');
router.route('/404', function() {console.log('sunglasses not found')});
```

#### .match(path)
Match a path against the saved paths in the router. If a match is
found the registered callback will be executed.
```js
router.match('/tobi');
// => 'do user stuff'
```

## License
[MIT](https://tldrlegal.com/license/mit-license)

[npm-image]: https://img.shields.io/npm/v/wayfarer.svg?style=flat-square
[npm-url]: https://npmjs.org/package/wayfarer
[travis-image]: https://img.shields.io/travis/yoshuawuyts/wayfarer.svg?style=flat-square
[travis-url]: https://travis-ci.org/yoshuawuyts/wayfarer
[coveralls-image]: https://img.shields.io/coveralls/yoshuawuyts/wayfarer.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/yoshuawuyts/wayfarer?branch=master
[downloads-image]: http://img.shields.io/npm/dm/wayfarer.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/wayfarer
