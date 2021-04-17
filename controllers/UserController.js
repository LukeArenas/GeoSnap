const { User } = require('../models')
const { upload } = require('../aws')

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

const updateUser = async (req, res) => {
  console.log(req)
  try {
    const uploadParams = await upload(req.file)
    console.log(uploadParams)
    const updatedUser = await User.update(
      { profilePicture: uploadParams.image, fileName: uploadParams.fileName },
      {
        where: { id: req.params.id },
        returning: true
      }
    )
    res.send(updatedUser)
  } catch (error) {
    throw error
  }
}

module.exports = { getAllUsers, createUser, updateUser }
