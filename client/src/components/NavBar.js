import React from 'react'
import { connect } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import { logout, setAuthenticated } from '../store/actions/AuthAction'

const mapStateToProps = ({ authState }) => {
  return { authState }
}

const mapActionsToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    setAuthenticated: () => dispatch(setAuthenticated())
  }
}

const NavBar = (props) => {
  //USE HISTORY

  const history = useHistory()

  //METHODS

  const logoutUser = () => {
    console.log('clicked logout!')
    localStorage.clear()
    props.setAuthenticated()
    props.logout()
    history.push('/')
  }

  return (
    <div>
      {props.authState.isAuthenticated ? (
        <div>
          <NavLink to="/map">
            <button>Map</button>
          </NavLink>
          <NavLink to="/post">
            <button>Post</button>
          </NavLink>
          <button onClick={() => logoutUser()}>Logout</button>
        </div>
      ) : (
        <div>
          <button>Login</button>
          <button>Sign Up</button>
        </div>
      )}
    </div>
  )
}

export default connect(mapStateToProps, mapActionsToProps)(NavBar)
