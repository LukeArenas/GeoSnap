import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import MapGL, { Marker } from 'react-map-gl'
import {
  getAllPosts,
  getPostById,
  setSelectedPost,
  setPosts
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
    setPosts: (posts) => dispatch(setPosts(posts))
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
    // style: 'mapbox://styles/mapbox/streets-v11'
  })

  //USE HISTORY
  const history = useHistory()

  //DESTRUCTURE PROPS
  const { posts, selectedPost } = props.postState

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
        mapStyle="mapbox://styles/mapbox/streets-v9"
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
