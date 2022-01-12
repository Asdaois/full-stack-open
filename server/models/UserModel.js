const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: String,
  passwordHash: String,
  notes: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Note' }],
  blogs: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Blog' }]
})

userSchema.set('toJSON', {
  getters: true,
  versionKey: false,
  transform: (document, returned) => {
    delete returned.__V

    returned.id = returned._id.toString()
    delete returned._id

    // The passwordHash should not be revealed
    delete returned.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)
