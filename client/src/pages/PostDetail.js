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

const mapStateToProps = ({ postState }) => {
  return { postState }
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
      props.getPostById(props.selectedPost.id)
    }
  }, [])

  return (
    <div>
      <div>
        {User ? (
          <div>
            <img
              src={User.profilePicture}
              alt={User.username}
              className="profile-picture"
            />
            <h4 className="handle">@{User.username}</h4>
          </div>
        ) : null}
      </div>
      <img src={image} alt={caption} className="post-picture" />
      {props.postState.isEditing ? (
        <div>
          <input
            type="text"
            placeholder="caption"
            value={caption}
            name="caption"
            onChange={(e) => handleChange(e)}
          />
          <button onClick={(e) => handleUpdates(e)}>Done</button>
        </div>
      ) : (
        <div>
          <h4>{caption}</h4>
          <button onClick={() => handleEdit()}>...</button>
        </div>
      )}
      <button onClick={() => handleDelete(props.selectedPost.id)}>X</button>
      <h3>Comments:</h3>
      <Comment selectedPost={props.selectedPost} />
    </div>
  )
}

export default connect(mapStateToProps, mapActionsToProps)(PostDetail)
