const { Router } = require('express')
const BlogModel = require('../models/BlogModel')
const logger = require('../utils/logger')

const blogRouter = Router()

blogRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await BlogModel.find({})

    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogRouter.post('/', async (request, response, next) => {
  try {
    const blog = new BlogModel(request.body)
    const blogSaved = await blog.save()
    logger.error(blogSaved)
    response.status = 201
    response.json(blogSaved)
  } catch (error) {
    next(error)
  }
})

module.exports = blogRouter