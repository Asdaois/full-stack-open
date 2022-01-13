const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const UserModel = require('../models/UserModel')

const loginRouter = require('express').Router()

loginRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
    const expiration = Number(request.body.expiration)

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

module.exports = loginRouter
