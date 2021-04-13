const { Comment, User } = require('../models')

const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll()
    res.send(comments)
  } catch (error) {
    throw error
  }
}

const getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { postId: req.params.postId },
      include: [{ model: User, attributes: ['username', 'profilePicture'] }]
    })
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

const deleteComment = async (req, res) => {
  try {
    await Comment.destroy({ where: { id: req.params.id } })
    res.send(`Comment with id ${req.params.id} deleted.`)
  } catch (error) {
    throw error
  }
}

module.exports = {
  getAllComments,
  getCommentsByPost,
  createComment,
  deleteComment
}
