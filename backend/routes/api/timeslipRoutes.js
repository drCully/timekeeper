const express = require('express')
const router = express.Router()
const timeslipController = require('../../controllers/timeslipController')
const ROLES_LIST = require('../../config/roles_list')
const verifyRoles = require('../../middleware/verifyRoles')

router
  .route('/')
  .get(timeslipController.getTimeslips)
  .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    timeslipController.createTimeslip
  )
router
  .route('/:id')
  .get(timeslipController.getTimeslip)
  .delete(verifyRoles(ROLES_LIST.Admin), timeslipController.deleteTimeslip)
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    timeslipController.updateTimeslip
  )
router.route('/:id/invoice').get(timeslipController.updateBillingStatus)

module.exports = router
