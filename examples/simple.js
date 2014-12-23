
// A very simple router. Has a single dynamic route
// for `:user` which shows how to create
// twitter style vanity paths on the client.

const wayfarer  = require('wayfarer')

const router = wayfarer({ default: '/404' })
router.on('/', () => console.log('root route'))
router.on(':user', (uri, params) => console.log('go to user: ', params.user))
router.on('/settings', () => console.log('show settings'))
router.on('/404', () => console.warn('path not found'))

router.match(window.location.pathname)
