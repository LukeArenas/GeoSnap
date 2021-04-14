import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import MapGL from 'react-map-gl'
import Pin from '../components/Pin'
import {
  getAllPosts,
  getPostById,
  setSelectedPost
} from '../store/actions/PostAction'
import { useHistory } from 'react-router'

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
    width: 700,
    height: 700,
    latitude: 39.73989,
    longitude: -104.98458,
    zoom: 2
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
    props.getAllPosts()
  }, [])

  return (
    <div>
      <MapGL
        {...viewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapboxApiAccessToken={ACCESS_TOKEN}
      >
        {posts.length
          ? posts.map((post, idx) => (
              <div key={idx} onClick={() => handleClick(post)}>
                <Pin
                  longitude={post.longitude}
                  latitude={post.latitude}
                  image={post.image}
                />
              </div>
            ))
          : null}
      </MapGL>
    </div>
  )
}

export default connect(mapStateToProps, mapActionsToProps)(Map)
