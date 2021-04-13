const { SET_COMMENTS } = require('../types')

const initialState = {
  comments: []
}

const CommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMENTS:
      return { ...state, comments: action.payload }
    default:
      return { ...state }
  }
}

export default CommentReducer
