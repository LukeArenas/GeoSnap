import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getPostById } from '../store/actions/PostAction'

const mapStateToProps = ({ postState }) => {
  return { postState }
}

const mapActionsToProps = (dispatch) => {
  return {
    getPostById: (id) => dispatch(getPostById(id))
  }
}

const PostDetail = (props) => {
  const { image, caption, User } = props.postState.selectedPost

  useEffect(() => {
    props.getPostById(1)
  }, [])

  return (
    <div>
      <div>
        <img src={User.profilePicture} alt={User.username} />
        <h4>@{User.username}</h4>
      </div>
      <img src={image} alt={caption} />
      <h4>{caption}</h4>
      <h3>Comments:</h3>
    </div>
  )
}

export default connect(mapStateToProps, mapActionsToProps)(PostDetail)
