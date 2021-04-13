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
  useEffect(() => {
    props.getCommentsByPost(1)
  }, [])
  return <div></div>
}

export default connect(mapStateToProps, mapActionsToProps)(Comment)
