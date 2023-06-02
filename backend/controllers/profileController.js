const User = require('../model/userModel')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc    Get user profile
// @route   GET /profile/:id
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    res.json({
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      initials: user.initials,
      rate: user.rate,
      isActive: user.isActive,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user profile
// @route   PUT /users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
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

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      initials: updatedUser.initials,
      rate: updatedUser.rate,
      isActive: updatedUser.isActive,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

module.exports = {
  getUserProfile,
  updateUserProfile,
}
