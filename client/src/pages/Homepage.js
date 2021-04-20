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
    <div className="homepage">
      <div className="homepage-gif">
        <h3 className="greeting">Capture the moment</h3>
        <img
          src="https://i.pinimg.com/originals/d7/ae/01/d7ae0170d3d5ffcbaa7f02fdda387a3b.gif"
          alt="spinning globe"
          className="homepage-image"
        />
      </div>
      <div className="credentials-container">
        {isRegistered ? (
          <div className="credentials-form">
            <Login />
          </div>
        ) : (
          <div className="credentials-form">
            <Register />
          </div>
        )}
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapActionsToProps)(Homepage)
