import propTypes from 'prop-types'
import React from 'react'
import Note from './Note'

const Notes = ({ notes, updateNote }) => {
  const toggleImportanceOf = async note => {
    const changedNote = { ...note, important: !note.important }
    updateNote(changedNote)
  }

  return (
    <ul>
      {notes.map((note, i) => (
        <Note
          key={note.id}
          note={note}
          toggleImportance={() => toggleImportanceOf(note)}
        />
      ))}
    </ul>
  )
}

Notes.propTypes = {
  notes: propTypes.array.isRequired
}
export default Notes
