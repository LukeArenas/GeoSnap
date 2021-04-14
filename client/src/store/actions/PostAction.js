import {
  CreatePost,
  DeletePost,
  GetAllPosts,
  GetPostById
} from '../../services/PostService'
import {
  DELETE_POST,
  SET_POSTS,
  SET_SELECTED_POST,
  ADD_NEW_POST
} from '../types'

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

export const setSelectedPost = (post) => ({
  type: SET_SELECTED_POST,
  payload: post
})

export const deletePost = (id) => async (dispatch) => {
  try {
    await DeletePost(id)
    dispatch({ type: DELETE_POST, payload: id })
  } catch (error) {
    throw error
  }
}
