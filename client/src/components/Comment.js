import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  deleteComment,
  getCommentsByPost
} from '../store/actions/CommentAction'
import CommentForm from './CommentForm'
import '../styles/Comment.css'

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
      <div className="comment-section">
        {comments.length
          ? comments.map((comment, idx) => (
              <div key={idx} className="container">
                <div className="inner-container">
                  <img
                    src={comment.User.profilePicture}
                    alt="profile pic"
                    className="profile-picture"
                  />
                  <div className="content">
                    <h4 className="handle">@{comment.User.username}</h4>
                    <p className="text">{comment.content}</p>
                    <button
                      onClick={() => removeComment(comment.id)}
                      className="delete"
                    >
                      X
                    </button>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapActionsToProps)(Comment)
