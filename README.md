# wayfarer
[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Downloads][downloads-image]][downloads-url]

Modular [trie based](https://github.com/jonathanong/routington/) based router. Works best with
[Browserify](github.com/substack/browserify).

## Installation
```bash
$ npm install wayfarer
```

## Usage
```js
const wayfarer = require('wayfarer')

const router = wayfarer({ default: '/404' })

router.on('/', () => console.log('/'))
router.on('/404', () => console.log('/404'))
router.on('/:user', () => console.log('/user'))

router.match('/tobi')
// => '/:user'
```

## API
#### wayfarer(opts)
Initialize wayfarer with options. `default` allows setting a default path
to match if none other match. Ignores query strings.
```js
const router = wayfarer({ default: '/404' })
```

#### .on(path, cb)
Register a new path. Wayfarer uses a trie to match routes, so the order in
which routes are registered does not matter.
```js
router.on('/', () => console.log('do stuff'))
router.on('/:user', () => console.log('do user stuff'))
```

Partial paths are supported through the `/:` operator, and the callback
provides a param object. With a route like `/:user` if you navigated to
`/somename`, you'd get a param object like this: `{ user: 'somename' }`.
```js
router.on('/:user', (uri, param) => console.log('do user stuff', param.user))
```

#### .match(path)
Match a path against the saved paths in the router. If a match is
found the registered callback will be executed.
```js
router.match('/tobi')
// => 'do user stuff'
```

## See Also
- [hash-match](https://github.com/sethvincent/hash-match) - easy `window.location.hash` matching
- [pathname-match](https://github.com/yoshuawuyts/pathname-match) - strip a url to only match the pathname

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
