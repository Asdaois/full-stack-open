const NoteModel = require('../../models/NoteModel')
const BlogModel = require('../../models/BlogModel')
const UserModel = require('../../models/UserModel')

const router = require('express').Router()

router.post('/reset', async (request, response) => {
  await NoteModel.deleteMany({})
  await BlogModel.deleteMany({})
  await UserModel.deleteMany({})

  response.status(204).end()
})

module.exports = router
