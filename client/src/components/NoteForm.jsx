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

    const noteCreated = await notesService.create(noteObject)

    if (noteCreated.error === undefined) {
      setNotes(notes.concat(noteCreated))
    }

    setNewNote('')
  }

  /**
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleNoteChange = (e) => {
    setNewNote(e.currentTarget.value)
  }

  return (
    <div className=''>
      <h2>Create a new note</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='A new note...'
          value={value}
          onChange={handleChange}
        />
        <button type='submit' className='btn btn-green'>Save</button>
      </form>
    </div>
  )
}

export default NoteForm
