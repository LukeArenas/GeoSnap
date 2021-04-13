import './styles/App.css'
import React from 'react'
import { Route, useHistory, Switch } from 'react-router-dom'
import Map from './pages/Map'
import PostDetail from './pages/PostDetail'
import PostForm from './pages/PostForm'
require('dotenv').config()

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
          <Route path="/post" component={() => <PostForm />} />
        </Switch>
      </main>
    </div>
  )
}

export default App
