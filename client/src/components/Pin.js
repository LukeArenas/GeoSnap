import React from 'react'
import { MapContext } from 'react-map-gl'
import '../styles/Map.css'

function Pin(props) {
  const context = React.useContext(MapContext)

  //DESTRUCTURING
  const { longitude, latitude, image, viewport } = props

  const [x, y] = context.viewport.project([longitude, latitude])

  const markerStyle = {
    position: 'absolute',
    background: '#fff',
    left: x,
    top: y
  }

  return (
    <div style={markerStyle}>
      {/* {viewport.zoom > } */}
      {/* <img
        src="https://i.imgur.com/od6ga6F.png"
        alt="user post"
        className="pin-thumbnail"
      /> */}
      <div className="pin">o</div>
      {/* ({longitude}, {latitude}) */}
    </div>
  )
}

export default Pin
