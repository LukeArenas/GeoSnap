import './styles/App.css'
import React, { useState } from 'react'
import { Route, useHistory, Switch } from 'react-router-dom'
import Map from './pages/Map'
import MapGL from 'react-map-gl'
import Pin from './components/Pin'
import PostDetail from './pages/PostDetail'
require('dotenv').config()

// const ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN

function App() {
  return (
    <div className="App">
      <header>
        <div></div>
      </header>
      <main>
        <Switch>
          <Route path="/map" component={() => <Map />} />
          <Route path="/detail" component={() => <PostDetail />} />
        </Switch>
      </main>
    </div>
  )
}

export default App
