import React from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { register, setNewUser } from '../store/actions/AuthAction'

//MAP STATE AND ACTIONS TO PROPS
const mapStateToProps = ({ authState }) => {
  return { authState }
}

const mapActionsToProps = (dispatch) => {
  return {
    register: (body) => dispatch(register(body)),
    setNewUser: (e) => dispatch(setNewUser(e))
  }
}

const Register = (props) => {
  //DESTRUCTURING
  const { email, password, username } = props.authState.newUser

  //USE HISTORY
  const history = useHistory()

  //METHODS
  const handleChange = (e) => {
    props.setNewUser(e)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.register(props.authState.newUser)
    history.push('/map')
  }

  return (
    <div>
      <h2>SignUp</h2>
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
          name="email"
          placeholder="email"
          type="text"
          value={email}
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

export default connect(mapStateToProps, mapActionsToProps)(Register)
