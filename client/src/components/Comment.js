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
  }, [props.postState.selectedPost.id])

  return (
    <div>
      <div className="comment-section">
        {comments.length
          ? comments.map((comment, idx) => (
              <div key={idx} className="container">
                <div className="inner-container">
                  <div className="content">
                    <img
                      src={comment.User.profilePicture}
                      alt="profile pic"
                      className="profile-picture"
                    />
                    <div className="content-container">
                      <h4 className="handle">@{comment.User.username}</h4>
                      <p className="text">{comment.content}</p>
                    </div>
                  </div>

                  <div className="delete-container">
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
        <div className="comment-form">
          <CommentForm selectedPost={props.selectedPost} />
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapActionsToProps)(Comment)
