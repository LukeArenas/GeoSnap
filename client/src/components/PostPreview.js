import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = ({ postState, authState }) => {
  return { postState, authState }
}

const mapActionsToProps = (dispatch) => {
  return {
    // createPost: (body) => dispatch(createPost(body))
  }
}

const PostPreview = (props) => {
  const { caption } = props.postState.newPost
  const { currentUser } = props.authState

  return (
    <div className="preview">
      <div className="preview-container">
        <h3 className="section-title">Preview</h3>
        <div>
          {currentUser && props.authState.file ? (
            <div className="user-container">
              <img
                src={currentUser.profilePicture}
                alt={currentUser.username}
                className="profile-picture"
              />
              <h4>@{currentUser.username}</h4>
            </div>
          ) : null}
        </div>

        <img
          src={
            props.authState.file
              ? URL.createObjectURL(props.authState.file)
              : ''
          }
          alt={caption}
          className="preview-pic"
        />

        <h4 className="align-text-left">{caption}</h4>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapActionsToProps)(PostPreview)
