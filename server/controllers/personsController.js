const { Router } = require('express')
const PersonModel = require('../models/PersonModel')

const personsRouter = Router()

personsRouter.get('/', async (request, response) => {
  const status = 200
  const persons = await PersonModel.find({})

  response.status(status).json(persons)
})

personsRouter.post('/', async (request, response, next) => {
  let status = 200
  const body = request.body

  if (!body.number || !body.name) {
    const errorMessage = []
    !body.number && errorMessage.push('number is missing')
    !body.name && errorMessage.push('name is missing')
    status = 400
    return response.status(status).json({ error: errorMessage.join(', ') })
  }

  try {
    const personWithName = await PersonModel.findOne({ name: body.name })

    if (personWithName) {
      const personFormatted = await personWithName.toJSON()
      return response.json({ ...personFormatted, existName: true })
    }

    const person = new PersonModel({
      name: body.name.toLowerCase(),
      number: body.number.trim()
    })

    const personSaved = await person.save()

    response.json(personSaved)
  } catch (error) {
    next(error)
  }
})

personsRouter.put('/:id', async (request, response, next) => {
  const id = request.params.id

  const person = {
    name: request.body.name,
    number: request.body.number
  }

  try {
    const updatedPerson = await PersonModel.findByIdAndUpdate(id, person, {
      new: true
    })

    if (updatedPerson) {
      return response.json(updatedPerson)
    }

    response.status = 404
    response.json({ error: 'person not found' })
  } catch (error) {
    next(error)
  }
})

personsRouter.get('/info', async (request, response, next) => {
  try {
    const count = await PersonModel.find({}).count()

    const info = {
      message: `Phonebook has info for ${count} people`,
      date: new Date().toString()
    }
    response.json(info)
  } catch (error) {
    next(error)
  }
})

personsRouter.get('/:id', async (request, response, next) => {
  const id = request.params.id

  try {
    const person = await PersonModel.findById(id)

    if (person) return response.json(person)

    response.status = 404
    response.end()
  } catch (error) {
    next(error)
  }
})

personsRouter.delete('/:id', async (request, response, next) => {
  const status = 204
  const id = request.params.id
  try {
    const result = await PersonModel.findByIdAndRemove(id)
    if (result) {
      response.statusMessage = `Person with id:${id} deleted`
      return response.status(status).end()
    }

    response.status = 404
    return response.json({ error: 'person not founded' })
  } catch (error) {
    next(error)
  }
})

module.exports = personsRouter
