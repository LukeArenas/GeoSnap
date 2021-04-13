import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { createPost } from '../store/actions/PostAction'

const mapStateToProps = ({ postState }) => {
  return { postState }
}

const mapActionsToProps = (dispatch) => {
  return {
    createPost: (body) => dispatch(createPost(body))
  }
}

const PostForm = (props) => {
  const [newPost, setNewPost] = useState({
    image: '',
    caption: ''
  })
  const [address, setAddress] = useState('')

  const handleChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value })
  }

  const handleAddress = (e) => {
    setAddress(e.target.value)
  }

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="image url"
          value={newPost.image}
          name="image"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          placeholder="caption"
          value={newPost.caption}
          name="caption"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          placeholder="address"
          value={address}
          onChange={(e) => handleAddress(e)}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default connect(mapStateToProps, mapActionsToProps)(PostForm)
