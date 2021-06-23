const Contacts = require('../repositories/contacts')

const listContacts = async (req, res, next) => {
  try {
    const userId = req.user.id
    const contacts = await Contacts.listContacts(userId)
    return res.json({ status: 'success', code: 200, data: { contacts } })
  } catch (e) {
    next(e)
  }
}

const getContactById = async (req, res, next) => {
  try {
    const userId = req.user.id
    const contact = await Contacts.getContactById(userId, req.params.contactId)
    if (contact) {
      console.log(contact)
      return res.json({ status: 'success', code: 200, data: { contact } })
    }
    return res.json({ status: 'error', code: 404, massage: 'Not found' })
  } catch (e) {
    next(e)
  }
}

const addContact = async (req, res, next) => {
  try {
    const userId = req.user.id
    const contact = await Contacts.addContact(userId, req.body)
    res.status(201).json({
      status: 'success',
      code: 201,
      data: { contact },
    })
  } catch (e) {
    if (e.name === 'ValidationError') {
      e.status = 400
    }
    next(e)
  }
}

const removeContact = async (req, res, next) => {
  try {
    const userId = req.user.id
    const contact = await Contacts.removeContact(userId, req.params.contactId)
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        massage: 'contact deleted',
        data: { contact },
      })
    }
    return res.json({
      status: 'error',
      code: 404,
      massage: 'Not found',
    })
  } catch (e) {
    next(e)
  }
}

const updateContact = async (req, res, next) => {
  try {
    const userId = req.user.id
    const contact = await Contacts.updateContact(
      userId,
      req.params.contactId,
      req.body
    )
    if (contact) {
      return res.json({ status: 'success', code: 200, data: { contact } })
    }
    return res.json({ status: 'error', code: 404, massage: 'Not found' })
  } catch (e) {
    next(e)
  }
}

const updateStatusContact = async (req, res, next) => {
  console.log('updateStatusContact')
  try {
    const userId = req.user.id
    const contact = await Contacts.updateStatusContact(
      userId,
      req.params.contactId,
      req.body
    )
    if (contact) {
      return res.json({ status: 'success', code: 200, data: { contact } })
    }
    return res.json({ status: 'error', code: 404, massage: 'Not found' })
  } catch (e) {
    next(e)
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
}
