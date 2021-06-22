const Contacts = require('../repositories/contacts')

const listContacts = async (req, res, next) => {
  try {
    console.log(req.user)
    const contacts = await Contacts.listContacts()
    return res.json({ status: 'success', code: 200, data: { contacts } })
  } catch (e) {
    next(e)
  }
}

const getContactById = async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId)
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
    const contact = await Contacts.addContact(req.body)
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
    const contact = await Contacts.removeContact(req.params.contactId)
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
      massage: 'Not found7777777',
    })
  } catch (e) {
    next(e)
  }
}

const updateContact = async (req, res, next) => {
  try {
    const contact = await Contacts.updateContact(req.params.contactId, req.body)
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
    const contact = await Contacts.updateStatusContact(
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
