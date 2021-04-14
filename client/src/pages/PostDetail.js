import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getPostById } from '../store/actions/PostAction'
import Comment from '../components/Comment'

const mapStateToProps = ({ postState }) => {
  return { postState }
}

const mapActionsToProps = (dispatch) => {
  return {
    getPostById: (id) => dispatch(getPostById(id))
  }
}

//COMPONENT
const PostDetail = (props) => {
  const { image, caption, User } = props.postState.selectedPost

  useEffect(() => {
    props.getPostById(props.selectedPost.id)
  }, [])

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
      <h3>Comments:</h3>
      <Comment selectedPost={props.selectedPost} />
    </div>
  )
}

export default connect(mapStateToProps, mapActionsToProps)(PostDetail)
