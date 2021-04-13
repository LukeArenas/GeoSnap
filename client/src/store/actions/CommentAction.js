import {
  CreateComment,
  DeleteComment,
  GetCommentsByPost
} from '../../services/CommentService'
import { ADD_NEW_COMMENT, DELETE_COMMENT, SET_COMMENTS } from '../types'

export const getCommentsByPost = (postId) => async (dispatch) => {
  try {
    const comments = await GetCommentsByPost(postId)
    dispatch({ type: SET_COMMENTS, payload: comments })
  } catch (error) {
    throw error
  }
}

export const createComment = (body) => async (dispatch) => {
  try {
    const newComment = await CreateComment(body)
    dispatch({ type: ADD_NEW_COMMENT, payload: newComment })
  } catch (error) {
    throw error
  }
}

export const deleteComment = (id) => async (dispatch) => {
  try {
    await DeleteComment(id)
    dispatch({ type: DELETE_COMMENT, payload: id })
  } catch (error) {
    throw error
  }
}
