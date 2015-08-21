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
  const routes = routington()
  const subrouters = routington()

  emit._subrouters = subrouters
  emit._default = defaultFn
  emit._routes = routes
  emit[sym] = true

  emit.emit = emit
  emit.on = on

  return emit

  // define a path
  // (str, fn) -> obj
  function on (path, cb) {
    assert.equal(typeof path, 'string')
    assert.equal(typeof cb, 'function')
    path = sanitizeUri(path) || ''
    const node = cb[sym] ? subrouters.define(path)[0] : routes.define(path)[0]
    if (Array.isArray(node.cb)) node.cb.push(cb)
    else node.cb = [cb]
    return emit
  }

  // match and call a route
  // str -> null
  function emit (path, params, parentDefault) {
    path = sanitizeUri(path) || ''
    params = params || {}

    const sub = matchSub(path)
    if (sub) path = sub.path

    const localDft = routes.match(dft) || parentDefault
    const match = sub ? sub.matched : routes.match(path) || localDft
    assert.ok(match, 'path ' + path + ' did not match')
    params = xtend(params, match.param)

    // only nested routers need a path
    match.node.cb.forEach(function (cb) {
      sub ? cb(path, params, localDft) : cb(params)
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
    const split = path.split('/')
    var count = split.length

    var n = 0
    while (n < split.length) {
      var arr = []
      var ln = split.length - n
      var cnt = -1

      while (++cnt < ln) {
        arr.push(split[cnt])
      }

      var nw = arr.join('/')
      var imatch = subrouters.match(nw)
      if (imatch) {
        match = imatch
        count = arr.length
        break
      }
      n++
    }

    if (!match) return

    while (count--) {
      split.shift()
    }

    path = split.join('/')
    const ret = {
      matched: match,
      path: path
    }
    return ret
  }
}

// strip leading `/`
// str -> str
function sanitizeUri (str) {
  str = str || ''
  return str.replace(/^\//, '')
}
