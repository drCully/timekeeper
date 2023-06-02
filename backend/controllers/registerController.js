const User = require('../model/userModel')
const bcrypt = require('bcrypt')

// @desc    Register a new user
// @route   Post /api/users
// @access  Public
const registerUser = async (req, res) => {
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

    //create and store the new user
    const userObject =
      !Array.isArray(roles) || !roles.length
        ? {
            email,
            password: hashedPwd,
            firstName,
            lastName,
            initials,
            rate,
          }
        : {
            email,
            password: hashedPwd,
            firstName,
            lastName,
            initials,
            rate,
            roles,
          }

    const result = await User.create(userObject)

    res.status(201).json({ success: `New user ${email} created!` })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = { registerUser }
