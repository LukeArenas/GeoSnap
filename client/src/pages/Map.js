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
  const [mapboxApiAccessToken, setToken] = useState(ACCESS_TOKEN)

  useEffect(() => {
    props.getAllPosts()
  }, [])

  return (
    <div>
      <MapGL
        {...viewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapboxApiAccessToken={mapboxApiAccessToken}
      >
        <Pin longitude={-104.98458} latitude={39.73989} />
      </MapGL>
    </div>
  )
}

export default connect(mapStateToProps, mapActionsToProps)(Map)
