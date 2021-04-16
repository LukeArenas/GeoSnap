const Router = require('express').Router()
const controller = require('../controllers/CommentController')
const { StripToken, VerifyToken } = require('../middleware')

Router.get('/:postId', controller.getCommentsByPost)
Router.get('/', controller.getAllComments)
Router.post('/', StripToken, VerifyToken, controller.createComment)
Router.delete('/:id', StripToken, VerifyToken, controller.deleteComment)

module.exports = Router
