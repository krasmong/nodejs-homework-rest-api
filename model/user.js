const { Schema, model } = require('mongoose')
const { Subscription } = require('../helpers/constants')

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate(value) {
        const re = /\S+@\S+\.\S+/g
        return re.test(String(value).toLowerCase())
      },
    },
    subscription: {
      type: String,
      enum: [Subscription.STARTER, Subscription.PRO, Subscription.BUSINESS],
      default: Subscription.STARTER,
    },
    token: {
      type: String,
      default: null,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

userSchema.path('name').validate((value) => {
  const re = /[A-Z]\w+/g
  return re.test(String(value))
})

const User = model('user', userSchema)

module.exports = User
