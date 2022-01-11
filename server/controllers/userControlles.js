const { Router } = require('express')
const bcrypt = require('bcrypt')
const UserModel = require('../models/UserModel')

const userRouter = Router()

userRouter.get('/', async (request, response, next) => {
  try {
    const users = await UserModel.find({}).populate('notes', {
      content: 1,
      createdAt: 1
    })

    response.json(users)
  } catch (e) {
    next(e)
  }
})

userRouter.post('/', async (request, response, next) => {
  const body = request.body

  try {
    // Exist user with username
    const userWithUsername = await UserModel.findOne({
      username: body.username
    })

    console.log(userWithUsername)
    if (userWithUsername) {
      return response.status(400).json({ error: '`username` to be unique' })
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
