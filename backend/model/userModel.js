const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    initials: {
      type: String,
      required: false,
      unique: false,
    },
    rate: {
      type: Number,
      required: false,
    },
    roles: {
      type: [String],
      default: ['User'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    refreshToken: [String],
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
