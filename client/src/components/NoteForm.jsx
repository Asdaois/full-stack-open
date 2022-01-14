import React, { useState } from 'react'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  /**
   *
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  const addNote = (e) => {
    e.preventDefault()

    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5
    }

    createNote(noteObject)

    setNewNote('')
  }

  /**
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handelNewNoteChange = (e) => {
    setNewNote(e.currentTarget.value)
  }

  return (
    <div className=''>
      <h2>Create a new note</h2>
      <form onSubmit={addNote}>
        <input
          type='text'
          placeholder='A new note...'
          value={newNote}
          onChange={handelNewNoteChange}
        />
        <button type='submit' className='btn btn-green'>Save</button>
      </form>
    </div>
  )
}

export default NoteForm
