var methodist = require('methodist')
var wayfarer = require('wayfarer')
var http = require('http')

var server = http.createServer((req, res) => {
  var router = wayfarer()
  var method = methodist(req, router)

  router.on('/hello', method({
    all: params => console.log('any route matches'),
    get: params => console.log('get')
  }))

  router(req)
})

server.listen(1337)
