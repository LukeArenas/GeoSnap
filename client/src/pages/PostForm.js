import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { connect } from 'react-redux'
import { createPost, setNewPost, setLatLong } from '../store/actions/PostAction'
import PostPreview from '../components/PostPreview'
const Geocodio = require('geocodio-library-node')

//SET UP GEOCODER

const API_KEY = process.env.REACT_APP_GEOCODIO_KEY
const geocoder = new Geocodio(API_KEY.toString())

//MAP STATE AND ACTIONS TO PROPS

const mapStateToProps = ({ postState, authState }) => {
  return { postState, authState }
}

const mapActionsToProps = (dispatch) => {
  return {
    createPost: (body) => dispatch(createPost(body)),
    setNewPost: (e) => dispatch(setNewPost(e)),
    setLatLong: (dir, value) => dispatch(setLatLong(dir, value))
  }
}

// COMPONENT

const PostForm = (props) => {
  // const [newPost, setNewPost] = useState({
  //   image: '',
  //   caption: '',
  //   latitude: null,
  //   longitude: null,
  //   userId: props.authState.currentUser.id
  // })
  const [address, setAddress] = useState('')

  const { image, caption } = props.postState.newPost

  //USE HISTORY

  const history = useHistory()

  //METHODS

  const handleChange = (e) => {
    props.setNewPost(e)
  }

  const handleSubmit = (e) => {
    props.createPost({
      ...props.postState.newPost,
      userId: props.authState.currentUser.id
    })
    history.push('/map')
  }

  const handleAddress = (e) => {
    setAddress(e.target.value)
  }

  const getCoordinates = async (e) => {
    e.preventDefault()
    try {
      const res = await geocoder.geocode(address)
      console.log(res.results[0].location)
      // props.setLatLong(
      //   latitude: res.results[0].location.lat,
      //   longitude: res.results[0].location.lng
      // )
      props.setLatLong('latitude', res.results[0].location.lat)
      props.setLatLong('longitude', res.results[0].location.lng)
    } catch (error) {
      throw error
    }
  }

  return (
    <div>
      <h3>Create a post:</h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="image url"
          value={image}
          name="image"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          placeholder="caption"
          value={caption}
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
        <PostPreview />
      </form>
    </div>
  )
}

export default connect(mapStateToProps, mapActionsToProps)(PostForm)
