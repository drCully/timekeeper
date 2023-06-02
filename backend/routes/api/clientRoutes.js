const express = require('express')
const router = express.Router()
const clientController = require('../../controllers/clientController')
const ROLES_LIST = require('../../config/roles_list')
const verifyRoles = require('../../middleware/verifyRoles')

router
  .route('/')
  .get(clientController.getClients)
  .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    clientController.createClient
  )
router.route('/lookup').get(clientController.lookupClient)
router
  .route('/:id')
  .get(clientController.getClient)
  .delete(verifyRoles(ROLES_LIST.Admin), clientController.deleteClient)
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    clientController.updateClient
  )

module.exports = router
