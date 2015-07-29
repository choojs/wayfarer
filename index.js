const routington = require('routington')
const symbol = require('es6-symbol')
const assert = require('assert')
const xtend = require('xtend')

const sym = symbol('wayfarer')

module.exports = wayfarer

// create a router
// str -> obj
function wayfarer (dft) {
  dft = sanitizeUri(dft) || ''
  const router = routington()
  const mounts = routington()

  emit[sym] = true
  emit.default = defaultFn
  emit.emit = emit
  emit.on = on

  return emit

  // define a path
  // (str, fn) -> obj
  function on (path, cb) {
    assert.equal(typeof path, 'string')
    assert.equal(typeof cb, 'function')
    path = sanitizeUri(path) || ''
    const node = cb[sym] ? mounts.define(path)[0] : router.define(path)[0]
    if (Array.isArray(node.cb)) node.cb.push(cb)
    else node.cb = [cb]
    return emit
  }

  // match and call a route
  // str -> null
  function emit (path, params) {
    path = sanitizeUri(path) || ''
    params = params || {}

    const sub = matchSub(path)
    if (sub) path = sub.path

    const match = sub ? sub.match : router.match(path) || router.match(dft)
    assert.ok(match, 'path ' + path + ' did not match')
    params = xtend(params, match.param)

    // only nested routers need a path
    match.node.cb.forEach(function (cb) {
      sub ? cb(path, params) : cb(params)
    })
  }

  // match the default route
  // obj? -> null
  function defaultFn (params) {
    emit(dft, params)
  }

  // match a mounted router
  // str -> obj|null
  function matchSub (path) {
    var match = null
    var count = 0
    const split = path.split('/')

    var n = 0
    while (n < split.length) {
      var ln = split.length - n
      var cnt = -1
      var nw = ''
      while (++cnt < ln) nw = nw ? nw.concat('/', split[cnt]) : split[cnt]

      var imatch = mounts.match(nw)
      if (imatch) {
        match = imatch
        count += n
        break
      }
      n++
    }

    if (!match) return
    while (count--) split.shift()
    path = split.join('/')
    return { match: match, path: path }
  }
}

// strip leading `/`
// str -> str
function sanitizeUri (str) {
  str = str || ''
  return str.replace(/^\//, '')
}
