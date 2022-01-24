import React, { useImperativeHandle, useState } from 'react'

const Togglable = ({ children, buttonLabel, labelVisible, labelHide }, ref) => {
  const [display, setDisplay] = useState(false)

  const toggleVisibility = () => {
    setDisplay(!display)
  }

  useImperativeHandle(ref, () => ({
    toggleVisibility
  }))

  if (!display) {
    return (
      <button onClick={toggleVisibility} className='btn btn-green' data-cy={'toggle-button' + '-' + buttonLabel}>
        {buttonLabel || labelHide}
      </button>
    )
  }

  return (
    <div className='togglable-content'>
      {children}
      <button onClick={toggleVisibility} className='btn btn-red'>{labelVisible || 'cancel'}</button>
    </div>
  )
}

export default React.forwardRef(Togglable)
