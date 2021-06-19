const express = require('express')
const router = express.Router()

const controller = require('../../../controllers/users')

router.post('/users/signup', controller.signup)
router.post('/users/login', controller.login)
router.post('/users/logout', controller.logout)

module.exports = router
