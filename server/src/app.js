const cors = require('cors')
const express = require('express')

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
    resave: true,
    userToken: null
  })
)

app.use(middleware.requestLogger)

app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('../controllers/testing/testController')
  app.use('/api/testing', testingRouter)
}

app.get('/api', (request, response, next) => {
  const about = {
    message: 'Hey there!!!, this application is in development',
    important: 'Is blocked with encrytation'
  }

  response.send(`
  <div>
    <h1>${about.message}</h1>
    <strong>${about.important}</strong>
  </div>`)
})

app.use(checkAuthentication)

app.use('/api/notes', notesRouter)
app.use('/api/phonebook/persons', personsRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
