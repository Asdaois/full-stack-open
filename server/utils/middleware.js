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

/**
 * @param {import('express').Request} request
 */
const errorHandler = (error, request, response, next) => {
  logger.error('Error: ', error._message || error.message)
  logger.error('---')
  let status = 200

  if (
    error.name === 'CastError' ||
    error.name === 'ValidationError' ||
    error.name === 'TypeError'
  ) {
    status = 400
  } else if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
    status = 401
  } else if (error.name === 'MongoServerError') {
    status = 500
  }

  if (status !== 200) {
    return response
      .status(status)
      .send({ error: error.name, message: error.message })
  }

  next(error)
}

module.exports = { errorHandler, unknownEndpoint, requestLogger }
