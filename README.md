# wayfarer [![stability][0]][1]
[![npm version][2]][3] [![build status][4]][5] [![test coverage][6]][7]
[![downloads][8]][9] [![js-standard-style][10]][11]

Composable [trie based](https://en.wikipedia.org/wiki/Trie) router.  It's
faster than traditional, linear, regular expression-matching routers, although
insignficantly, and scales with the number of routes.

If you're looking for a client-side router check out
[sheet-router](https://github.com/yoshuawuyts/sheet-router). If you're looking
for a server router check out
[server-router](https://github.com/yoshuawuyts/server-router).

### features
- works with any framework
- built for speed
- minimal dependencies
- extensible

## Installation
```sh
$ npm install wayfarer
```

## Usage
```js
var wayfarer = require('wayfarer')

var router = wayfarer('/404')

router.on('/', () => console.log('/'))
router.on('/404', () => console.log('404 not found'))
router.on('/:user', (params) => console.log('user is %s', params.user))
router.on('/wildcard/*', (params) => console.log('wildcard path is %s', params.wildcard))

router('tobi')
// => 'user is tobi'

router('/uh/oh')
// => '404 not found'

router('/wildcard/example/path')
// => 'wildcard path is example/path'
```

## Subrouting
Routers can be infinitely nested, allowing routing to be scoped per view.
Matched params are passed into subrouters. Nested routes will call their
parent's default handler if no path matches.
```js
var r1 = wayfarer()
var r2 = wayfarer()

r2.on('/child', () => console.log('subrouter trix!'))
r1.on('/:parent', r2)

r1('/dada/child')
// => 'subrouter trix!'
```

## Walk
Sometimes it's necessary to walk the `trie` to apply transformations.
```js
var walk = require('wayfarer/walk')
var wayfarer = require('wayfarer')

var router = wayfarer()
router.on('/multiply', (x, y) => x * y)
router.on('/divide', (x, y) => x / y)

walk(router, (route, cb) => {
  var y = 2
  return function (params, x) {
    return cb(x, y)
  }
})

router('/multiply', 4)
// => 8
router('/divide', 8)
// => 4
```

## API
### router = wayfarer(default)
Initialize a router with a default route. Doesn't ignore querystrings and
hashes.

### router.on(route, cb(params, [arg1, ...]))
Register a new route. The order in which routes are registered does not matter.
Routes can register multiple callbacks. The callback can return values when
called.

### val = router(route, [arg1, ...])
Match a route and execute the corresponding callback. Alias: `router.emit()`.
Returns a values from the matched route (e.g. useful for streams). Any
additional values will be passed to the matched route.

## Internals
Wayfarer is built on an internal trie structure. If you want to build a router
using this trie structure it can be accessed through
`require('wayfarer/trie')`. It exposes the following methods:
- `trie = Trie()` - create a new trie
- `node = trie.create(route)` - create a node at a path, and return a node
- `node = trie.match(route)` - match a route on the the trie and return a node
- `trie.mount(path, trie)` - mount a trie onto a node at route

## Known issues
### multiple nested partials don't match
E.g. `/:foo/:bar/:baz` won't work. This is due `Trie.mount()` overriding child
partial paths when mounted. I'll get around to fixing this at some point in the
future, but if anyone wants to contribute a patch it'd most appreciated.

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
- [sheet-router](https://github.com/yoshuawuyts/sheet-router) - fast, modular
  client-side router
- [server-router](https://github.com/yoshuawuyts/server-router) - server router
- [hash-match](https://github.com/sethvincent/hash-match) - easy
  `window.location.hash` matching
- [pathname-match](https://github.com/yoshuawuyts/pathname-match) - strip
  querystrings and hashes from a url
- [wayfarer-to-server](https://github.com/yoshuawuyts/wayfarer-to-server) -
  Wrap wayfarer to provide HTTP method matching and `req, res` delegation

## License
[MIT](https://tldrlegal.com/license/mit-license)

[0]: https://img.shields.io/badge/stability-2%20stable-brightgreen.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://img.shields.io/npm/v/wayfarer.svg?style=flat-square
[3]: https://npmjs.org/package/wayfarer
[4]: https://img.shields.io/travis/yoshuawuyts/wayfarer/master.svg?style=flat-square
[5]: https://travis-ci.org/yoshuawuyts/wayfarer
[6]: https://img.shields.io/codecov/c/github/yoshuawuyts/wayfarer/master.svg?style=flat-square
[7]: https://codecov.io/github/yoshuawuyts/wayfarer
[8]: http://img.shields.io/npm/dm/wayfarer.svg?style=flat-square
[9]: https://npmjs.org/package/wayfarer
[10]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[11]: https://github.com/feross/standard
[12]: http://github.com/raynos/mercury
[13]: http://github.com/raynos/virtual-dom
