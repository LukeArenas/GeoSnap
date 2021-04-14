import Client from './index'

export const GetAllPosts = async () => {
  try {
    const res = await Client.get('/posts')
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetPostById = async (id) => {
  try {
    const res = await Client.get(`/posts/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const CreatePost = async (body) => {
  try {
    const res = await Client.post(`/posts`, body)
    return res.data
  } catch (error) {
    throw error
  }
}

export const DeletePost = async (id) => {
  try {
    const res = await Client.delete(`/posts/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const UpdatePost = async (body) => {
  try {
    const res = await Client.put(`/posts/${body.id}`, body)
    return res.data
  } catch (error) {
    throw error
  }
}
