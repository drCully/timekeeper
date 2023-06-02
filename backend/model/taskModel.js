const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Task', taskSchema)
