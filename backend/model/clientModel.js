const mongoose = require('mongoose')
const Schema = mongoose.Schema

const clientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    addr1: {
      type: String,
      required: false,
    },
    addr2: {
      type: String,
      required: false,
    },
    addr3: {
      type: String,
      required: false,
    },
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    isActive: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Client', clientSchema)
