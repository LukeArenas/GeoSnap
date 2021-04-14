import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { deletePost, getPostById } from '../store/actions/PostAction'
import Comment from '../components/Comment'
import { useHistory } from 'react-router'

const mapStateToProps = ({ postState }) => {
  return { postState }
}

const mapActionsToProps = (dispatch) => {
  return {
    getPostById: (id) => dispatch(getPostById(id)),
    deletePost: (id) => dispatch(deletePost(id))
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

  //USE EFFECT
  useEffect(() => {
    props.getPostById(props.selectedPost.id)
  }, [])

  const postId = props.selectedPost.id

  return (
    <div>
      <div>
        {User ? (
          <div>
            <img src={User.profilePicture} alt={User.username} />
            <h4>@{User.username}</h4>
          </div>
        ) : null}
      </div>
      <img src={image} alt={caption} />
      <h4>{caption}</h4>
      <button onClick={() => handleDelete(props.selectedPost.id)}>
        Delete
      </button>
      <h3>Comments:</h3>
      <Comment postId={postId} />
    </div>
  )
}

export default connect(mapStateToProps, mapActionsToProps)(PostDetail)
