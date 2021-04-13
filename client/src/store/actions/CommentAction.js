import { GetCommentsByPost } from '../../services/CommentService'
import { SET_COMMENTS } from '../types'

export const getCommentsByPost = (postId) => async (dispatch) => {
  try {
    const comments = await GetCommentsByPost(postId)
    dispatch({ type: SET_COMMENTS, payload: comments })
  } catch (error) {
    throw error
  }
}
