const mongoose = require('mongoose')

const personSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      minlength: [3, 'Name must have more thant 3 characters']
    },
    number: {
      type: String,
      unique: true,
      minlength: [8, 'Number must be at least length of 6, got {VALUE}']
    }
  },
  { timestamps: true }
)

personSchema.set('toJSON', {
  transform: (document, objReturned) => {
    delete objReturned.__v

    objReturned.id = objReturned._id.toString()
    delete objReturned._id

    delete objReturned.createdAt
    delete objReturned.updatedAt
  }
})

module.exports = mongoose.model('Person', personSchema)
