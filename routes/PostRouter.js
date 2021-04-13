const Router = require('express').Router()
const controller = require('../controllers/PostController')

Router.get('/', controller.getAllPosts)
Router.post('/', controller.createPost)
Router.put('/:id', controller.updatePost)
Router.delete('/:id', controller.deletePost)

module.exports = Router
