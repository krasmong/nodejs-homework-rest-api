const { writeFile } = require('fs')
const fs = require('fs/promises')
const path = require('path')
const { v4: uuid } = require('uuid')
// const contacts = require('./contacts.json')

const readData = async () => {
  const data = await fs.readFile(path.join(__dirname, 'contacts.json'), 'utf8')
  return JSON.parse(data)
}

const listContacts = async () => {
  return await readData()
}

const addContact = async (body) => {
  const id = uuid()
  const record = {
    id,
    ...body,
  }
  const data = await readData()
  data.push(record)
  await fs.writeFile(
    path.join(__dirname, 'contacts.json'),
    JSON.stringify(data)
  )
  return record
}

const getContactById = async (contactId) => {}

const removeContact = async (contactId) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
