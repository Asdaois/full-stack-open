import React, { useState, useEffect } from 'react'
import blogsService from 'services/blogsService'
import Blog from 'components/Blog'

const BlogsApp = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({})

  useEffect(() => {
    const getAll = async () => {
      const blogs = await blogsService.getAll()
      setBlogs(blogs)
    }

    getAll()
  }, [])

  const handleChange = ({ target }) => {
    setNewBlog({ ...newBlog, [target.name]: target.value })
  }
  /**
   *  @param {React.FormEvent<HTMLFormElement>} e
   */
  const handleSubmit = async (e) => {
    try {
      e.preventDefault()

      const createdBlog = await blogsService.create(newBlog)

      setBlogs([...blogs, createdBlog])
      console.log(createdBlog)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className=''>
      <h1>Blog app</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='title' className='flex items-center gap-2'>
          <span className='w-8'>title </span>
          <input type='text' name='title' value={newBlog?.title} onChange={handleChange} />
        </label>
        <label htmlFor='url' className='flex items-center gap-2'>
          <span className='w-8'>url</span>
          <input type='text' name='url' value={newBlog?.url} onChange={handleChange} />
        </label>
        <button type='submit' className='btn btn-green'>create</button>
      </form>
      <div className=''>
        {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
      </div>
    </div>
  )
}

export default BlogsApp
