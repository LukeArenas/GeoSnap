const { User } = require('../models')
const { ComparePassword, CreateToken, HashPassword } = require('../middleware')

const Login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.body.username },
      raw: true
    })
    if (
      user &&
      (await ComparePassword(req.body.password, user.passwordDigest))
    ) {
      let payload = {
        id: user.id,
        username: user.username,
        profilePicture: user.profilePicture
      }
      let token = CreateToken(payload)
      return res.send({ user: payload, token })
    }
    return res.status(401).send({ msg: 'Unauthorized', reason: 'Login Failed' })
  } catch (error) {
    throw error
  }
}

const Register = async (req, res) => {
  try {
    const { username, password, email, profilePicture } = req.body
    let passwordDigest = await HashPassword(password)
    const user = await User.create({
      email,
      username,
      passwordDigest,
      profilePicture
    })
    res.send(user)
  } catch (error) {
    throw error
  }
}

const GetCurrentUser = async (req, res) => {
  console.log(res)
  try {
    res.send(res.locals.token)
  } catch (error) {
    throw error
  }
}

module.exports = {
  Login,
  Register,
  GetCurrentUser
}
