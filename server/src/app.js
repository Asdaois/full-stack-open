const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const session = require('express-session')

const blogRouter = require('../controllers/blogsController')
const loginRouter = require('../controllers/loginController')
const notesRouter = require('../controllers/notesController')
const personsRouter = require('../controllers/personsController')
const userRouter = require('../controllers/userController')
const checkAuthentication = require('../middlewares/authentication')
const middleware = require('../utils/middleware')
const config = require('../utils/config')

require('./mongodb').init()

const app = express()

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(
  session({
    secret: config.SECRET,
    saveUninitialized: false,
    resave: false,
    userToken: null
  })
)

morgan.token('body', req => JSON.stringify(req.body))
morgan.token('params', req => JSON.stringify(req.params))
app.use(middleware.requestLogger)

app.use('/api/login', loginRouter)

app.get('/api', (request, response, next) => {
  response.json({
    message: 'Hey there this application is in development',
    userToken: request.session.userToken
  })
})

app.use(checkAuthentication)



app.use('/api/notes', notesRouter)
app.use('/api/phonebook/persons', personsRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
