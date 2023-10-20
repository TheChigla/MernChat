const authenticateToken = require('../config/authenticateToken')
const { getMessages, sendMessage } = require('../controllers/messageController')

const router = require('express').Router()

router.route('/').post(authenticateToken, sendMessage)
router.route('/:id').get(authenticateToken, getMessages)

module.exports = router
