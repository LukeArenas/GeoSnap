import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <div>
      <NavLink to="/map">
        <button>Map</button>
      </NavLink>
      <NavLink to="/post">
        <button>Post</button>
      </NavLink>
    </div>
  )
}

export default NavBar
