import React, { useEffect, useState } from 'react'

const Notification = ({ message, duration }) => {
  const [controlMessage, setControlMessage] = useState(message)

  useEffect(() => {
    setTimeout(() => {
      setControlMessage(null)
    }, duration)
  }, [message])

  if (controlMessage === null) return null

  return (
    <div className='text-red-500 bg-gray-500 box-border text-xl border-4 border-red-500 border-solid rounded-md p-[10px] mb-[10px]'>
      {controlMessage}
    </div>
  )
}

export default Notification
