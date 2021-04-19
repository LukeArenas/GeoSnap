import React from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { login, setAuthenticated, setCreds } from '../store/actions/AuthAction'

//MAP STATE AND ACTIONS TO PROPS
const mapStateToProps = ({ authState }) => {
  return { authState }
}

const mapActionsToProps = (dispatch) => {
  return {
    login: (body) => dispatch(login(body)),
    setCreds: (name, value) => dispatch(setCreds(name, value)),
    setAuthenticated: () => dispatch(setAuthenticated())
  }
}

const Login = (props) => {
  //DESTRUCTURING
  const { password, username } = props.authState.loginCreds
  const { loginCreds } = props.authState

  //USE HISTORY
  const history = useHistory()

  //METHODS
  const handleChange = (e) => {
    props.setCreds(e.target.name, e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let response
    if (loginCreds) {
      response = await props.login(props.authState.loginCreds)
    }
    props.setCreds('password', '')
    props.setCreds('username', '')
    console.log(response)
    if (response.token) {
      history.push('/map')
    }
  }

  return (
    <div>
      <h2>Sign In</h2>
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
          type="password"
          value={password}
          onChange={(e) => handleChange(e)}
        />
        <br></br>
        <input className="form-btn" type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default connect(mapStateToProps, mapActionsToProps)(Login)
