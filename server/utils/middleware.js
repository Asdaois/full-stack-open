const logger = require('./logger')

/**
 * @param {import("express").Request} request
 */
const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path: ', request.path)
  logger.info('Body: ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error('Error: ', error._message || error.message)
  logger.error('---')

  const status = 400

  if (error.name === 'CastError') {
    return response.status(status).send({ error: error.name, message: error.message })
  }

  if (error.name === 'ValidationError') {
    return response.status(status).json({ error: error.name, message: error.message })
  }

  if (error.name === 'MongoServerError') {
    return response.status(status).json({ error: error.name, message: error.message })
  }

  next(error)
}

module.exports = { errorHandler, unknownEndpoint, requestLogger }
