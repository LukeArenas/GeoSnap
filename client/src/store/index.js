import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import AuthReducer from './reducers/AuthReducer'
import CommentReducer from './reducers/CommentReducer'
import PostReducer from './reducers/PostReducer'

const store = createStore(
  combineReducers({
    postState: PostReducer,
    commentState: CommentReducer,
    authState: AuthReducer
  }),
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
