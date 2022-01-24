import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ user, handleLogout }) => {
  if (!user) return null
  return (
    <nav className='flex items-center justify-between'>
      <div className='flex gap-2'>
        <Link to=''>Home</Link>
        <Link to='blogs'>Blogs</Link>
        <Link to='notes'>Notes</Link>
        <Link to='countries-weather'>Countries Weather</Link>
      </div>

      <div className='flex items-center mr-40'>
        {user?.username} logged in
        <button
          onClick={handleLogout}
          className='text-xl btn btn-red'
          data-button='logout'
        >
          logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar
