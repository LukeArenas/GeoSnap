import './App.css'
import React, { useState } from 'react'
import ReactMapGL from 'react-map-gl'
require('dotenv').config()

const ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN

function App() {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 39.73989,
    longitude: -104.98458,
    zoom: 2
  })
  const [mapboxApiAccessToken, setToken] = useState(ACCESS_TOKEN)

  return (
    <div className="App">
      <ReactMapGL
        mapboxApiAccessToken={mapboxApiAccessToken}
        {...viewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      />
    </div>
  )
}

export default App
