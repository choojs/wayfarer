# wayfarer
[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Downloads][downloads-image]][downloads-url]
[![js-standard-style][standard-image]][standard-url]

Composable [trie based](https://github.com/jonathanong/routington/) router.
It is faster than traditional, linear, regular expression-matching routers,
although insignficantly, and scales with the number of routes.

## Installation
```bash
$ npm install wayfarer
```

## Usage
```js
const wayfarer = require('wayfarer')

const router = wayfarer('/404')

router.on('/', () => console.log('/'))
router.on('/404', () => console.log('404 not found'))
router.on('/:user', params => console.log('user is %s', params.user))

router('/tobi')
// => 'user is tobi'

router('/uh/oh')
// => '404 not found'
```

## Subrouting
Routers can be infinitely nested, allowing routing to be scoped per view.
```js
const r1 = wayfarer()
const r2 = wayfarer()

r1.on('/:parent', r2)
r2.on('/child', () => console.log('subrouter trix!'))

r1('/dada/child')
// => 'subrouter trix!'
```

## API
### router = wayfarer(default)
Initialize a router with a default route. Doesn't ignore querystrings and hashes.

### router.on(route, cb(params))
Register a new route. The order in which routes are registered does not matter.
See [`routington.define()`](https://github.com/pillarjs/routington#nodes-node--routerdefineroute)
for all route options.

### router(route)
Match a route and execute the corresponding callback. Alias: `router.emit()`.

## Why?
Routers like [react-router](https://github.com/rackt/react-router) are
complicated solutions for a simple problem. All I want is a
[methodless](http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html) router
that's as simple as `EventEmitter` and allows composition by mounting
subrouters as handlers.

## See Also
- [hash-match](https://github.com/sethvincent/hash-match) - easy `window.location.hash` matching
- [pathname-match](https://github.com/yoshuawuyts/pathname-match) - strip querystrings and hashes from a url

## License
[MIT](https://tldrlegal.com/license/mit-license)

[npm-image]: https://img.shields.io/npm/v/wayfarer.svg?style=flat-square
[npm-url]: https://npmjs.org/package/wayfarer
[travis-image]: https://img.shields.io/travis/yoshuawuyts/wayfarer/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/yoshuawuyts/wayfarer
[coveralls-image]: https://img.shields.io/coveralls/yoshuawuyts/wayfarer.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/yoshuawuyts/wayfarer?branch=master
[downloads-image]: http://img.shields.io/npm/dm/wayfarer.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/wayfarer
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: https://github.com/feross/standard
