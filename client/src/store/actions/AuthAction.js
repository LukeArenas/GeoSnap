import { Login, Register, CheckStoredToken } from '../../services/AuthService'
import {
  SET_AUTHENTICATED,
  SET_CURRENT_USER,
  SET_LOGIN_CREDS,
  SET_NEW_USER,
  SET_REGISTERED
} from '../types'

export const login = (body) => async (dispatch) => {
  const response = await Login(body)
  localStorage.setItem('token', response.token)
  dispatch({ type: SET_CURRENT_USER, payload: response.user })
}

export const register = (body) => async (dispatch) => {
  const newUser = await Register(body)
  console.log(`User created with id ${newUser.id}`)
}

export const setCreds = (name, value) => ({
  type: SET_LOGIN_CREDS,
  payload: { name: name, value: value }
})

export const setNewUser = (e) => ({
  type: SET_NEW_USER,
  payload: { name: e.target.name, value: e.target.value }
})

export const setRegistered = (bool) => ({
  type: SET_REGISTERED,
  payload: bool
})

export const setAuthenticated = () => ({
  type: SET_AUTHENTICATED
})

export const checkStoredToken = () => async (dispatch) => {
  const response = await CheckStoredToken()
  dispatch({ type: SET_CURRENT_USER, payload: response })
}

export const logout = () => ({ type: SET_CURRENT_USER, payload: {} })
