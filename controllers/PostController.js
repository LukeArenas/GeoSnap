const { Post, Comment, User } = require('../models')
const { upload } = require('../aws')

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: User, attributes: ['username', 'profilePicture'] }],
      order: [['createdAt', 'DESC']]
    })
    res.send(posts)
  } catch (error) {
    throw error
  }
}

const getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username', 'profilePicture']
        }
      ]
    })
    res.send(post)
  } catch (error) {
    throw error
  }
}

const createPost = async (req, res) => {
  try {
    const uploadParams = await upload(req.file)
    const newPost = await Post.create({
      ...req.body,
      image: uploadParams.image,
      fileName: uploadParams.fileName
    })
    res.send(newPost)
  } catch (error) {
    throw error
  }
}

const updatePost = async (req, res) => {
  try {
    await Post.update(req.body, {
      where: { id: req.params.id },
      returning: true
    })
    const post = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username', 'profilePicture']
        }
      ]
    })
    res.send(post)
  } catch (error) {
    throw error
  }
}

const deletePost = async (req, res) => {
  try {
    await Post.destroy({ where: { id: req.params.id } })
    res.send(`Post with id ${req.params.id} deleted.`)
  } catch (error) {
    throw error
  }
}

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
}
