const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error: '))

db.on('open', () => {
  console.log('Connected successfully to database')
})

module.exports = db
