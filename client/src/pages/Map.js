import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import MapGL, { Marker } from 'react-map-gl'
import Pin from '../components/Pin'
import {
  getAllPosts,
  getPostById,
  setSelectedPost
} from '../store/actions/PostAction'
import { useHistory } from 'react-router'
import '../styles/App.css'
import pin from '../assets/pin-icon.png'

const mapStateToProps = ({ postState, authState }) => {
  return { postState, authState }
}

const mapActionsToProps = (dispatch) => {
  return {
    getAllPosts: () => dispatch(getAllPosts()),
    getPostById: (id) => dispatch(getPostById(id)),
    setReducerPost: (post) => dispatch(setSelectedPost(post))
  }
}

const ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN

const Map = (props) => {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: 39.73989,
    longitude: -104.98458,
    zoom: 4
  })

  //USE HISTORY
  const history = useHistory()

  //DESTRUCTURE PROPS
  const { posts, selectedPost } = props.postState

  const handleClick = (post) => {
    props.setSelectedPost(post)
    props.setReducerPost(post)
    history.push('/detail')
  }

  useEffect(() => {
    if (!posts.length) {
      props.getAllPosts()
    }
  }, [])

  return (
    <div className="map-container">
      <MapGL
        {...viewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapboxApiAccessToken={ACCESS_TOKEN}
      >
        {posts.length
          ? posts.map((post, idx) => (
              <div key={idx} onClick={() => handleClick(post)}>
                <Marker
                  latitude={post.latitude}
                  longitude={post.longitude}
                  offsetLeft={-20}
                  offsetTop={-40}
                  className="pin"
                >
                  {/* <h1>hello</h1> */}
                  <img
                    src={pin}
                    className="pin"
                    onMouseOver={(e) => (e.currentTarget.src = post.image)}
                    onMouseOut={(e) => (e.currentTarget.src = pin)}
                  />
                </Marker>
              </div>
            ))
          : null}
      </MapGL>
    </div>
  )
}

export default connect(mapStateToProps, mapActionsToProps)(Map)
