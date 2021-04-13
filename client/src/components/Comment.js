import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getCommentsByPost } from '../store/actions/CommentAction'

//MAP STATE AND ACTIONS TO PROPS

const mapStateToProps = ({ commentState }) => {
  return { commentState }
}

const mapActionsToProps = (dispatch) => {
  return {
    getCommentsByPost: (postId) => dispatch(getCommentsByPost(postId))
  }
}

const Comment = (props) => {
  const { comments } = props.commentState

  //USE EFFECT

  useEffect(() => {
    props.getCommentsByPost(1)
  }, [])

  return (
    <div>
      {comments.length
        ? comments.map((comment, idx) => (
            <div key={idx}>
              <img src={comment.User.profilePicture} alt="profile pic" />
              <h4>@{comment.User.username}</h4>
              <p>{comment.content}</p>
            </div>
          ))
        : null}
    </div>
  )
}

export default connect(mapStateToProps, mapActionsToProps)(Comment)
