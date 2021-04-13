import './styles/App.css'
import React, { useState } from 'react'
import { Route, useHistory, Switch } from 'react-router-dom'
import Map from './pages/Map'
import PostDetail from './pages/PostDetail'
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
      <header>
        <div></div>
      </header>
      <main>
        <Switch>
          <Route
            path="/map"
            component={() => (
              <Map
                viewport={viewport}
                mapboxApiAccessToken={mapboxApiAccessToken}
                setViewport={setViewport}
              />
            )}
          />
          <Route path="/detail" component={() => <PostDetail />} />
        </Switch>
      </main>
    </div>
  )
}

export default App
