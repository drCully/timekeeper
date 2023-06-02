const Task = require('../model/taskModel')
const asyncHandler = require('express-async-handler')

// @desc    Create a task
// @route   POST /tasks
// @access  Private/Admin
const createTask = asyncHandler(async (req, res) => {
  const task = new Task({
    name: req.body.name,
    isActive: req.body.isActive,
  })

  const createdTask = await task.save()
  res.status(201).json(createdTask)
})

// @desc    Get tasks using search criteria
// @route   GET /tasks
// @access  Public
const getTasks = asyncHandler(async (req, res) => {
  const { name, isActive } = req.query

  let condition = {}
  if (name) {
    condition['name'] = { $regex: new RegExp(name), $options: 'i' }
  }
  if (isActive) {
    condition['isActive'] = isActive
  }

  const tasks = await Task.find(condition)

  if (tasks) {
    res.json(tasks)
  } else {
    res.status(404)
    throw new Error('Tasks not found')
  }
})

// @desc    Get task by id
// @route   GET /tasks/:id
// @access  Public
const getTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)

  if (task) {
    res.json(task)
  } else {
    res.status(404)
    throw new Error('Task not found')
  }
})

// @desc    Update a task
// @route   PUT /tasks/:id
// @access  Private/Admin
const updateTask = asyncHandler(async (req, res) => {
  const { name, isActive } = req.body

  const task = await Task.findById(req.params.id)

  if (task) {
    task.name = name
    task.isActive = isActive

    const updatedTask = await task.save()
    res.json(updatedTask)
  } else {
    res.status(404)
    throw new Error('Task not found')
  }
})

// @desc    Delete a task
// @route   DELETE /tasks/:id
// @access  Private/Admin
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)

  if (task) {
    await task.remove()
    res.json({ message: 'Task removed' })
  } else {
    res.status(404)
    throw new Error('Task not found')
  }
})

// @desc    Get task lookup list
// @route   GET /tasks/lookup
// @access  Public
const lookupTask = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ isActive: true }, { _id: 1, name: 1 }).sort({
    name: 1,
  })
  res.json(tasks)
})

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  lookupTask,
}
