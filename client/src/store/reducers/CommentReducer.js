const { DELETE_COMMENT, SET_COMMENTS, SET_NEW_COMMENT } = require('../types')

const initialState = {
  comments: [],
  newComment: {}
}

const CommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMENTS:
      return { ...state, comments: action.payload }
    case DELETE_COMMENT:
      const revisedComments = state.comments.filter((comment) => {
        return comment.id !== action.payload
      })
      return { ...state, comments: revisedComments }
    case SET_NEW_COMMENT:
      return {
        ...state,
        newComment: {
          ...state.newComment,
          [action.payload.name]: action.payload.value
        }
      }
    default:
      return { ...state }
  }
}

export default CommentReducer
