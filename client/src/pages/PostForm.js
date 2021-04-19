import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { connect } from 'react-redux'
import {
  createPost,
  setNewPost,
  setLatLong,
  showAddress
} from '../store/actions/PostAction'
import PostPreview from '../components/PostPreview'
import { setFile } from '../store/actions/AuthAction'
import checkMark from '../assets/green-check-mark.png'

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
    setFile: (file) => dispatch(setFile(file)),
    showAddress: (bool) => dispatch(showAddress(bool))
  }
}

// COMPONENT

const PostForm = (props) => {
  const [address, setAddress] = useState('')

  const { caption, latitude, longitude } = props.postState.newPost

  //USE HISTORY

  const history = useHistory()

  //METHODS

  const handleChange = (e) => {
    props.setNewPost(e.target.name, e.target.value)
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
      setAddress(res.results[0].formatted_address)
      if (res.results[0].location.lat) {
        props.showAddress(true)
      }
    } catch (error) {
      alert('Oops! Something went wrong. Please check the address again.')
    }
  }

  const setNewFile = (e) => {
    console.log(e.target.files[0])
    props.setFile(e.target.files[0])
  }

  const submitImage = (e) => {
    e.preventDefault()
    if (props.authState.file && latitude && longitude) {
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
    props.showAddress(false)
    history.push('/map')
  }

  return (
    <div className="detail-page">
      <div className="post-form">
        <div>
          <h3 className="post-form-title">Pin a new moment:</h3>
          <div className="form-fields">
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
              {props.postState.showAddress ? (
                <div className="flex">
                  <button
                    className="form-btn check-address"
                    onClick={(e) => submitImage(e)}
                  >
                    Submit Post
                  </button>
                </div>
              ) : (
                <div className="flex">
                  <button
                    onClick={(e) => getCoordinates(e)}
                    className="form-btn check-address"
                  >
                    Check Address
                  </button>
                </div>
              )}
            </form>
          </div>
          {props.postState.showAddress ? (
            <div className="address-check-container">
              <img src={checkMark} alt="checkmark" className="checkmark" />
              <h3 className="address">Address:</h3>
              <div>{address}</div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <PostPreview />
    </div>
  )
}

export default connect(mapStateToProps, mapActionsToProps)(PostForm)
