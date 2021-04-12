const Router = require('express').Router()
const controller = require('../controllers/PostController')

Router.get('/', controller.getAllPosts)
Router.post('/', controller.createPost)

module.exports = Router
