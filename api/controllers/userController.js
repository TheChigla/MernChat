const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')

// @JWT | Generate JWT token //
function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET)
}

// @POST | Login user //
const loginUser = async (req, res) => {
  // Get data from body
  const { username, password } = req.body

  // Find user via username
  const user = await User.findOne({ username })

  if (user) {
    // Check for password correction
    const comparedPassword = await bcrypt.compareSync(password, user.password)

    if (comparedPassword) {
      // Generate token
      const token = await generateAccessToken(username)

      res.status(200).json(token)
    } else {
      res.status(400).json('Password is wrong')
    }
  } else {
    res.status(400).json('User not found')
  }
}

// @POST | Register user //
const registerUser = async (req, res) => {
  // Get data from body
  const { firstName, lastName, username, email, password } = req.body

  try {
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Prepare user for adding in DB
    const user = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    })

    // Generate token
    const token = await generateAccessToken(username)

    // Save user in DB
    await user.save()

    res.status(200).json(token)
  } catch (err) {
    res.status(400).json(err.errors)
  }
}

// @GET | Get user //
const getUser = async (req, res) => {
  // Find current user
  const user = await User.findOne({ username: req.user })

  if (user) {
    await res.status(200).json(user)
  }
}

module.exports = { loginUser, registerUser, getUser }
