import React, { useState } from 'react'

const BlogForm = ({ createBlog }, ref) => {
  const [newBlog, setNewBlog] = useState({ title: '', url: '' })

  const handleChange = ({ target }) => {
    setNewBlog({ ...newBlog, [target.name]: target.value })
  }

  /**
   *  @param {React.FormEvent<HTMLFormElement>} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault()

    createBlog(newBlog)

    setNewBlog({ title: '', url: '' })
  }

  return (
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
  )
}

export default React.forwardRef(BlogForm)
