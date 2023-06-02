const express = require('express')
const router = express.Router()
const invoiceController = require('../../controllers/invoiceController')
const ROLES_LIST = require('../../config/roles_list')
const verifyRoles = require('../../middleware/verifyRoles')

router
  .route('/')
  .get(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    invoiceController.getInvoices
  )
  .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    invoiceController.createInvoice
  )
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    invoiceController.updateInvoice
  )
router
  .route('/:id')
  .get(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    invoiceController.getInvoice
  )
  .delete(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    invoiceController.deleteInvoice
  )
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    invoiceController.updateInvoice
  )

module.exports = router
