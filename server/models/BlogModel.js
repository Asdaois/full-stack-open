const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    url: { type: String },
    likes: { type: Number, default: 0 }
  },
  { timestamps: true }
)

blogSchema.set('toJSON', {
  versionKey: false,
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id

    returnedObject.date = returnedObject.createdAt
    delete returnedObject.createdAt
    delete returnedObject.updatedAt
  }
})

module.exports = mongoose.model('Blog', blogSchema)
