import './styles/App.css'
import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import NavBar from './components/NavBar'
import Homepage from './pages/Homepage'
import Map from './pages/Map'
import PostDetail from './pages/PostDetail'
import PostForm from './pages/PostForm'
require('dotenv').config()

const App = () => {
  const [selectedPost, setSelectedPost] = useState(null)

  return (
    <div className="App">
      <header>
        <NavBar />
      </header>
      <main>
        <Switch>
          <Route exact path="/" component={() => <Homepage />} />
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
