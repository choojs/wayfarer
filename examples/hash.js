const wayfarer = require('wayfarer')
const match = require('hash-match')

// register router
const router = wayfarer('/')
router.on('/', () => console.log('/'))
router.on('/skills', () => console.log('skills'))
router.on('/about', () => console.log('about'))
router.on('/contact', () => console.log('contact'))

// match once on init
router(match(window.location.hash))

// listen to hash changes
window.addEventListener('hashchange', () => {
  router(match(window.location.hash))
})

// change hash
window.location.hash = 'contact'
