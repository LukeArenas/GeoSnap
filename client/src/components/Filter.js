import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../store/actions/PostAction'

const mapStateToProps = ({ authState, postState }) => {
  return { authState, postState }
}

const mapActionsToProps = (dispatch) => {
  return {
    setFilter: (filter) => dispatch(setFilter(filter))
  }
}

const Filter = (props) => {
  //METHODS
  const handleChange = (e) => {
    e.preventDefault()
    props.setFilter(e.target.value)
  }

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Filter by username"
          value={props.postState.filterValue}
          onChange={(e) => handleChange(e)}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default connect(mapStateToProps, mapActionsToProps)(Filter)
