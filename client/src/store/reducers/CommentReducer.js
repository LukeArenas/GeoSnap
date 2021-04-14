const { DELETE_COMMENT, SET_COMMENTS } = require('../types')

const initialState = {
  comments: []
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
    default:
      return { ...state }
  }
}

export default CommentReducer
