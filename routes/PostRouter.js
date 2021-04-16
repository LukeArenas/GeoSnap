const Router = require('express').Router()
const controller = require('../controllers/PostController')
const { StripToken, VerifyToken } = require('../middleware')

Router.get('/:id', controller.getPostById)
Router.get('/', controller.getAllPosts)
Router.post('/', StripToken, VerifyToken, controller.createPost)
Router.put('/:id', StripToken, VerifyToken, controller.updatePost)
Router.delete('/:id', StripToken, VerifyToken, controller.deletePost)

module.exports = Router
