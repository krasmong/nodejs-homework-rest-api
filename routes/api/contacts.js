const express = require('express')
const router = express.Router()

const controller = require('../../controllers/contacts')

const {
  validationCreateContact,
  validationUpdateContact,
  validationUpdateStatusContact,
  validationMongoId,
} = require('./validation')

router.use((req, res, next) => {
  console.log(req.url)
  next()
})

router
  .get('/', controller.listContacts)
  .post('/', validationCreateContact, controller.addContact)

router
  .get('/:contactId', validationMongoId, controller.getContactById)
  .delete('/:contactId', validationMongoId, controller.removeContact)
  .put(
    '/:contactId',
    validationMongoId,
    validationUpdateContact,
    controller.updateContact
  )

router.patch(
  '/:contactId/favorite',
  validationUpdateStatusContact,
  controller.updateStatusContact
)

module.exports = router
