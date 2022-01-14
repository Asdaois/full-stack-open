const { Router } = require('express')
const BlogModel = require('../models/BlogModel')
const UserModel = require('../models/UserModel')
const logger = require('../utils/logger')
const Tokens = require('../utils/tokens')

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
    // const userToken = Tokens.decode(request)

    const user = await UserModel.findById(request.session.user.id)
    const blog = new BlogModel({ ...request.body, author: user._id })

    const blogSaved = await blog.save()

    user.blogs.push(blogSaved._id)
    await user.save()

    await blogSaved.populate('author', { username: 1, name: 1 })
    response.status(201).json(blogSaved)
  } catch (error) {
    next(error)
  }
})

blogRouter.delete('/:id', async (request, response, next) => {
  try {
    const id = request.params.id

    const blog = await BlogModel.findById(id)

    if (!blog) {
      return next({
        error: 'BlogInvalidOrDelted',
        message: 'Blog id is invalid or is deleted',
        status: 404
      })
    }

    if (blog.author.toString() !== request.session.user.id) {
      return next({
        error: 'UserNotOwnerBlog',
        message: 'The user is no the owner of this blog',
        status: 400
      })
    }

    await blog.remove()

    const user = await UserModel.findById(blog.user)
    await user.blogs.pull(blog._id)
    await user.save()

    console.log(blog)

    response.statusMessage = `blog with id: ${blog._id} deleted`
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

    const bll = new BlogModel(blog)
    logger.info(bll)

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
