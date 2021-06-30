const express = require('express')
const router = express.Router()
const controller = require('../../../controllers/users')
const guard = require('../../../helpers/guard')
const upload = require('../../../helpers/upload')

router.post('/signup', controller.signup)
router.post('/login', controller.login)
router.post('/logout', guard, controller.logout)
router.get('/current', guard, controller.current)
router.patch('/avatars', guard, upload.single('avatar'), controller.avatars)

module.exports = router
