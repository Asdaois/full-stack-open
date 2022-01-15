import propTypes from 'prop-types'
import React from 'react'
import { Link, useParams } from 'react-router-dom'

const NoteInfo = ({ notes }) => {
  const { noteId } = useParams()
  const note = notes.find(n => n.id === noteId)

  return (
    <div>
      <Link to={'..'}>Go to notes</Link>
      <h2 className=''>{note?.content}</h2>
      <div className=''>{note?.user.username}</div>
      <div className=''>
        <strong>{note?.important ? 'important' : ' '}</strong>
      </div>
    </div>
  )
}

NoteInfo.prototype = {
  notes: propTypes.array.isRequired
}

export default NoteInfo
