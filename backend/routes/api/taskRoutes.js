const express = require('express')
const router = express.Router()
const taskController = require('../../controllers/taskController')
const ROLES_LIST = require('../../config/roles_list')
const verifyRoles = require('../../middleware/verifyRoles')

router
  .route('/')
  .get(taskController.getTasks)
  .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    taskController.createTask
  )
router.route('/lookup').get(taskController.lookupTask)
router
  .route('/:id')
  .get(taskController.getTask)
  .delete(verifyRoles(ROLES_LIST.Admin), taskController.deleteTask)
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    taskController.updateTask
  )

module.exports = router
