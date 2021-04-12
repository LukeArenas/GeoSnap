const { Comment } = require('../models')

const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll()
    res.send(comments)
  } catch (error) {
    throw error
  }
}

const createComment = async (req, res) => {
  try {
    const newComment = await Comment.create(req.body)
    res.send(newComment)
  } catch (error) {
    throw error
  }
}

module.exports = { getAllComments, createComment }
