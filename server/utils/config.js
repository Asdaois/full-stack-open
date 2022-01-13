require('dotenv').config()

const PORT = process.env.PORT

const NODE_ENV = process.env.NODE_ENV
const MONGODB_URI =
  NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : NODE_ENV === 'production'
      ? process.env.MONGODB_URI
      : 'mongodb://127.0.0.1:27017/full-stack-open'

module.exports = {
  MONGODB_URI,
  PORT,
  SECRET: process.env.SECRET
}
