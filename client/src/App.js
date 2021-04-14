import './styles/App.css'
import React, { useEffect, useState } from 'react'
import { Route, useHistory, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Map from './pages/Map'
import PostDetail from './pages/PostDetail'
import PostForm from './pages/PostForm'
import { getAllPosts, getPostById } from './store/actions/PostAction'
require('dotenv').config()

// const mapStateToProps = ({ postState }) => {
//   return { postState }
// }

// const mapActionsToProps = (dispatch) => {
//   return {
//     getAllPosts: () => dispatch(getAllPosts()),
//     getPostById: (id) => dispatch(getPostById(id))
//   }
// }

const App = (props) => {
  const [selectedPost, setSelectedPost] = useState(null)
  //USE HISTORY
  const history = useHistory()

  //METHODS
  // const handlePostSelection = (id) => {
  //   console.log(id)
  //   props.getPostById(id)
  //   history.push('/detail')
  // }

  // useEffect(() => {
  //   props.getAllPosts()
  // }, [])

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
                // handlePostSelection={handlePostSelection}
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
