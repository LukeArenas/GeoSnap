import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import ProfilePicture from '../components/ProfilePicture'
import '../styles/Profile.css'
import {
  getAllPosts,
  setSelectedPost,
  setEditing
} from '../store/actions/PostAction'
import cameraIcon from '../assets/camera-png.png'
import { getMonth } from '../helperFunction'
import { useHistory } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

const mapStateToProps = ({ authState, postState }) => {
  return { authState, postState }
}

const mapActionsToProps = (dispatch) => {
  return {
    setReducerPost: (posts) => dispatch(setSelectedPost(posts)),
    getAllPosts: () => dispatch(getAllPosts()),
    setEditing: () => dispatch(setEditing())
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
    // eslint-disable-next-line
  }, [])

  return (
    <div className="detail-page">
      <div className="profile-header-container">
        <h3 className="white">@{props.authState.currentUser.username}</h3>
      </div>
      <div className="flex-container">
        <div className="relative">
          <img
            src={profilePicture}
            alt={username}
            className="profile-page-picture"
          />
          {props.postState.isEditing ? (
            <div>
              <ProfilePicture />
            </div>
          ) : (
            <div onClick={() => props.setEditing()} className="edit-btn">
              <img src={cameraIcon} alt="edit button" className="edit-camera" />
            </div>
          )}
        </div>
      </div>

      {filteredPosts.length ? (
        filteredPosts.map((post, idx) => (
          <div
            key={idx}
            onClick={() => handleClick(post)}
            className="post-card"
          >
            <div className="grid-container">
              <div className="poster-container">
                <img
                  src={post.User.profilePicture}
                  alt={post.User.username}
                  className="profile-picture"
                />
                <h4>@{post.User.username}</h4>
              </div>
            </div>
            <img src={post.image} alt={post.caption} className="preview-pic" />
            <h4 className="align-text-left">{post.caption}</h4>
            <h4 className="align-text-left date">{`${getMonth(
              post
            )}  ${post.createdAt.slice(8, 10)}, ${post.createdAt.slice(
              0,
              4
            )}`}</h4>
          </div>
        ))
      ) : (
        <div>
          No moments yet! Pin your first one <NavLink to="/post">here</NavLink>.
        </div>
      )}
    </div>
  )
}

export default connect(mapStateToProps, mapActionsToProps)(Profile)
