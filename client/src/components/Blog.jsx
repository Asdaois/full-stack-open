import useToggle from 'hooks/useToggle'
import React from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, handleDelete }) => {
  const [display, toggleDisplay] = useToggle(false)

  const handleLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    updateBlog(updatedBlog)
  }

  const showInfo = (
    <div className=''>
      <p className='url'>{blog?.url}</p>
      <p className='likes'>{blog?.likes}</p>
      <p className='username'>{blog?.author?.username}</p>
      <button className='btn btn-red' onClick={handleDelete}>delete</button>
    </div>
  )

  return (
    <div className='border border-gray-200 p-2 '>
      <div className='flex items-center gap-2'>
        <h3 className='blog-title'>{blog.title}</h3>
        <button onClick={toggleDisplay} className='btn btn-toggle'>{display ? 'hide' : 'show'}</button>
        <button onClick={handleLike} className='btn btn-like'>like</button>
      </div>

      {display && showInfo}

    </div>
  )
}

Blog.propTypes = {
  updateBlog: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired
}

export default Blog
