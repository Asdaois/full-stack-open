import React, { useEffect, useRef, useState } from 'react'

import Blog from 'components/Blog'
import BlogForm from 'components/BlogForm'
import Togglable from 'components/Togglable'
import useToggle from 'hooks/useToggle'
import blogsService from 'services/blogsService'

const BlogsApp = () => {
  const [blogs, setBlogs] = useState([])
  const [showBlogs, setShowBLogs] = useState([])
  const [sorted, toggleSort] = useToggle(false)
  const blogFormRef = useRef()

  useEffect(() => {
    const getAll = async () => {
      const blogs = await blogsService.getAll()
      setBlogs(blogs)
    }

    getAll()
  }, [])

  useEffect(() => {
    sortBlogs()
  }, [sorted, blogs])

  const createBlog = async newBlog => {
    try {
      const createdBlog = await blogsService.create(newBlog)

      setBlogs([...blogs, createdBlog])
    } catch (error) {
      console.error(error)
    }

    blogFormRef.current.toggleVisibility()
  }

  const updateBlog = async newblog => {
    try {
      const updatedBlog = await blogsService.update(newblog)
      setBlogs(
        blogs.map(blog => (blog.id !== updatedBlog.id ? blog : updatedBlog))
      )
    } catch (error) {
      console.error(error)
    }
  }

  const sortBlogs = () => {
    const blogsShow = [...blogs]

    if (sorted) {
      console.log('sorting...')
      blogsShow.sort((a, b) => b.likes - a.likes)
    }

    setShowBLogs(blogsShow)
  }

  const deleteBlog = async (id, title) => {
    const confirmed = window.confirm(`Delete blog with title \n${title}`)

    if (!confirmed) return

    try {
      await blogsService.remove(id)

      setBlogs(blogs.filter(blog => blog.id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className=''>
      <h1>Blog app</h1>

      <Togglable buttonLabel='create a form' ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>

      <button onClick={toggleSort} className='btn btn-gray'>
        {sorted ? 'show by creation' : 'show by likes'}
      </button>

      <div className='border-collapse border'>
        {showBlogs.map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            handleDelete={() => deleteBlog(blog.id, blog.title)}
          />
        ))}
      </div>
    </div>
  )
}

export default BlogsApp
