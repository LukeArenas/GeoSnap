import './styles/App.css'
import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import NavBar from './components/NavBar'
import Homepage from './pages/Homepage'
import Map from './pages/Map'
import PostDetail from './pages/PostDetail'
import PostForm from './pages/PostForm'
import Feed from './pages/Feed'
import { checkStoredToken, setAuthenticated } from './store/actions/AuthAction'
import Profile from './pages/Profile'
require('dotenv').config()

const mapStateToProps = ({ authState }) => {
  return { authState }
}

const mapActionsToProps = (dispatch) => {
  return {
    checkStoredToken: () => dispatch(checkStoredToken()),
    setAuthenticated: () => dispatch(setAuthenticated())
  }
}

const App = (props) => {
  const [selectedPost, setSelectedPost] = useState(null)

  //DESTRUCTURING
  const { currentUser, isAuthenticated } = props.authState

  // METHODS
  const checkToken = () => {
    let token = localStorage.getItem('token')
    if (token) {
      props.checkStoredToken()
    }
    if (token && !isAuthenticated) {
      props.setAuthenticated()
    }
  }

  //USE EFFECT

  useEffect(() => {
    checkToken()
    // eslint-disable-next-line
  }, [props.authState.isAuthenticated])

  return (
    <div className="App">
      <header>
        <h1 className="title">GeoSnap</h1>
        <NavBar />
      </header>
      <main>
        <Switch>
          <Route exact path="/" render={() => <Homepage />} />
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
            render={() => (
              <PostDetail
                selectedPost={selectedPost}
                setSelectedPost={setSelectedPost}
              />
            )}
          />
          <Route path="/post" render={() => <PostForm />} />
          <Route path="/feed" render={() => <Feed />} />
          <Route path="/profile" render={() => <Profile />} />
        </Switch>
      </main>
    </div>
  )
}

// export default App
export default connect(mapStateToProps, mapActionsToProps)(App)
