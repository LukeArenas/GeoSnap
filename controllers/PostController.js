const { Post } = require('../models')

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll()
    res.send(posts)
  } catch (error) {
    throw error
  }
}

const createPost = async (req, res) => {
  try {
    const newPost = await Post.create(req.body)
    res.send(newPost)
  } catch (error) {
    throw error
  }
}

module.exports = { getAllPosts, createPost }
