import React from 'react'
import { connect } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import {
  logout,
  setAuthenticated,
  setRegistered
} from '../store/actions/AuthAction'

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
    <div className="navbar-container">
      {props.authState.isAuthenticated ? (
        <div className="navbar">
          <NavLink to="/profile">
            <button className="nav-btn">Profile</button>
          </NavLink>
          <NavLink to="/map">
            <button className="nav-btn">Map</button>
          </NavLink>
          <NavLink to="/post">
            <button className="nav-btn">Post</button>
          </NavLink>
          <button onClick={() => logoutUser()} className="nav-btn">
            Logout
          </button>
          {/* <Filter /> */}
        </div>
      ) : (
        <div className="navbar">
          <button onClick={() => redirectToLogin(true)} className="nav-btn">
            Login
          </button>
          <button onClick={() => redirectToLogin(false)} className="nav-btn">
            Sign Up
          </button>
        </div>
      )}
    </div>
  )
}

export default connect(mapStateToProps, mapActionsToProps)(NavBar)
