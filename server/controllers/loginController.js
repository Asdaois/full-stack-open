const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const UserModel = require('../models/UserModel')

const loginRouter = require('express').Router()

loginRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
    const expiration = Number(request.body.expiration) || 60

    const user = await UserModel.findOne({ username: body.username })

    const passwordCorrect =
      user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash)

    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: 'invalid username or password'
      })
    }

    const userForToken = {
      username: user.username,
      id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: expiration * 60
    })

    response.status(200).send({ username: user.username, token })
  } catch (error) {
    next(error)
  }
})

loginRouter.post('/new', async (request, response, next) => {
  try {
    const body = request.body

    const potentialUser = {
      name: body.name,
      username: body.username.toLowerCase()
    }

    if (body.password === undefined) {
      return next({
        error: 'BadPassword',
        message: 'Password not sent',
        status: 400
      })
    } else if (body.password.length < 4) {
      return next({
        error: 'BadPassword',
        message: 'password is too short',
        status: 400
      })
    }

    // Exist user with username
    const userWithUsername = await UserModel.findOne({
      username: potentialUser.username
    })

    if (userWithUsername !== null) {
      return next({
        error: '`username` to be unique',
        message: 'username exist in database',
        status: 400
      })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new UserModel({ ...body, passwordHash })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (error) {
    next(error)
  }
})

module.exports = loginRouter
