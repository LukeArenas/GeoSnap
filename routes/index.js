const AppRouter = require('express').Router()
const UserRouter = require('./UserRouter')
const PostRouter = require('./PostRouter')
const CommentRouter = require('./CommentRouter')
const AuthRouter = require('./AuthRouter')

AppRouter.use('/users', UserRouter)
AppRouter.use('/posts', PostRouter)
AppRouter.use('/comments', CommentRouter)
AppRouter.use('/auth', AuthRouter)

module.exports = AppRouter
