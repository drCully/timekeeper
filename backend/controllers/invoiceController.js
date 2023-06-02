const Invoice = require('../model/invoiceModel')
const asyncHandler = require('express-async-handler')

// @desc    Create an invoice
// @route   POST /invoices
// @access  Private/Admin
const createInvoice = asyncHandler(async (req, res) => {
  const invoice = new Invoice({
    date: req.body.date,
    client: req.body.client,
    subTotal: req.body.subTotal,
    salesTax: req.body.salesTax,
    hours: req.body.hours,
  })

  const createdInvoice = await invoice.save()
  res.status(201).json(createdInvoice)
})

// @desc    Get invoices using search criteria
// @route   GET /invoices
// @access  Public
const getInvoices = asyncHandler(async (req, res) => {
  const { number, client } = req.query

  let condition = {}
  if (number) {
    condition['number'] = { $regex: new RegExp(number), $options: 'i' }
  }
  if (client) {
    condition['client'] = { $regex: new RegExp(client), $options: 'i' }
  }

  const invoices = await Invoice.find(condition).populate('client', 'name')

  res.json(invoices)
})

// @desc    Get invoice by id
// @route   GET /invoices/:id
// @access  Public
const getInvoice = asyncHandler(async (req, res) => {
  const invoice = await Invoice.findById(req.params.id).populate([
    {
      path: 'client',
      select: ['name', 'addr1', 'addr2', 'addr3'],
    },
  ])

  if (invoice) {
    res.json(invoice)
  } else {
    res.status(404)
    throw new Error('Invoice not found')
  }
})

// @desc    Update an invoice
// @route   PUT /invoices/:id
// @access  Private/Admin
const updateInvoice = asyncHandler(async (req, res) => {
  const { number, date, client, subTotal, salesTax, hours, status } = req.body

  const invoice = await Invoice.findById(req.params.id)

  if (invoice) {
    invoice.number = number
    invoice.date = date
    invoice.client = client
    invoice.subTotal = subTotal
    invoice.salesTax = salesTax
    invoice.hours = hours
    invoice.status = status
    const updatedInvoice = await invoice.save()
    res.json(updatedInvoice)
  } else {
    res.status(404)
    throw new Error('Invoice not found')
  }
})

// @desc    Delete an invoice
// @route   DELETE /invoices/:id
// @access  Private/Admin
const deleteInvoice = asyncHandler(async (req, res) => {
  const invoice = await Invoice.findById(req.params.id)

  if (invoice) {
    await invoice.remove()
    res.json({ message: 'Invoice removed' })
  } else {
    res.status(404)
    throw new Error('Invoice not found')
  }
})

module.exports = {
  createInvoice,
  getInvoices,
  getInvoice,
  updateInvoice,
  deleteInvoice,
}
