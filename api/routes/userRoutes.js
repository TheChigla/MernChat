const authenticateToken = require('../config/authenticateToken')
const {
  loginUser,
  registerUser,
  getUser,
} = require('../controllers/userController')

const router = require('express').Router()

router.route('/login').post(loginUser)
router.route('/register').post(registerUser)
router.route('/').get(authenticateToken, getUser)

module.exports = router
