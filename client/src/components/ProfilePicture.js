import React from 'react'
import { connect } from 'react-redux'
import { setFile, updateProfilePicture } from '../store/actions/AuthAction'
import { setEditing } from '../store/actions/PostAction'

const mapStateToProps = ({ authState, postState }) => {
  return { authState, postState }
}

const mapActionsToProps = (dispatch) => {
  return {
    setFile: (file) => dispatch(setFile(file)),
    updateProfilePicture: (id, data) =>
      dispatch(updateProfilePicture(id, data)),
    setEditing: () => dispatch(setEditing())
  }
}

const ProfilePicture = (props) => {
  //METHODS
  const setNewFile = (e) => {
    console.log(e.target.files[0])
    props.setFile(e.target.files[0])
  }

  const submitProfilePicture = (e) => {
    e.preventDefault()
    if (props.authState.file) {
      let formData = new FormData()
      formData.append('profilePicture', props.authState.file)
      console.log(formData.get('profilePicture'))
      props.updateProfilePicture(props.authState.currentUser.id, formData)
    }
    props.setEditing()
  }

  return (
    <div>
      <form onSubmit={(e) => submitProfilePicture(e)}>
        <input type="file" onChange={(e) => setNewFile(e)} />
        <input type="submit" value="Submit" disabled={!props.authState.file} />
      </form>
    </div>
  )
}

export default connect(mapStateToProps, mapActionsToProps)(ProfilePicture)
