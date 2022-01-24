const jwt = require('jsonwebtoken')

/**
 *
 * @param {import("express").Request} request
 */
const getTokenFrom = request => {
  const authorization = request.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }

  return null
}

const decode = request => {
  const token = getTokenFrom(request)
  const decodeToken = jwt.verify(token, process.env.SECRET)
  return decodeToken
}

const JWTNotProvidedOrInvalid = {
  error: 'JsonWebTokenError',
  message: 'jwt must be provided or is invalid'
}

const Tokens = { getTokenFrom, decode, JWTNotProvidedOrInvalid }

module.exports = Tokens
