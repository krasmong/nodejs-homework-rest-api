const fs = require('fs/promises')
const path = require('path')
const { v4: uuid } = require('uuid')

const readData = async () => {
  const data = await fs.readFile(path.join(__dirname, 'contacts.json'), 'utf8')
  return JSON.parse(data)
}

const listContacts = async () => {
  return await readData()
}

const getContactById = async (contactId) => {
  const data = await readData()
  const [result] = data.find((contact) => contact.id === contactId)
  return result
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

const removeContact = async (contactId) => {
  const data = await readData()
  const index = data.findIndex((contact) => contact.id === contactId)
  if (index !== -1) {
    const result = data.splice(index, 1)
    await fs.writeFile(
      path.join(__dirname, 'contacts.json'),
      JSON.stringify(data)
    )
    return result
  }
  return null
}

const updateContact = async (contactId, body) => {
  const data = await readData()
  const [result] = data.find((contact) => contact.id === contactId)
  if (result) {
    Object.assign(result, body)
    await fs.writeFile(
      path.join(__dirname, 'contacts.json'),
      JSON.stringify(data)
    )
  }
  return result
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
