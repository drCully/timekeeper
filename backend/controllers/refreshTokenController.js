const User = require('../model/userModel')
const jwt = require('jsonwebtoken')

// @desc Refresh
// @route GET /refresh
// @access Public (because signin has expired)
const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(401)
  const refreshToken = cookies.jwt
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })

  const foundUser = await User.findOne({ refreshToken }).exec()

  // Detected refresh token reuse!
  if (!foundUser) {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) return res.sendStatus(403) //Forbidden
        const hackedUser = await User.findOne({
          userId: decoded.userId,
        }).exec()
        hackedUser.refreshToken = []
        const result = await hackedUser.save()
        //console.log(result)
      }
    )
    return res.sendStatus(403) //Forbidden
  }

  const newRefreshTokenArray = foundUser.refreshToken.filter(
    (rt) => rt !== refreshToken
  )

  // evaluate jwt
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        // refresh token expired, remove from array in database
        foundUser.refreshToken = [...newRefreshTokenArray]
        const result = await foundUser.save()
      }
      if (err || String(foundUser._id) !== String(decoded.userId))
        return res.sendStatus(403)
      // Refresh token was still valid
      const roles = Object.values(foundUser.roles)
      const accessToken = jwt.sign(
        {
          UserInfo: {
            userId: decoded.userId,
            userName: foundUser.firstName,
            userRate: foundUser.rate,
            roles: roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
      )

      const newRefreshToken = jwt.sign(
        { userId: decoded.userId },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1h' }
      )
      // Saving refreshToken with current user
      foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken]
      const result = await foundUser.save()

      // Creates Secure Cookie with refresh token
      res.cookie('jwt', newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 24 * 60 * 60 * 1000,
      })

      res.json({ accessToken })
    }
  )
}

module.exports = { handleRefreshToken }
