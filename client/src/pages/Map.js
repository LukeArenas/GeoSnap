import React from 'react'
import MapGL from 'react-map-gl'
import Pin from '../components/Pin'

const Map = (props) => {
  const { viewport, setViewport, mapboxApiAccessToken } = props
  console.log(props)
  return (
    <div>
      {/* <MapGL
        {...viewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapboxApiAccessToken={mapboxApiAccessToken}
      >
        <Pin longitude={-104.98458} latitude={39.73989} />
      </MapGL> */}
    </div>
  )
}

export default Map
