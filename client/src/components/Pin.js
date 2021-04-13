import React from 'react'
import { useHistory } from 'react-router-dom'
import { MapContext } from 'react-map-gl'

function Pin(props) {
  //USE HISTORY
  const history = useHistory()

  const context = React.useContext(MapContext)

  //DESTRUCTURING
  const { longitude, latitude } = props

  const [x, y] = context.viewport.project([longitude, latitude])

  const markerStyle = {
    position: 'absolute',
    background: '#fff',
    left: x,
    top: y
  }

  //METHODS

  const handleClick = (e) => {
    console.log('hello')
    // history.push('/detail')
  }

  return (
    <div style={markerStyle} onClick={(e) => handleClick(e)}>
      ({longitude}, {latitude})
    </div>
  )
}

export default Pin
