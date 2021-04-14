import React from 'react'
import { connect } from 'react-redux'
import { login } from '../store/actions/AuthAction'

//MAP STATE AND ACTIONS TO PROPS
const mapStateToProps = ({ authState }) => {
  return { authState }
}

const mapActionsToProps = (dispatch) => {
  return {
    login: (body) => dispatch(login(body))
  }
}

const Register = (props) => {
  return (
    <div>
      <h2>SignUp</h2>
      {/* <form onSubmit={(event) => handleSubmit(event)}>
        <input
          name="username"
          placeholder="username"
          type="text"
          value={username}
          onChange={(event) => handleChange(event)}
        />
        <br></br>
        <input
          name="email"
          placeholder="email"
          type="text"
          value={email}
          onChange={(event) => handleChange(event)}
        />
        <br></br>
        <input
          name="password"
          placeholder="password"
          type="text"
          value={password}
          onChange={(event) => handleChange(event)}
        />
        <br></br>
        <input className="page-buttons" type="submit" value="Submit" />
      </form> */}
    </div>
  )
}

export default connect(mapStateToProps, mapActionsToProps)(Register)
