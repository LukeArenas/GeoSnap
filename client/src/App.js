import './styles/App.css'
import React, { useState } from 'react'
import { Route, useHistory, Switch } from 'react-router-dom'
import Map from './pages/Map'
import PostDetail from './pages/PostDetail'
import PostForm from './pages/PostForm'
require('dotenv').config()

const App = () => {
  const [selectedPost, setSelectedPost] = useState(null)

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
                selectedPost={selectedPost}
                setSelectedPost={setSelectedPost}
              />
            )}
          />
          <Route
            path="/detail"
            component={() => (
              <PostDetail
                selectedPost={selectedPost}
                setSelectedPost={setSelectedPost}
              />
            )}
          />
          <Route path="/post" component={() => <PostForm />} />
        </Switch>
      </main>
    </div>
  )
}

export default App
