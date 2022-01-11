const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      minlength: 5,
      required: true
    },
    important: Boolean,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
)

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v

    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id

    returnedObject.date = returnedObject.createdAt
    delete returnedObject.createdAt
    delete returnedObject.updatedAt
  }
})

module.exports = mongoose.model('Note', noteSchema)
