const User = require('../model/userModel')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc    Create new user
// @route   Post /users
// @access  Private/Admin
const createUser = async (req, res) => {
  const { email, password, firstName, lastName, initials, rate, roles } =
    req.body

  if (!email || !password)
    return res.status(400).json({ message: 'Email and password are required.' })

  // check for duplicate emails in the db
  const duplicate = await User.findOne({ email: email }).exec()
  if (duplicate) return res.sendStatus(409) //Conflict

  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(password, 10)

    const userObject =
      !Array.isArray(roles) || !roles.length
        ? { email, password: hashedPwd, firstName, lastName, initials, rate }
        : {
            email,
            password: hashedPwd,
            firstName,
            lastName,
            initials,
            rate,
            roles,
          }

    //create and store the new user
    const user = await User.create(userObject)
    res.status(201).json({ success: `New user ${email} created!` })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @desc    Get users using search criteria
// @route   GET /users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const { lastName, isActive } = req.query

  let condition = {}
  if (lastName) {
    condition['lastName'] = { $regex: new RegExp(lastName), $options: 'i' }
  }
  if (isActive) {
    condition['isActive'] = isActive
  }

  const users = await User.find(condition)

  if (users) {
    res.json(users)
  } else {
    res.status(204)
    throw new Error('No users found')
  }
})

// @desc    Get user by id
// @route   GET /users/:id
// @access  Private/Admin
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    res.status(204)
    throw new Error('User not found')
  }
})

// @desc    Update user
// @route   PUT /users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.email = req.body.email || user.email
    if (req.body.password) {
      const hashedPwd = await bcrypt.hash(req.body.password, 10)
      user.password = hashedPwd
    }
    user.firstName = req.body.firstName || user.firstName
    user.lastName = req.body.lastName || user.lastName
    user.initials = req.body.initials || user.initials
    user.rate = req.body.rate || user.rate
    user.roles = req.body.roles || user.roles
    user.isActive = req.body.isActive || user.isActive

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      email: updatedUser.email,
      firstName: updateUser.firstName,
      lastName: updateUser.lastName,
      initials: updateUser.initials,
      rate: updateUser.rate,
      roles: updatedUser.roles,
      isActive: updateUser.isActive,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Delete user
// @route   DELETE /users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User removed successfully' })
  } else {
    res.status(204)
    throw new Error('User not found')
  }
})

// @desc    User lookup list
// @route   GET /users/lookup
// @access  Public
const userLookup = asyncHandler(async (req, res) => {
  const users = await User.find(
    { isActive: true },
    { _id: 1, firstName: 1, lastName: 1 }
  ).sort({
    firstName: 1,
  })
  res.json(users)
})

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  userLookup,
}
