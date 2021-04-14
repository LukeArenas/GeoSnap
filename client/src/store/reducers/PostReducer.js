const { SET_POSTS, SET_SELECTED_POST, ADD_NEW_POST } = require('../types')

const initialState = {
  posts: [],
  selectedPost: {}
}

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS:
      return { ...state, posts: action.payload }
    case SET_SELECTED_POST:
      return { ...state, selectedPost: action.payload }
    case ADD_NEW_POST:
      return { ...state, posts: [...state.posts, action.payload] }
    case SET_SELECTED_POST:
      return { ...state, selectedPost: action.payload }
    default:
      return { ...state }
  }
}

export default PostReducer
