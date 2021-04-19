import React from 'react'
import { connect } from 'react-redux'
import { createComment, setNewComment } from '../store/actions/CommentAction'

const mapStateToProps = ({ commentState, authState, postState }) => {
  return { commentState, authState, postState }
}

const mapActionsToProps = (dispatch) => {
  return {
    createComment: (body) => dispatch(createComment(body)),
    setNewComment: (name, value) => dispatch(setNewComment(name, value))
  }
}

//COMPONENT

const CommentForm = (props) => {
  const handleChange = (e) => {
    props.setNewComment(e.target.name, e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.createComment({
      ...props.commentState.newComment,
      userId: props.authState.currentUser.id,
      postId: props.postState.selectedPost.id
    })
    props.setNewComment('content', '')
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Leave a comment"
          name="content"
          value={props.commentState.newComment.content}
          onChange={(e) => handleChange(e)}
          className="comment-input"
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default connect(mapStateToProps, mapActionsToProps)(CommentForm)
