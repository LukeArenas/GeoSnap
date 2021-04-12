const { User } = require('../models')

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll()
    res.send(users)
  } catch (error) {
    throw error
  }
}

const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body)
    res.send(newUser)
  } catch (error) {
    throw error
  }
}

module.exports = { getAllUsers, createUser }
