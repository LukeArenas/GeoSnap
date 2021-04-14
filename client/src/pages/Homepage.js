import React from 'react'
import { connect } from 'react-redux'
import Register from '../components/Register'
import Login from '../components/Login'
import { setRegistered } from '../store/actions/AuthAction'

//MAP STATE AND ACTIONS TO PROPS
const mapStateToProps = ({ authState }) => {
  return { authState }
}

const mapActionsToProps = (dispatch) => {
  return {
    setRegistered: () => dispatch(setRegistered())
  }
}

const Homepage = (props) => {
  //DESTRUCTURE
  const { isRegistered } = props.authState

  return (
    <div>
      {isRegistered ? (
        <div>
          <Login />
        </div>
      ) : (
        <div>
          <Register />
        </div>
      )}
    </div>
  )
}

export default connect(mapStateToProps, mapActionsToProps)(Homepage)
