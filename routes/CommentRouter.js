const Router = require('express').Router()
const controller = require('../controllers/CommentController')

Router.get('/', controller.getAllComments)
Router.post('/', controller.createComment)

module.exports = Router
