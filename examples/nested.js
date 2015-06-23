const wayfarer = require('wayfarer')

const userRouter = wayfarer()
const repoRouter = wayfarer()

userRouter.on('/user/:user', repoRouter)
repoRouter.on('/:repo', params => {
  console.log(params.user, params.repo)
})

userRouter('/user/timoxley/linklocal')
// => timoxley linklocal

const commitRouter = wayfarer()
commitRouter.on('/commit/:hash', params => {
  console.log(params.user, params.repo, params.hash)
})

repoRouter.on('/:repo', commitRouter)
userRouter('/user/timoxley/linklocal/commit/cda1eaa8')
// => timoxley linklocal cda1eaa8
