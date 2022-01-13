const { Router } = require('express')
const bcrypt = require('bcrypt')
const UserModel = require('../models/UserModel')

const userRouter = Router()

userRouter.get('/', async (request, response, next) => {
  try {
    const users = await UserModel.find({})
      .populate('notes', {
        content: 1,
        createdAt: 1
      })
      .populate('blogs', {
        title: 1,
        url: 1,
        createdAt: 1,
        likes: 1
      })

    response.json(users)
  } catch (e) {
    next(e)
  }
})

userRouter.post('/', async (request, response, next) => {
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

module.exports = userRouter
