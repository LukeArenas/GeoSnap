import './styles/App.css'
import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import NavBar from './components/NavBar'
import Homepage from './pages/Homepage'
import Map from './pages/Map'
import PostDetail from './pages/PostDetail'
import PostForm from './pages/PostForm'
import { checkStoredToken } from './store/actions/AuthAction'
// import { getAllPosts } from './store/actions/PostAction'
require('dotenv').config()

const mapStateToProps = ({ authState }) => {
  return { authState }
}

const mapActionsToProps = (dispatch) => {
  return {
    checkStoredToken: () => dispatch(checkStoredToken())
  }
}

const App = (props) => {
  const [selectedPost, setSelectedPost] = useState(null)

  //METHODS
  // const checkToken = async () => {
  //   let token = localStorage.getItem('token')
  //   if (token) {
  //     console.log('hello')
  //     props.checkStoredToken()
  //   }
  // }

  //USE EFFECT

  // useEffect(() => {
  //   checkToken()
  //   // eslint-disable-next-line
  // }, [props.authState.isAuthenticated])

  // useEffect(() => {
  //   props.getAllPosts()
  //   // eslint-disable-next-line
  // }, [])

  return (
    <div className="App">
      <header>
        <h1 className="title">GeoSnap</h1>
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

// export default App
export default connect(mapStateToProps, mapActionsToProps)(App)
