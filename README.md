# wayfarer
[![NPM version][npm-image]][npm-url] [![build status][travis-image]][travis-url] [![Test coverage][coveralls-image]][coveralls-url]

A simple router built for minimalism and speed. Works best with 
[React](facebook.github.io/react) and Browserify(github.com/substack/browserify).

## Installation
```bash
$ npm i --save wayfarer
```

## API
```js
var wayfarer = require('wayfarer');
var router = wayfarer();

router
  .path('/', function() {console.log('/')})
  .path('/home', function() {console.log('/home')})
  .path('/404', function() {console.log('/404')})
  .path('/:user', function() {console.log('/user')});
```

## License
[MIT](https://tldrlegal.com/license/mit-license) © [Yoshua Wuyts](i@yoshuawuyts.com)

[npm-image]: https://img.shields.io/npm/v/wayfarer.svg?style=flat
[npm-url]: https://npmjs.org/package/wayfarer
[travis-image]: https://img.shields.io/travis/yoshuawuyts/wayfarer.svg?style=flat
[travis-url]: https://travis-ci.org/yoshuawuyts/wayfarer
[coveralls-image]: https://img.shields.io/coveralls/yoshuawuyts/wayfarer.svg?style=flat
[coveralls-url]: https://coveralls.io/r/yoshuawuyts/wayfarer?branch=master