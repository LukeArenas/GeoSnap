import {
  CreatePost,
  DeletePost,
  GetAllPosts,
  GetPostById,
  UpdatePost
} from '../../services/PostService'
import {
  DELETE_POST,
  SET_POSTS,
  SET_SELECTED_POST,
  ADD_NEW_POST,
  SET_EDITING,
  SET_UPDATED,
  SET_NEW_POST,
  SET_FILTERED_POSTS,
  SET_FILTER
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

export const setEditing = () => ({
  type: SET_EDITING
})

export const setUpdatedPost = (e) => ({
  type: SET_UPDATED,
  payload: { name: e.target.name, value: e.target.value }
})

export const updatePost = (body) => async (dispatch) => {
  const response = await UpdatePost(body)
  dispatch({ type: SET_SELECTED_POST, payload: response })
}

export const setNewPost = (e) => ({
  type: SET_NEW_POST,
  payload: { name: e.target.name, value: e.target.value }
})

export const setLatLong = (dir, value) => ({
  type: SET_NEW_POST,
  payload: { name: dir, value: value }
})

export const setPosts = (posts) => ({
  type: SET_FILTERED_POSTS,
  payload: posts
})

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter
})

export const setImage = (data) => async (dispatch) => {
  const newPost = await CreatePost(data)
}
