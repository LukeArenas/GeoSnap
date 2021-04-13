import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import MapGL from 'react-map-gl'
import Pin from '../components/Pin'
import { getAllPosts } from '../store/actions/PostAction'

const mapStateToProps = ({ postState }) => {
  return { postState }
}

const mapActionsToProps = (dispatch) => {
  return {
    getAllPosts: () => dispatch(getAllPosts())
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

  //DESTRUCTURE PROPS
  const { posts } = props.postState

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
              <div key={idx}>
                <Pin longitude={post.longitude} latitude={post.latitude} />
              </div>
            ))
          : null}
      </MapGL>
    </div>
  )
}

export default connect(mapStateToProps, mapActionsToProps)(Map)
