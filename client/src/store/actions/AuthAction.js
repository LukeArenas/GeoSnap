import { Login, Register } from '../../services/AuthService'
import { SET_CURRENT_USER, SET_LOGIN_CREDS } from '../types'

export const login = (body) => async (dispatch) => {
  const response = await Login(body)
  dispatch({ type: SET_CURRENT_USER, payload: response.user })
}

export const setCreds = (e) => ({
  type: SET_LOGIN_CREDS,
  payload: { name: e.target.name, value: e.target.value }
})
