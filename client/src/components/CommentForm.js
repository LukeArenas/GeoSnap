import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createComment } from '../store/actions/CommentAction'

const mapStateToProps = ({ commentState, authState }) => {
  return { commentState, authState }
}

const mapActionsToProps = (dispatch) => {
  return {
    createComment: (body) => dispatch(createComment(body))
  }
}

//COMPONENT

const CommentForm = (props) => {
  const [newComment, setNewComment] = useState({
    content: '',
    userId: props.authState.currentUser.id,
    postId: props.selectedPost.id
  })

  const handleChange = (e) => {
    setNewComment({ ...newComment, content: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.createComment(newComment)
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Enter comment"
          onChange={(e) => handleChange(e)}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default connect(mapStateToProps, mapActionsToProps)(CommentForm)
