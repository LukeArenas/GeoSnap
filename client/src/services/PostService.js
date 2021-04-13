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
