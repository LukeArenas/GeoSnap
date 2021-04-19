import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PostThumbnail from '../components/PostThumbnail'
import { getAllPosts } from '../store/actions/PostAction'

const mapStateToProps = ({ postState }) => {
  return { postState }
}

const mapActionsToProps = (dispatch) => {
  return {
    getAllPosts: () => dispatch(getAllPosts())
  }
}

const Feed = (props) => {
  const { posts } = props.postState

  useEffect(() => {
    if (!posts.length) {
      props.getAllPosts()
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className="detail-page">
      <h3 className="feed-title">Feed</h3>
      {postMessage.length ? (
        <div>
          <PostThumbnail />
        </div>
      ) : null}
    </div>
  )
}

export default connect(mapStateToProps, mapActionsToProps)(Feed)
