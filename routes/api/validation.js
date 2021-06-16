const Joi = require('joi')
const mongoose = require('mongoose')

const schemaCreateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  phone: Joi.number().integer().min(3).max(9999999999).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ua', 'ru'] },
    })
    .required(),
  favorite: Joi.boolean().optional(),
})

const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  phone: Joi.number().integer().min(3).max(9999999999).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ua', 'ru'] },
    })
    .optional(),
  favorite: Joi.boolean().optional(),
}).or('name', 'phone', 'email')

const schemaUpdateStatusContact = Joi.object({
  favorite: Joi.boolean().required(),
})

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj)
    next()
  } catch (err) {
    next({
      status: 400,
      message: err.message.replace(/"/g, ''),
    })
  }
}

module.exports = {
  validationCreateContact: (req, res, next) => {
    if (!req.body.name || !req.body.phone || !req.body.email) {
      return res.status(400).json({
        status: 'fail',
        code: 400,
        massage: 'missing required name field',
      })
    }
    return validate(schemaCreateContact, req.body, next)
  },

  validationUpdateContact: (req, res, next) => {
    if (
      !req.body.name &&
      !req.body.phone &&
      !req.body.email &&
      !req.body.favorite
    ) {
      return res.status(400).json({
        status: 'fail',
        code: 400,
        massage: 'missing fields',
      })
    }
    return validate(schemaUpdateContact, req.body, next)
  },

  validationUpdateStatusContact: (req, res, next) => {
    if (req.body.favorite === undefined) {
      return res.status(400).json({
        status: 'fail',
        code: 400,
        massage: 'missing field favorite',
      })
    }
    return validate(schemaUpdateStatusContact, req.body, next)
  },

  validationMongoId: (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.contactId)) {
      return next({
        status: 400,
        message: 'invalid ObjectId',
      })
    }
    next()
  },
}
