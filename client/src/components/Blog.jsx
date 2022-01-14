import useToggle from 'hooks/useToggle'
import React from 'react'

const Blog = ({ blog }) => {
  const [display, toggleDisplay] = useToggle(false)

  return (
    <div className='border border-gray-200 p-2'>
      <div className='flex items-center gap-2'>
        <h3>{blog.title}</h3>
        <button onClick={toggleDisplay} className='btn'>{display ? 'hide' : 'show'}</button>
      </div>

      {display &&
        (<div className=''>
          <p>{blog.url}</p>
          <p>{blog.likes}</p>
          <p className=''>{blog.author.username}</p>
        </div>)}
    </div>
  )
}

export default Blog
