const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
    },
    username: {
      type: String,
      required: [true, 'Please provide username'],
      unique: true,
      minlength: [4, 'Username must have at least 4 characters'],
      validate: {
        validator: async function (value) {
          const user = await this.constructor.findOne({ username: value })
          return !user
        },
        message: 'Username already exists',
      },
    },
    email: {
      type: String,
      required: [true, 'Please provide email address'],
      unique: true,
      validate: {
        validator: async function (value) {
          const user = await this.constructor.findOne({ email: value })
          return !user
        },
        message: 'Email address already exists',
      },
    },
    password: {
      type: String,
      required: [true, 'Please provide password'],
      minlength: [6, 'Password must have at least 6 characters'],
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', userSchema)

module.exports = User
