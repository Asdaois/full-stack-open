import React, { useState, useEffect, useRef } from 'react'
import blogsService from 'services/blogsService'
import Blog from 'components/Blog'
import Togglable from 'components/Togglable'
import BlogForm from 'components/BlogForm'

const BlogsApp = () => {
  const [blogs, setBlogs] = useState([])
  const blogFormRef = useRef()

  useEffect(() => {
    const getAll = async () => {
      const blogs = await blogsService.getAll()
      setBlogs(blogs)
    }

    getAll()
  }, [])

  const createBlog = async (newBlog) => {
    try {
      const createdBlog = await blogsService.create(newBlog)

      setBlogs([...blogs, createdBlog])
    } catch (error) {
      console.error(error)
    }

    blogFormRef.current.toggleVisibility()
  }

  return (
    <div className=''>
      <h1>Blog app</h1>
      <Togglable buttonLabel='create a form' ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      <div className='border-collapse border'>
        {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
      </div>
    </div>
  )
}

export default BlogsApp
