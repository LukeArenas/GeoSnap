const Router = require('express').Router()
const controller = require('../controllers/PostController')
const multer = require('multer')
const storage = multer.memoryStorage() //stores on server memory (RAM)
const upload = multer({ storage })
const { StripToken, VerifyToken } = require('../middleware')

Router.get('/:id', controller.getPostById)
Router.get('/', controller.getAllPosts)
Router.post(
  '/',
  StripToken,
  VerifyToken,
  upload.single('image'),
  controller.createPost
)
Router.put('/:id', StripToken, VerifyToken, controller.updatePost)
Router.delete('/:id', StripToken, VerifyToken, controller.deletePost)

module.exports = Router
