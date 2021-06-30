const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const boolParser = require('express-query-boolean')
const path = require('path')
const { limiterAPI } = require('./helpers/constants')
require('dotenv').config()
const AVATARS_OF_USERS = process.env.AVATARS_OF_USERS

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(helmet())
app.use('/avatars/', express.static(path.join(__dirname, AVATARS_OF_USERS)))
app.use(express.static(path.join(__dirname, AVATARS_OF_USERS)))
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json({ limit: 10000 }))
app.use(boolParser())

app.use('/api/', rateLimit(limiterAPI))

app.use('/api/', require('./routes/api/'))

// app.use('/api/contacts', contactsRouter)
// app.use('/api/users', require('./routes/api/users'))

app.use((req, res) => {
  res.status(404).json({ status: 'error', code: 404, message: 'Not found' })
})

app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).json({
    status: status === 500 ? 'fail' : 'error',
    code: status,
    message: err.message,
  })
})

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason)
})

module.exports = app
