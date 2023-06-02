const mongoose = require('mongoose')
const Schema = mongoose.Schema

const timeslipSchema = new Schema(
  {
    date: Date,
    timekeeper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
    description: String,
    hours: Number,
    rate: Number,
    billable: Boolean,
    billed: Boolean,
    invoice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Invoice',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Timesheet', timeslipSchema)
