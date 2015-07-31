const methodist = require('methodist')
const wayfarer = require('wayfarer')
const http = require('http')

const server = http.createServer((req, res) => {
  const router = wayfarer()
  const method = methodist(req, router)

  router.on('/hello', method({
    all: params => console.log('any route matches'),
    get: params => console.log('get')
  }))

  router(req)
})

server.listen(1337)
