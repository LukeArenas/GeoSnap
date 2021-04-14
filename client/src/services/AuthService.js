import Client from './index'

export const Register = async (body) => {
  const res = await Client.post('/auth/register', body)
  return res.data
}

export const Login = async (body) => {
  const res = await Client.post('/auth/login', body)
  return res.data
}