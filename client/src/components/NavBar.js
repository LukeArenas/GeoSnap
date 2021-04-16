import React from 'react'
import { connect } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import {
  logout,
  setAuthenticated,
  setRegistered
} from '../store/actions/AuthAction'
import Filter from './Filter'

const mapStateToProps = ({ authState }) => {
  return { authState }
}

const mapActionsToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    setAuthenticated: () => dispatch(setAuthenticated()),
    setRegistered: (bool) => dispatch(setRegistered(bool))
  }
}

const NavBar = (props) => {
  //USE HISTORY

  const history = useHistory()

  //METHODS

  const logoutUser = () => {
    localStorage.clear()
    props.setAuthenticated()
    props.logout()
    history.push('/')
  }

  const redirectToLogin = (bool) => {
    props.setRegistered(bool)
    history.push('/')
  }

  return (
    <div>
      {props.authState.isAuthenticated ? (
        <div className="navbar">
          <NavLink to="/profile">
            <button>Profile</button>
          </NavLink>
          <NavLink to="/map">
            <button>Map</button>
          </NavLink>
          <NavLink to="/post">
            <button>Post</button>
          </NavLink>
          <button onClick={() => logoutUser()}>Logout</button>
          {/* <Filter /> */}
        </div>
      ) : (
        <div>
          <button onClick={() => redirectToLogin(true)}>Login</button>
          <button onClick={() => redirectToLogin(false)}>Sign Up</button>
        </div>
      )}
    </div>
  )
}

export default connect(mapStateToProps, mapActionsToProps)(NavBar)
