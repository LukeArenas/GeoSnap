import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setSelectedPost } from '../store/actions/PostAction'
import { getMonth } from '../helperFunction'

const mapStateToProps = ({ postState }) => {
  return { postState }
}

const mapActionsToProps = (dispatch) => {
  return {
    setReducerPost: (post) => dispatch(setSelectedPost(post))
  }
}

const PostThumbnail = (props) => {
  const { filteredPosts } = props.postState

  const history = useHistory()

  const handleClick = (post) => {
    props.setReducerPost(post)
    history.push('/detail')
  }

  return (
    <div className="preview">
      <div className="preview-container">
        <div>
          {filteredPosts.length
            ? filteredPosts.map((post, idx) => (
                <div
                  key={idx}
                  onClick={() => handleClick(post)}
                  className="feed-card"
                >
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

                  <h4 className="feed-caption">{post.caption}</h4>
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
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapActionsToProps)(PostThumbnail)
