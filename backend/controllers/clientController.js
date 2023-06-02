const Client = require('../model/clientModel')
const asyncHandler = require('express-async-handler')

// @desc    Create a client
// @route   POST /clients
// @access  Private/Admin
const createClient = asyncHandler(async (req, res) => {
  const client = new Client({
    name: req.body.name,
    addr1: req.body.addr1,
    addr2: req.body.addr2,
    addr3: req.body.addr3,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    isActive: req.body.isActive,
  })

  const createdClient = await client.save()
  res.status(201).json(createdClient)
})

// @desc    Get clients using search criteria
// @route   GET /clients
// @access  Public
const getClients = asyncHandler(async (req, res) => {
  const { name, isActive } = req.query

  let condition = {}
  if (name) {
    condition['name'] = { $regex: new RegExp(name), $options: 'i' }
  }
  if (isActive) {
    condition['isActive'] = isActive
  }

  const clients = await Client.find(condition)

  res.json(clients)
})

// @desc    Get client by id
// @route   GET /clients/:id
// @access  Public
const getClient = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id)

  if (client) {
    res.json(client)
  } else {
    res.status(404)
    throw new Error('Client not found')
  }
})

// @desc    Update a client
// @route   PUT /clients/:id
// @access  Private/Admin
const updateClient = asyncHandler(async (req, res) => {
  const { name, addr1, addr2, addr3, firstName, lastName, email, isActive } =
    req.body

  const client = await Client.findById(req.params.id)

  if (client) {
    client.name = name
    client.addr1 = addr1
    client.addr2 = addr2
    client.addr3 = addr3
    client.firstName = firstName
    client.lastName = lastName
    client.email = email
    client.isActive = isActive

    const updatedClient = await client.save()
    res.json(updatedClient)
  } else {
    res.status(404)
    throw new Error('Client not found')
  }
})

// @desc    Delete a client
// @route   DELETE /clients/:id
// @access  Private/Admin
const deleteClient = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id)

  if (client) {
    await client.remove()
    res.json({ message: 'Client removed' })
  } else {
    res.status(404)
    throw new Error('Client not found')
  }
})

// @desc    Get client lookup list
// @route   GET /clients/lookup
// @access  Public
const lookupClient = asyncHandler(async (req, res) => {
  const clients = await Client.find(
    { isActive: true },
    { _id: 1, name: 1 }
  ).sort({
    name: 1,
  })
  res.json(clients)
})

module.exports = {
  createClient,
  getClients,
  getClient,
  updateClient,
  deleteClient,
  lookupClient,
}
