import React, { useState } from 'react'

const Togglable = ({ children, buttonLabel }) => {
  const [display, setDisplay] = useState(false)

  if (!display) {
    return (
      <button onClick={() => setDisplay(true)} className='btn btn-green'>
        {buttonLabel}
      </button>
    )
  }

  return (
    <div className=''>
      {children}
      <button onClick={() => setDisplay(false)} className='btn btn-red'>cancel</button>
    </div>
  )
}

export default Togglable
