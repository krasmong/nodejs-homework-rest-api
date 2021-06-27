const express = require('express')
const router = express.Router()
const controller = require('../../../controllers/contacts')
const guard = require('../../../helpers/guard')

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
  .get('/', guard, controller.listContacts)
  .post('/', guard, validationCreateContact, controller.addContact)

router
  .get('/:contactId', guard, validationMongoId, controller.getContactById)
  .delete('/:contactId', guard, validationMongoId, controller.removeContact)
  .put(
    '/:contactId',
    guard,
    validationMongoId,
    validationUpdateContact,
    controller.updateContact
  )

router.patch(
  '/:contactId/favorite',
  guard,
  validationUpdateStatusContact,
  controller.updateStatusContact
)

module.exports = router
