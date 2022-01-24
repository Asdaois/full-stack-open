import React from 'react'
import { useNavigate } from 'react-router-dom'

const Note = ({ note, toggleImportance }) => {
  const navigate = useNavigate()

  const label = note.important ? 'make not important' : 'make important'

  return (
    <li className='note pt-4 text-sm text-gray-700 flex gap-2 items-center'>
      <div className='' onClick={() => navigate(`../${note.id}`)}>
        {note.content}
      </div>
      <button
        className={'btn ' + `${note.important ? 'btn-red' : 'btn-blue'}`}
        onClick={toggleImportance}
      >
        {label}
      </button>
    </li>
  )
}

export default Note
