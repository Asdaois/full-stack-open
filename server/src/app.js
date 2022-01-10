const cors = require('cors')
const express = require('express')
const morgan = require('morgan')

const notesRouter = require('../controllers/notesController')
const personsRouter = require('../controllers/personsController')
const middleware = require('../utils/middleware')

require('./mongodb').init()

const app = express()

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

morgan.token('body', req => JSON.stringify(req.body))
morgan.token('params', req => JSON.stringify(req.params))
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)
app.use('/api/phonebook/persons', personsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app