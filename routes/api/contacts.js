const express = require('express')
const router = express.Router()
const Contacts = require('../../model')

router.use((req, res, next) => {
  console.log(req.url)
  next()
})

router.get('/', async (req, res, next) => {
  console.log('Hi')
  try {
    const contacts = await Contacts.listContacts()
    res.json({ status: 'success', code: 200, data: { contacts } })
  } catch (e) {
    next(e)
  }
})

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.post('/', async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body)
    res.status(201).json({ status: 'success', code: 201, data: { contact } })
  } catch (e) {
    next(e)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
