import { Login, Register } from '../../services/AuthService'
import {
  SET_AUTHENTICATED,
  SET_CURRENT_USER,
  SET_LOGIN_CREDS,
  SET_NEW_USER,
  SET_REGISTERED
} from '../types'

export const login = (body) => async (dispatch) => {
  const response = await Login(body)
  dispatch({ type: SET_CURRENT_USER, payload: response.user })
}

export const register = (body) => async (dispatch) => {
  const newUser = await Register(body)
  console.log(`User created with id ${newUser.id}`)
}

export const setCreds = (e) => ({
  type: SET_LOGIN_CREDS,
  payload: { name: e.target.name, value: e.target.value }
})

export const setNewUser = (e) => ({
  type: SET_NEW_USER,
  payload: { name: e.target.name, value: e.target.value }
})

export const setRegistered = () => ({
  type: SET_REGISTERED
})

export const setAuthenticated = () => ({
  type: SET_AUTHENTICATED
})
