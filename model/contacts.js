const db = require('./db')
const { ObjectId } = require('mongodb')

const getCollection = async (db, name) => {
  const client = await db
  const collection = await client.db().collection(name)
  return collection
}

const listContacts = async () => {
  const collection = await getCollection(db, 'contacts')
  const results = await collection.find({}).toArray()
  return results
}

const getContactById = async (contactId) => {
  const collection = await getCollection(db, 'contacts')
  const objId = new ObjectId(contactId)
  const [results] = await collection.find({ _id: objId }).toArray()
  return results
}

const addContact = async (body) => {
  const collection = await getCollection(db, 'contacts')
  const record = {
    ...body,
    ...(body.favorite ? {} : { favorite: false }),
  }
  const {
    ops: [result],
  } = await collection.insertOne(record)
  return result
}

const removeContact = async (contactId) => {
  const collection = await getCollection(db, 'contacts')
  const objId = new ObjectId(contactId)
  const { value: result } = await collection.findOneAndDelete({ _id: objId })
  return result
}

const updateContact = async (contactId, body) => {
  const collection = await getCollection(db, 'contacts')
  const objId = new ObjectId(contactId)
  const { value: result } = await collection.findOneAndUpdate(
    { _id: objId },
    { $set: body },
    { returnOriginal: false }
  )
  return result
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
