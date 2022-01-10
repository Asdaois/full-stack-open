const config = require('../utils/config')
const logger = require('../utils/logger')
const mongoose = require('mongoose')

const init = () => {
  try {
    mongoose.connect(config.MONGODB_URI)

    logger.info('Connected successfully to database')
  } catch (e) {
    logger.error('connection error: ', e.message)
  }
}

module.exports = { init }
