const Tokens = require('../utils/tokens')

/**
 * Check authentication
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 * @param {*} next
 */
const checkAuthentication = async (request, response, next) => {
  try {
    const decode = Tokens.decode(request)

    if (!decode.id) {
      next(Tokens.JWTNotProvidedOrInvalid)
    }

    request.session.user = decode
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = checkAuthentication
