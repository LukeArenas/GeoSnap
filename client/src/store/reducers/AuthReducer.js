import { SET_CURRENT_USER, SET_LOGIN_CREDS } from '../types'

const initialState = {
  currentUser: {},
  loginCreds: {
    username: '',
    password: ''
  }
}

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, currentUser: action.payload }
    case SET_LOGIN_CREDS:
      return {
        ...state,
        loginCreds: {
          ...state.loginCreds,
          [action.payload.name]: action.payload.value
        }
      }
    default:
      return { ...state }
  }
}

export default AuthReducer
