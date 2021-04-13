import {
  CreatePost,
  GetAllPosts,
  GetPostById
} from '../../services/PostService'
import { SET_POSTS, SET_SELECTED_POST, ADD_NEW_POST } from '../types'

export const getAllPosts = () => async (dispatch) => {
  try {
    const posts = await GetAllPosts()
    dispatch({ type: SET_POSTS, payload: posts })
  } catch (error) {
    throw error
  }
}

export const getPostById = (id) => async (dispatch) => {
  try {
    const post = await GetPostById(id)
    dispatch({ type: SET_SELECTED_POST, payload: post })
  } catch (error) {
    throw error
  }
}

export const createPost = (body) => async (dispatch) => {
  try {
    const newPost = await CreatePost(body)
    dispatch({ type: ADD_NEW_POST, payload: newPost })
  } catch (error) {
    throw error
  }
}
