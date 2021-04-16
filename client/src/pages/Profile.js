import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import ProfilePicture from '../components/ProfilePicture'
import '../styles/Profile.css'
import { getAllPosts, setSelectedPost } from '../store/actions/PostAction'
import { useHistory } from 'react-router-dom'

const mapStateToProps = ({ authState, postState }) => {
  return { authState, postState }
}

const mapActionsToProps = (dispatch) => {
  return {
    setReducerPost: (posts) => dispatch(setSelectedPost(posts)),
    getAllPosts: () => dispatch(getAllPosts())
  }
}

const Profile = (props) => {
  const { profilePicture, username } = props.authState.currentUser

  const filteredPosts = props.postState.posts.filter((post) => {
    return post.User.username === props.authState.currentUser.username
  })

  const history = useHistory()

  const handleClick = (post) => {
    props.setReducerPost(post)
    history.push('/detail')
  }

  useEffect(() => {
    if (!props.postState.posts.length) {
      props.getAllPosts()
    }
  }, [])

  return (
    <div>
      <h3>Profile</h3>
      <img
        src={profilePicture}
        alt={username}
        className="profile-page-picture"
      />
      <h4>Update your profile picture:</h4>
      <ProfilePicture />
      {filteredPosts.length
        ? filteredPosts.map((post, idx) => (
            <div key={idx} onClick={() => handleClick(post)}>
              <img
                src={post.User.profilePicture}
                alt={post.User.username}
                className="profile-picture"
              />
              <h4>@{post.User.username}</h4>
              <img
                src={post.image}
                alt={post.caption}
                className="preview-pic"
              />
              <h4 className="align-text-left">{post.caption}</h4>
            </div>
          ))
        : null}
    </div>
  )
}

export default connect(mapStateToProps, mapActionsToProps)(Profile)
