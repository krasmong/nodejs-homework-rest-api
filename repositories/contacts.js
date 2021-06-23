const Contact = require('../model/contact')

const listContacts = async (userId) => {
  const results = await Contact.find({ owner: userId }).populate({
    path: 'owner',
    select: 'name email subscription -_id',
  })
  return results
}

const getContactById = async (userId, contactId) => {
  const results = await Contact.findOne({
    _id: contactId,
    owner: userId,
  }).populate({
    path: 'owner',
    select: 'name email subscription',
  })
  return results
}

const addContact = async (userId, body) => {
  const result = await Contact.create({ owner: userId, ...body })
  return result
}

const removeContact = async (userId, contactId) => {
  const result = await Contact.findOneAndRemove({
    _id: contactId,
    owner: userId,
  })
  return result
}

const updateContact = async (contactId, body) => {
  const result = await Contact.findOneAndUpdate(
    { _id: contactId },
    { ...body },
    { new: true }
  )
  return result
}

const updateStatusContact = async (contactId, body) => {
  const result = await Contact.findOneAndUpdate(
    { _id: contactId },
    { ...body },
    { new: true }
  )
  return result
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
}
