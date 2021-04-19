import {
  CreateComment,
  DeleteComment,
  GetCommentsByPost
} from '../../services/CommentService'
import { DELETE_COMMENT, SET_COMMENTS, SET_NEW_COMMENT } from '../types'

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
    const newComments = await CreateComment(body)
    console.log(newComments)
    dispatch({ type: SET_COMMENTS, payload: newComments })
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

export const setNewComment = (name, value) => ({
  type: SET_NEW_COMMENT,
  payload: { name: name, value: value }
})
