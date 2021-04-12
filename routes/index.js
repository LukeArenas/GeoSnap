const AppRouter = require('express').Router()
const UserRouter = require('./UserRouter')
const PostRouter = require('./PostRouter')
const CommentRouter = require('./CommentRouter')

AppRouter.use('/users', UserRouter)
AppRouter.use('/posts', PostRouter)
AppRouter.use('/comments', CommentRouter)

module.exports = AppRouter
