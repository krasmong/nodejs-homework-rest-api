const express = require('express')
const router = express.Router()
const controller = require('../../../controllers/users')
const guard = require('../../../helpers/guard')

router.post('/signup', controller.signup)
router.post('/login', controller.login)
router.post('/logout', guard, controller.logout)

module.exports = router
