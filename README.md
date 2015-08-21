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
Matched params are passed into subrouters. Nested routes will call their
parent's default handler if no path matches.
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
Routes can register multiple callbacks. See
[`routington.define()`](https://github.com/pillarjs/routington#nodes-node--routerdefineroute)
for all route options.

### router(route)
Match a route and execute the corresponding callback. Alias: `router.emit()`.

## Internals
__Warning__: these methods are considered internal and should only be used when
extending wayfarer.
- `router._default(params)`: Trigger the default route. Useful to propagate
  error states.
- `routes = router._routes`: Expose the mounted routes.
- `subrouters = router._subrouters`: Expose the mounted subrouters.

## FAQ
### Why did you build this?
Routers like [react-router](https://github.com/rackt/react-router) are
complicated solutions for a simple problem. In reality all that's needed is a
[methodless](http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html) router
that can define + match paths and can mount other routers to delegate requests.

### Why isn't my route matching?
Wayfarer only compares strings. Before you pass in an url you probably want to
strip it of querystrings and hashes using the
[pathname-match](https://github.com/yoshuawuyts/pathname-match) module.

## See Also
- [hash-match](https://github.com/sethvincent/hash-match) - easy `window.location.hash` matching
- [pathname-match](https://github.com/yoshuawuyts/pathname-match) - strip querystrings and hashes from a url
- [methodist](https://github.com/yoshuawuyts/methodist) - HTTP method matching

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
