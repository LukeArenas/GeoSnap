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
  const { image, caption } = props.postState.newPost
  const { currentUser } = props.authState

  return (
    <div>
      <h3>Preview</h3>
      <div>
        {currentUser ? (
          <div>
            <img src={currentUser.profilePicture} alt={currentUser.username} />
            <h4>@{currentUser.username}</h4>
          </div>
        ) : null}
      </div>
      <img src={image} alt={caption} />
      <h4>{caption}</h4>
    </div>
  )
}

export default connect(mapStateToProps, mapActionsToProps)(PostPreview)
