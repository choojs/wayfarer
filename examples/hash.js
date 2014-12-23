
// An example router matching hash routes only.
// Uses `hash-match` to normalize the hashed
// routes before passing it into wayfarer.
// https://github.com/sethvincent/hash-match

const hashMatch = require('hash-match')
const wayfarer  = require('wayfarer')

const router = wayfarer({ default: '/' })
router.on('/', () => console.log('root route'))
router.on('/wat', () => console.log('wat'))

// Here's where hashMatch does its thing:
router.match(hashMatch(window.location.hash))
