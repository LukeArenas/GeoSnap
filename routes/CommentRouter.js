const Router = require('express').Router()
const controller = require('../controllers/CommentController')

Router.get('/:post_id', controller.getCommentsByPost)
Router.get('/', controller.getAllComments)
Router.post('/', controller.createComment)
Router.delete('/:id', controller.deleteComment)

module.exports = Router
