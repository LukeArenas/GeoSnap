import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import ProfilePicture from '../components/ProfilePicture'
import '../styles/Profile.css'
import {
  getAllPosts,
  setSelectedPost,
  setEditing
} from '../store/actions/PostAction'
import { useHistory } from 'react-router-dom'

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

  const getMonth = (post) => {
    switch (post.createdAt.slice(5, 7)) {
      case '01':
        return 'January'
      case '02':
        return 'February'
      case '03':
        return 'March'
      case '04':
        return 'April'
      case '05':
        return 'May'
      case '06':
        return 'June'
      case '07':
        return 'July'
      case '08':
        return 'August'
      case '09':
        return 'September'
      case '10':
        return 'October'
      case '11':
        return 'November'
      case '12':
        return 'December'
    }
  }

  useEffect(() => {
    if (!props.postState.posts.length) {
      props.getAllPosts()
    }
  }, [])

  return (
    <div className="detail-page">
      <div className="profile-header-container">
        <h3 className="white">@{props.authState.currentUser.username}</h3>
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
            <div>
              <button onClick={() => props.setEditing()} className="edit-btn">
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
      {filteredPosts.length
        ? filteredPosts.map((post, idx) => (
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
              <img
                src={post.image}
                alt={post.caption}
                className="preview-pic"
              />
              <h4 className="align-text-left">{post.caption}</h4>
              <h4 className="align-text-left date">{`${getMonth(
                post
              )}  ${post.createdAt.slice(8, 10)}, ${post.createdAt.slice(
                0,
                4
              )}`}</h4>
            </div>
          ))
        : null}
    </div>
  )
}

export default connect(mapStateToProps, mapActionsToProps)(Profile)
