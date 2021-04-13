import Client from './index'

export const GetCommentsByPost = async (postId) => {
  try {
    const res = await Client.get(`/comments/${postId}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const CreateComment = async (body) => {
  try {
    const res = await Client.post(`/comments`, body)
    return res.data
  } catch (error) {
    throw error
  }
}
