const UserModel = require('../../models/UserModel')

module.exports.usersInDB = async () => {
  const users = await UserModel.find({})

  return users.map(u => u.toJSON())
}
