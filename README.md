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
$ npm install wayfarer
```

## Overview
```js
const wayfarer = require('wayfarer');

const router = wayfarer({ default: '/404' })

router.route('/', () => console.log('/'))
router.route('/404', () => console.log('/404'))
router.route('/:user', () => console.log('/user'))

router.match('/tobi');
// => '/:user'
```

## API
#### wayfarer(opts)
Initialize wayfarer with options. `default` allows setting a default path
to match if none other match. Ignores query strings.
```js
const router = wayfarer({ default: '/404' })
```

#### .route(path, cb)
Register a new path. Partial paths are supported through the `/:` operator.
Wayfarer uses a trie to match routes, so the order in which routes are
registered does not matter.
```js
router.route('/', () => console.log('do stuff'))
router.route('/:user', () => console.log('do user stuff'))
```

#### .match(path)
Match a path against the saved paths in the router. If a match is
found the registered callback will be executed.
```js
router.match('/tobi');
// => 'do user stuff'
```

## See Also
- [hash-match](https://github.com/sethvincent/hash-match) - easy `window.location.hash` matching

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
