const { Router } = require('express')
const BlogModel = require('../models/BlogModel')
const UserModel = require('../models/UserModel')
const logger = require('../utils/logger')

const blogRouter = Router()

blogRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await BlogModel.find({}).populate('author', {
      username: 1,
      name: 1
    })

    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogRouter.get('/:id', async (request, response, next) => {
  try {
    const id = request.params.id
    const blog = await BlogModel.findById(id)
    logger.info(request.auth)
    if (blog) {
      return response.json(blog)
    }

    response.status(404).end()
  } catch (error) {
    next(error)
  }
})

blogRouter.post('/', async (request, response, next) => {
  try {
    const user = await UserModel.findById(request.session.user.id)

    const blog = new BlogModel({ ...request.body, author: user._id })

    const blogSaved = await blog.save()

    user.blogs = user.blogs.concat(blogSaved._id)
    await user.save()

    response.status(201).json(blogSaved)
  } catch (error) {
    next(error)
  }
})

blogRouter.delete('/:id', async (request, response, next) => {
  try {
    const id = request.params.id

    const blogDeleted = await BlogModel.findByIdAndRemove(id)

    response.statusMessage = `blog with id: ${blogDeleted._id} deleted`
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogRouter.put('/:id', async (request, response, next) => {
  try {
    const id = request.params.id
    const body = request.body

    const blog = {
      title: body.title,
      likes: body.likes,
      url: body.url || ''
    }

    const updatedBlog = await BlogModel.findByIdAndUpdate(id, blog, {
      new: true
    })

    if (updatedBlog) {
      return response.json(updatedBlog)
    }

    response.status(404).json({ error: 'blog not founded' })
  } catch (error) {
    next(error)
  }
})

module.exports = blogRouter
