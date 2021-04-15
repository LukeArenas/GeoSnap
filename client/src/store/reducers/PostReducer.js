const {
  SET_POSTS,
  SET_SELECTED_POST,
  ADD_NEW_POST,
  DELETE_POST,
  SET_EDITING,
  SET_UPDATED,
  SET_NEW_POST
} = require('../types')

const initialState = {
  posts: [],
  selectedPost: {},
  isEditing: false,
  newPost: {
    image: '',
    caption: '',
    latitude: null,
    longitude: null
  }
}

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS:
      return { ...state, posts: action.payload }
    case SET_SELECTED_POST:
      return { ...state, selectedPost: action.payload }
    case ADD_NEW_POST:
      return { ...state, posts: [...state.posts, action.payload] }
    case DELETE_POST:
      const revisedPosts = state.posts.filter((post) => {
        return post.id !== action.payload
      })
      return { ...state, posts: revisedPosts }
    case SET_EDITING:
      return { ...state, isEditing: !state.isEditing }
    case SET_UPDATED:
      return {
        ...state,
        selectedPost: {
          ...state.selectedPost,
          [action.payload.name]: action.payload.value
        }
      }
    case SET_NEW_POST:
      return {
        ...state,
        newPost: {
          ...state.newPost,
          [action.payload.name]: action.payload.value
        }
      }
    default:
      return { ...state }
  }
}

export default PostReducer
