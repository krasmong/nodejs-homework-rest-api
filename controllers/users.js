const Users = require('../repositories/users')
const = {HttpCode} = require('../helpers/constants')

const signup = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email)
    if (user) {
          return res.status(HttpCode.CONFLICT).json({ status: 'error', code: HttpCode.CONFLICT, message: 'Email in use' })

    }
    return res.json({ status: 'success', code: 200, data: { contacts } })
  } catch (e) {
    next(e)
  }
}

const login = async (req, res, next) => {
  try {
    const contacts = await Users.listContacts()
    return res.json({ status: 'success', code: 200, data: { contacts } })
  } catch (e) {
    next(e)
  }
}

const logout = async (req, res, next) => {
  try {
    const contacts = await Users.listContacts()
    return res.json({ status: 'success', code: 200, data: { contacts } })
  } catch (e) {
    next(e)
  }
}

module.exports = { signup, login, logout }
