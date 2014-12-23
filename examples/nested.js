
// In some cases you might want to have routers
// in separate files. This example shows how to
// pass a path from one router into the next.

const wayfarer  = require('wayfarer')

const main     = wayfarer({ default: '/404' })
const settings = wayfarer({ default: '/404' })
const user     = wayfarer({ default: '/user' })

// main
main.on('/', () => console.log('root route'))
main.on('/:user/*', user.match.bind(user)) // needs testing
main.on('/settings/*', settings.match.bind(settings)) // needs testing
main.on('/404', () => console.warn('path not found'))

// settings
settings.on('/settings/foo', () => console.log('foo'))
settings.on('/settings/bar', () => console.log('bar'))
settings.on('/404', () => main.match.bind(main))

// user
user.on('/:user', (uri, params) => console.log('/', params.user))
user.on('/:user/commits', () => console.log('/', params.user, '/commits'))

main.match(window.location.pathname)
