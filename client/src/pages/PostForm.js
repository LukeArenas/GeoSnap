import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { connect } from 'react-redux'
import { createPost, setNewPost, setLatLong } from '../store/actions/PostAction'
import PostPreview from '../components/PostPreview'
import Map from './Map'
import { setFile } from '../store/actions/AuthAction'
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
    setNewPost: (name, value) => dispatch(setNewPost(name, value)),
    setLatLong: (dir, value) => dispatch(setLatLong(dir, value)),
    setFile: (file) => dispatch(setFile(file))
  }
}

// COMPONENT

const PostForm = (props) => {
  const [address, setAddress] = useState('')

  const { image, caption } = props.postState.newPost

  //USE HISTORY

  const history = useHistory()

  //METHODS

  const handleChange = (e) => {
    props.setNewPost(e.target.name, e.target.value)
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
      props.setLatLong('latitude', res.results[0].location.lat)
      props.setLatLong('longitude', res.results[0].location.lng)
    } catch (error) {
      throw error
    }
  }

  const setNewFile = (e) => {
    console.log(e.target.files[0])
    props.setFile(e.target.files[0])
  }

  const submitImage = (e) => {
    e.preventDefault()
    if (props.authState.file) {
      console.log('creating post')
      let formData = new FormData()
      formData.append('image', props.authState.file)
      formData.append('caption', props.postState.newPost.caption)
      formData.append('latitude', props.postState.newPost.latitude)
      formData.append('longitude', props.postState.newPost.longitude)
      formData.append('userId', props.authState.currentUser.id)
      props.createPost(formData)
    }
    props.setFile(null)
    props.setNewPost('caption', '')
    props.setNewPost('latitude', null)
    props.setNewPost('longitude', null)
    history.push('/map')
  }

  return (
    <div className="detail-page">
      <h3>Pin a new memory:</h3>
      <form onSubmit={(e) => submitImage(e)}>
        <input type="file" onChange={(e) => setNewFile(e)} />
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
        <button onClick={(e) => getCoordinates(e)}>Check Address</button>
        <input type="submit" value="Submit" />
        {/* <CropImage /> */}
        <PostPreview />

        <Map />
      </form>
    </div>
  )
}

export default connect(mapStateToProps, mapActionsToProps)(PostForm)
