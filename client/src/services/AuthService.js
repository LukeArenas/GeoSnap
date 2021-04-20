import Client from './index'

export const Register = async (body) => {
  const res = await Client.post('/auth/register', body)
  return res.data
}

export const Login = async (body) => {
  const res = await Client.post('/auth/login', body)
  return res.data
}

export const CheckStoredToken = async () => {
  const res = await Client.get('/auth/session')
  return res.data
}

export const UpdateProfilePicture = async (id, data) => {
  const res = await Client.put(`/users/profile/${id}`, data)
  return res.data
}
