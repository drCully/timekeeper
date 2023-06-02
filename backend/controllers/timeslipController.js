const Timeslip = require('../model/timeslipModel')
const asyncHandler = require('express-async-handler')

// @desc    Create a timeslip
// @route   POST /timeslips
// @access  Private/Admin
const createTimeslip = asyncHandler(async (req, res) => {
  const timeslip = new Timeslip({
    date: req.body.date,
    timekeeper: req.body.timekeeper,
    client: req.body.client,
    task: req.body.task,
    description: req.body.description,
    hours: req.body.hours,
    rate: req.body.rate,
    billable: req.body.billable,
    billed: req.body.billed,
    invoice: req.body.invoice,
  })

  const createdTimeslip = await timeslip.save()
  res.status(201).json(createdTimeslip)
})

// @desc    Get timeslips using search criteria
// @route   GET /timeslips
// @access  Public
const getTimeslips = asyncHandler(async (req, res) => {
  const {
    date,
    timekeeper,
    client,
    description,
    lastdate,
    billable,
    billed,
    invoice,
  } = req.query

  let condition = {}
  if (date) {
    condition['date'] = date
  }
  if (timekeeper) {
    condition['timekeeper'] = timekeeper
  }
  if (client) {
    condition['client'] = client
  }
  if (description) {
    condition['description'] = {
      $regex: new RegExp(description),
      $options: 'i',
    }
  }
  if (lastdate) {
    condition['date'] = JSON.parse('{"$lte": "' + lastdate + '"}')
  }
  if (billable) {
    condition['billable'] = billable
  }
  if (billed) {
    condition['billed'] = billed
  }
  if (invoice) {
    condition['invoice'] = invoice
  }

  const timeslip = await Timeslip.find(condition).populate([
    {
      path: 'timekeeper',
      select: ['firstname', 'initials'],
    },
    { path: 'client', select: 'name' },
    { path: 'task', select: 'name' },
  ])

  res.json(timeslip)
})

// @desc    Get a timeslip by id
// @route   GET /timeslips/:id
// @access  Public
const getTimeslip = asyncHandler(async (req, res) => {
  const timeslip = await Timeslip.findById(req.params.id).populate({
    path: 'invoice',
    selecte: 'number',
  })

  if (timeslip) {
    res.json(timeslip)
  } else {
    res.status(404)
    throw new Error('Timeslip not found')
  }
})

// @desc    Update timeslip
// @route   PUT /timeslips/:id
// @access  Private/Admin
const updateTimeslip = asyncHandler(async (req, res) => {
  const {
    date,
    timekeeper,
    client,
    task,
    description,
    hours,
    rate,
    billable,
    billed,
    invoice,
  } = req.body

  const timeslip = await Timeslip.findById(req.params.id)

  if (timeslip) {
    timeslip.date = date
    timeslip.timekeeper = timekeeper
    timeslip.client = client
    timeslip.task = task
    timeslip.description = description
    timeslip.hours = hours
    timeslip.rate = rate
    timeslip.billable = billable
    timeslip.billed = billed
    timeslip.invoice = invoice

    const updatedTimeslip = await timeslip.save()
    res.json(updatedTimeslip)
  } else {
    res.status(404)
    throw new Error('Timeslip not found')
  }
})

// @desc    Delete timelip
// @route   DELETE /timeslip/:id
// @access  Private/Admin
const deleteTimeslip = asyncHandler(async (req, res) => {
  const timeslip = await Timeslip.findById(req.params.id)

  if (timeslip) {
    await timeslip.remove()
    res.json({ message: 'Timeslip removed' })
  } else {
    res.status(404)
    throw new Error('Timeslip not found')
  }
})

// @desc    Update timeslip billing status
// @route   GET /timeslips/:id/invoice
// @access  Private/Admin
const updateBillingStatus = asyncHandler(async (req, res) => {
  const timeslip = await Timeslip.findById(req.params.id)

  if (timeslip) {
    timeslip.billed = req.body.billed
    timeslip.invoice = req.body.invoice

    const updatedTimeslip = await timeslip.save()

    res.json(updatedTimeslip)
  } else {
    res.status(404)
    throw new Error('Timeslip not found')
  }
})

module.exports = {
  createTimeslip,
  getTimeslips,
  getTimeslip,
  updateTimeslip,
  deleteTimeslip,
  updateBillingStatus,
}
