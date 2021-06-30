const User = require('../model/user')

const findById = async (contactId) => {
  return await User.findById(contactId)
}

const findByEmail = async (email) => {
  return await User.findOne({ email })
}

const create = async (body) => {
  const user = new User(body)
  return await user.save()
}

const updateToken = async (contactId, token) => {
  return await User.updateOne({ _id: contactId }, { token })
}

const updateAvatar = async (contactId, avatarURL) => {
  return await User.updateOne({ _id: contactId }, { avatarURL })
}

module.exports = {
  findById,
  findByEmail,
  create,
  updateToken,
  updateAvatar,
}
