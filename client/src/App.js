import './styles/App.css'
import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import NavBar from './components/NavBar'
import Homepage from './pages/Homepage'
import Map from './pages/Map'
import PostDetail from './pages/PostDetail'
import PostForm from './pages/PostForm'
import axios from 'axios'
require('dotenv').config()

const App = () => {
  const [selectedPost, setSelectedPost] = useState(null)

  //METHODS
  // const checkStoredToken = async () => {
  //   let token = localStorage.getItem('token')
  //   if (token) {
  //     const res = await axios.get(`http://localhost:3001/api/auth/session`)
  //     dispatch({ type: SET_CURRENT_USER, payload: res.data })
  //     dispatch({ type: SET_AUTHENTICATED, payload: true })
  //   }
  // }

  //USE EFFECT

  // useEffect(() => {
  //   checkStoredToken()
  //   // eslint-disable-next-line
  // }, [state.authenticated])

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
