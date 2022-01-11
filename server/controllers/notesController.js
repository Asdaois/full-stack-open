const NoteModel = require('../models/NoteModel')
const UserModel = require('../models/UserModel')
const tokens = require('../utils/tokens')

const notesRouter = require('express').Router()

notesRouter.get('/', async (request, response) => {
  const notes = await NoteModel.find({}).populate('user', {
    username: 1,
    name: 1
  })

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
  try {
    const body = request.body

    const decodeToken = tokens.decode(request)
    if (!decodeToken.id) {
      next(tokens.JWTNotProvidedOrInvalid)
    }

    const user = await UserModel.findById(decodeToken.id)

    const note = new NoteModel({
      content: body.content,
      important: body.important || false,
      user: user._id
    })

    const noteSaved = await note.save()

    user.notes = user.notes.concat(noteSaved._id)
    await user.save()

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

    status = 204
    response.statusMessage = `Note with id:${result._id} deleted`
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
