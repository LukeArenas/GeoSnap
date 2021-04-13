import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { createPost } from '../store/actions/PostAction'
const Geocodio = require('geocodio-library-node')

//SET UP GEOCODER

const API_KEY = process.env.REACT_APP_GEOCODIO_KEY
console.log(typeof API_KEY)
const geocoder = new Geocodio(API_KEY.toString())

//MAP STATE AND ACTIONS TO PROPS

const mapStateToProps = ({ postState }) => {
  return { postState }
}

const mapActionsToProps = (dispatch) => {
  return {
    createPost: (body) => dispatch(createPost(body))
  }
}

// COMPONENT

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

  const getCoordinates = async (e) => {
    e.preventDefault()
    try {
      const res = await geocoder.geocode(address)
      console.log(res)
    } catch (error) {
      throw error
    }
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
        <button onClick={(e) => getCoordinates(e)}>Submit Address</button>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default connect(mapStateToProps, mapActionsToProps)(PostForm)
