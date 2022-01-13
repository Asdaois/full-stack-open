import React from 'react'

const Blog = ({ blog }) => {
  return (
    <div className=''>
      <h3>{blog.title}</h3>
      <p>{blog.author.username}</p>
    </div>
  )
}

export default Blog
