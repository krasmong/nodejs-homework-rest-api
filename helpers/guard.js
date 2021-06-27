const passport = require('passport')
require('../config/passport')
const { HttpCode } = require('./constants')

const guard = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    const headerAuth = req.get('Authorization')
    // console.log(
    //   ' ~ file: guard.js ~ line 8 ~ passport.authenticate ~ headerAuth',
    //   headerAuth
    // )
    let token = null
    if (headerAuth) {
      token = headerAuth.split(' ')[1]
    }

    if (err || !user || token !== user?.token) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        message: 'Not authorized',
      })
    }

    req.user = user // res.locals.user = user
    return next()
  })(req, res, next)
}

module.exports = guard
