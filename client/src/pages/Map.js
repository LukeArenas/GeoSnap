import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import MapGL, { Marker } from 'react-map-gl'
import {
  getAllPosts,
  getPostById,
  setSelectedPost,
  setPosts,
  toggleMapStyle
} from '../store/actions/PostAction'
import { useHistory } from 'react-router'
import '../styles/App.css'
import '../styles/Map.css'
import pin from '../assets/pin-icon.png'

const mapStateToProps = ({ postState, authState }) => {
  return { postState, authState }
}

const mapActionsToProps = (dispatch) => {
  return {
    getAllPosts: () => dispatch(getAllPosts()),
    getPostById: (id) => dispatch(getPostById(id)),
    setReducerPost: (post) => dispatch(setSelectedPost(post)),
    setPosts: (posts) => dispatch(setPosts(posts)),
    setMapStyle: (style) => dispatch(toggleMapStyle(style))
  }
}

const ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN

const Map = (props) => {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: 39.73989,
    longitude: -98.5795,
    zoom: 4
  })

  //USE HISTORY
  const history = useHistory()

  //DESTRUCTURE PROPS
  const { posts, mapStyle } = props.postState

  //METHODS
  const handleClick = (post) => {
    props.setSelectedPost(post)
    props.setReducerPost(post)

    const sameLocationArray = props.postState.posts.filter((element) => {
      return (
        element.latitude === post.latitude &&
        element.longitude === post.longitude
      )
    })
    if (sameLocationArray.length === 1) {
      history.push('/detail')
    } else {
      props.setPosts(sameLocationArray)
      history.push('/feed')
    }
  }

  const handleMouseOver = (e, post) => {
    e.currentTarget.src = post.image
  }

  const changeMapStyle = () => {
    if (mapStyle === 'mapbox://styles/mapbox/streets-v11') {
      props.setMapStyle('mapbox://styles/mapbox/satellite-v9')
    } else {
      props.setMapStyle('mapbox://styles/mapbox/streets-v11')
    }
  }

  useEffect(() => {
    if (!posts.length) {
      props.getAllPosts()
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className="map-container">
      <div className="button-container">
        {mapStyle === 'mapbox://styles/mapbox/streets-v11' ? (
          <button className="satellite-style" onClick={() => changeMapStyle()}>
            Satellite
          </button>
        ) : (
          <button className="street-style" onClick={() => changeMapStyle()}>
            Street
          </button>
        )}
      </div>
      <MapGL
        {...viewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapboxApiAccessToken={ACCESS_TOKEN}
        mapStyle={mapStyle}
      >
        {posts.length
          ? posts.map((post, idx) => (
              <div key={idx} onClick={() => handleClick(post)}>
                <Marker
                  latitude={post.latitude}
                  longitude={post.longitude}
                  offsetLeft={-20}
                  offsetTop={-40}
                >
                  <img
                    src={pin}
                    alt="pin"
                    className="pin"
                    style={{ zIndex: 1 }}
                    onMouseOver={(e) => handleMouseOver(e, post)}
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
