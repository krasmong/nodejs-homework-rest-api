const Users = require('../repositories/users')
const { HttpCode } = require('../helpers/constants')
const jwt = require('jsonwebtoken')
const fs = require('fs/promises')
const path = require('path')
require('dotenv').config()

const UploadAvatarService = require('../services/local-upload')

const SECRET_KEY = process.env.SECRET_KEY

const signup = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email)
    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: 'Conflict',
        code: HttpCode.CONFLICT,
        message: 'Email in use',
      })
    }
    const { id, name, email, subscription, avatarURL } = await Users.create(
      req.body
    )

    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: { id, name, email, subscription, avatarURL },
    })
  } catch (e) {
    next(e)
  }
}

const login = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email)
    const isValidPassword = await user?.isValidPassword(req.body.password)
    if (!user || !isValidPassword) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        message: 'Email or password is wrong',
      })
    }
    const id = user.id
    const payload = { id, test: 'Larisa the best' }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' })
    await Users.updateToken(id, token)
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { token },
    })
  } catch (e) {
    next(e)
  }
}

const current = async (req, res, next) => {
  try {
    console.log(req.user)
    const { email, subscription } = await req.user
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { email, subscription },
    })
  } catch (e) {
    next(e)
  }
}

const logout = async (req, res, next) => {
  try {
    const id = req.user.id
    await Users.updateToken(id, null)
    return res.status(HttpCode.NO_CONTENT).json({})
  } catch (e) {
    next(e)
  }
}

const avatars = async (req, res, next) => {
  try {
    const id = req.user.id
    const uploads = new UploadAvatarService(process.env.AVATARS_OF_USERS)
    const avatarUrl = await uploads.saveAvatar({ idUser: id, file: req.file })
    try {
      await fs.unlink(
        path.join(process.env.AVATARS_OF_USERS, req.user.avatarURL)
      )
    } catch (e) {
      console.log(e.message)
    }
    await Users.updateAvatar(id, avatarUrl)
    res.json({ status: 'success', code: HttpCode.OK, data: { avatarUrl } })
  } catch (error) {
    next(error)
  }
}

module.exports = { signup, login, logout, current, avatars }
