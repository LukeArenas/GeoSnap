import React from 'react'
import { MapContext } from 'react-map-gl'

function Pin(props) {
  const context = React.useContext(MapContext)

  //DESTRUCTURING
  const { longitude, latitude, image } = props

  const [x, y] = context.viewport.project([longitude, latitude])

  const markerStyle = {
    position: 'absolute',
    background: '#fff',
    left: x,
    top: y
  }

  return (
    <div style={markerStyle}>
      {/* <img src={image} alt="user post" /> */}({longitude}, {latitude})
    </div>
  )
}

export default Pin
