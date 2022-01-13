import React, { useState, useEffect } from 'react'
import blogsService from 'services/blogsService'
import Blog from './components/Blog'

const BlogsApp = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const getAll = async () => {
      const blogs = await blogsService.getAll()
      setBlogs(blogs)
    }

    getAll()
  }, [])

  return (
    <div className=''>
      <h1>Blog app</h1>
      <div className=''>
        {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
      </div>
    </div>
  )
}

export default BlogsApp
