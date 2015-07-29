const methodist = require('methodist')
const wayfarer = require('wayfarer')
const http = require('http')

const server = http.createServer((req, res) => {
  const router = wayfarer()
  router.on('/hello', methodist(req, {
    all: params => console.log('any route matches'),
    get: params => console.log('get')
  }))
})

server.listen(1337)
