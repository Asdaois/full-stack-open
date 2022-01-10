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

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'wrong id format' })
  }

  if (error.name === 'ValidationError') {
    response.status = 400
    return response.json({ error: 'validation', message: error.message })
  }

  if (error.name === 'MongoServerError') {
    response.status = 400
    return response.json({ error: 'duplicate key', message: error.message })
  }

  next(error)
}

module.exports = { errorHandler, unknownEndpoint, requestLogger }
