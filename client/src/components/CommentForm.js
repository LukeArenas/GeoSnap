import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createComment } from '../store/actions/CommentAction'

const mapStateToProps = ({ commentState }) => {
  return { commentState }
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
    userId: '44ca8d8d-4466-4802-86e4-97706b77f35d',
    postId: 1
  })

  const handleChange = (e) => {
    setNewComment({ ...newComment, content: e.target.value })
  }

  const handleSubmit = (e) => {
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
