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

const updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.update(req.body, {
      where: { id: req.params.id },
      returning: true
    })
    res.send(updatedPost)
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

module.exports = { getAllPosts, createPost, updatePost, deletePost }
