import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import PostReducer from './reducers/PostReducer'

const store = createStore(
  combineReducers({ postState: PostReducer }),
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
