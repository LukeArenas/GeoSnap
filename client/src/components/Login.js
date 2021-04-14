import React from 'react'
import { connect } from 'react-redux'
import { login, setCreds } from '../store/actions/AuthAction'
import { SET_LOGIN_CREDS } from '../store/types'

//MAP STATE AND ACTIONS TO PROPS
const mapStateToProps = ({ authState }) => {
  return { authState }
}

const mapActionsToProps = (dispatch) => {
  return {
    login: (body) => dispatch(login(body)),
    setCreds: (e) => dispatch(setCreds(e))
  }
}

const Login = (props) => {
  //DESTRUCTURING
  const { password, username } = props.authState.loginCreds

  //METHODS
  const handleChange = (e) => {
    props.setCreds(e)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.login(props.authState.loginCreds)
  }

  return (
    <div>
      <h2>SignIn</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          name="username"
          placeholder="username"
          type="text"
          value={username}
          onChange={(e) => handleChange(e)}
        />
        <br></br>
        <input
          name="password"
          placeholder="password"
          type="text"
          value={password}
          onChange={(e) => handleChange(e)}
        />
        <br></br>
        <input className="page-buttons" type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default connect(mapStateToProps, mapActionsToProps)(Login)
