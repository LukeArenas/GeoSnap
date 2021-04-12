import './App.css'
import React, { useState } from 'react'
import MapGL from 'react-map-gl'
import Pin from './components/Pin'
require('dotenv').config()

const ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN

function App() {
  const [viewport, setViewport] = useState({
    width: 700,
    height: 700,
    latitude: 39.73989,
    longitude: -104.98458,
    zoom: 2
  })
  const [mapboxApiAccessToken, setToken] = useState(ACCESS_TOKEN)

  return (
    <div className="App">
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

export default App
