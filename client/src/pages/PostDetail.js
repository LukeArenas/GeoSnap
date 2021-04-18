import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  deletePost,
  getPostById,
  setEditing,
  setUpdatedPost,
  updatePost
} from '../store/actions/PostAction'
import Comment from '../components/Comment'
import { useHistory } from 'react-router'
import '../styles/Post.css'

const mapStateToProps = ({ postState, commentState, authState }) => {
  return { postState, commentState, authState }
}

const mapActionsToProps = (dispatch) => {
  return {
    getPostById: (id) => dispatch(getPostById(id)),
    deletePost: (id) => dispatch(deletePost(id)),
    setEditing: () => dispatch(setEditing()),
    setUpdatedPost: (e) => dispatch(setUpdatedPost(e)),
    updatePost: (body) => dispatch(updatePost(body))
  }
}

//COMPONENT
const PostDetail = (props) => {
  const { image, caption, User } = props.postState.selectedPost

  //USE HISTORY
  const history = useHistory()

  //METHODS

  const handleDelete = (id) => {
    props.deletePost(id)
    history.push('/map')
  }

  const handleEdit = () => {
    props.setEditing()
  }

  const handleChange = (e) => {
    props.setUpdatedPost(e)
  }

  const handleUpdates = (e) => {
    props.updatePost(props.postState.selectedPost)
    props.setEditing()
  }

  //USE EFFECT
  useEffect(() => {
    if (!props.postState.selectedPost.User) {
      props.getPostById(props.postState.selectedPost.id)
    }
  }, [])

  return (
    <div className="detail-page">
      <div className="post-card">
        <div className="grid-container">
          {User ? (
            <div className="poster-container">
              <img
                src={User.profilePicture}
                alt={User.username}
                className="profile-picture"
              />
              <h4 className="handle">@{User.username}</h4>
            </div>
          ) : null}
          {props.authState.currentUser.username ===
          props.postState.selectedPost.User.username ? (
            <div className="dropdown">
              <button
                onClick={(e) => (e.target.nextSibling.className = '.show')}
                class="dropbtn"
              >
                ...
              </button>
              <div className="dropdown-content">
                <div className="dropdown-option">
                  <button
                    onClick={() =>
                      handleDelete(props.postState.selectedPost.id)
                    }
                    className="dropdown-choice"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEdit()}
                    className="dropdown-choice"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        {props.postState.isEditing ? (
          <div className="edit-field">
            <img src={image} alt={caption} className="post-picture" />
            <input
              type="text"
              placeholder="caption"
              value={caption}
              name="caption"
              onChange={(e) => handleChange(e)}
            />
            <div className="done-btn">
              <button onClick={(e) => handleUpdates(e)}>Done</button>
            </div>
          </div>
        ) : (
          <div className="align-text-left">
            <img src={image} alt={caption} className="post-picture" />
            <h4>{caption}</h4>
          </div>
        )}
      </div>

      <div className="comment-section">
        <h3 className="section-title">
          Comments ({props.commentState.comments.length})
        </h3>
        <Comment selectedPost={props.selectedPost} />
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapActionsToProps)(PostDetail)
