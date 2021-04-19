import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  deleteComment,
  getCommentsByPost
} from '../store/actions/CommentAction'
import CommentForm from './CommentForm'
import '../styles/Comment.css'

//MAP STATE AND ACTIONS TO PROPS

const mapStateToProps = ({ commentState, postState, authState }) => {
  return { commentState, postState, authState }
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
    // eslint-disable-next-line
  }, [props.postState.selectedPost.id])

  return (
    <div className="comment-section">
      <div className="comment-content-container">
        <div className="comment-form">
          {comments.length ? (
            <div>
              <img
                src={props.authState.currentUser.profilePicture}
                alt={'current user'}
                className="profile-picture"
              />
            </div>
          ) : null}
          <CommentForm selectedPost={props.selectedPost} />
        </div>
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
                    {props.authState.currentUser.username ===
                    comment.User.username ? (
                      <div>
                        <button
                          onClick={() => removeComment(comment.id)}
                          className="delete"
                        >
                          X
                        </button>
                      </div>
                    ) : null}
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
