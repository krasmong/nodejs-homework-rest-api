const express = require('express')
const router = express.Router()

router.use('/contacts', require('./contacts'))
router.use('/users', require('./users'))

module.exports = router
