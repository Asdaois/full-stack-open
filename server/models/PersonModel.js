const mongoose = require('mongoose');

const personSchema = new mongoose.Schema(
  {
    name: String,
    number: String,
  },
  { timestamps: true }
);

personSchema.set('toJSON', {
  transform: (document, objReturned) => {
    delete objReturned.__v;

    objReturned.id = objReturned._id.toString();
    delete objReturned._id;

    delete objReturned.createdAt;
    delete objReturned.updatedAt;
  },
});

module.exports = mongoose.model('Person', personSchema);
