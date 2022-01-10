const NoteModel = require('../models/NoteModel')

const notesRouter = require('express').Router()

notesRouter.get('/', async (request, response) => {
  const notes = await NoteModel.find({})
  response.json(notes)
})

notesRouter.get('/:id', async (request, response, next) => {
  const id = request.params.id

  try {
    const note = await NoteModel.findById(id)

    if (note) {
      return response.json(note)
    }

    response.status(404).end()
  } catch (error) {
    next(error)
  }
})

notesRouter.post('/', async (request, response, next) => {
  const body = request.body

  try {
    const note = new NoteModel({
      content: body.content,
      important: body.important || false
    })

    const noteSaved = await note.save()

    response.status(201).json(noteSaved)
  } catch (error) {
    next(error)
  }
})

notesRouter.delete('/:id', async (request, response, next) => {
  let status = 200
  const id = request.params.id

  try {
    const result = await NoteModel.findByIdAndRemove(id)
    console.log(result)

    status = 204
    response.statusMessage = `Note with id:${id} deleted`
    response.status(status).end()
  } catch (error) {
    response.status = 400
    next(error)
  }
})

notesRouter.put('/:id', async (request, response, next) => {
  const id = request.params.id
  const body = request.body

  const note = {
    content: body.content,
    important: body.important
  }

  try {
    const updatedNote = await NoteModel.findByIdAndUpdate(id, note, {
      new: true
    })

    if (updatedNote) return response.json(updatedNote)

    response.status = 404
    response.json({ error: 'note not founded' })
  } catch (error) {
    next(error)
  }
})

module.exports = notesRouter
