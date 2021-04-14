import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  deleteComment,
  getCommentsByPost
} from '../store/actions/CommentAction'
import CommentForm from './CommentForm'

//MAP STATE AND ACTIONS TO PROPS

const mapStateToProps = ({ commentState, postState }) => {
  return { commentState, postState }
}

const mapActionsToProps = (dispatch) => {
  return {
    getCommentsByPostId: (postId) => dispatch(getCommentsByPost(postId)),
    deleteComment: (id) => dispatch(deleteComment(id))
  }
}

//COMPONENT

const Comment = (props) => {
  //DECONSTRUCTING PROPS

  const { comments } = props.commentState

  //METHODS

  const removeComment = (id) => {
    props.deleteComment(id)
  }

  //USE EFFECT

  useEffect(() => {
    props.getCommentsByPostId(props.postState.selectedPost.id)
  }, [])

  return (
    <div>
      <CommentForm selectedPost={props.selectedPost} />
      {comments.length
        ? comments.map((comment, idx) => (
            <div key={idx}>
              <img src={comment.User.profilePicture} alt="profile pic" />
              <h4>@{comment.User.username}</h4>
              <p>{comment.content}</p>
              <button onClick={() => removeComment(comment.id)}>Delete</button>
            </div>
          ))
        : null}
    </div>
  )
}

export default connect(mapStateToProps, mapActionsToProps)(Comment)
