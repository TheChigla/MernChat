const authenticateToken = require('../config/authenticateToken')
const {
  createChat,
  getChats,
  joinChat,
  getChat,
} = require('../controllers/chatController')

const router = require('express').Router()

router
  .route('/')
  .get(authenticateToken, getChats)
  .post(authenticateToken, createChat)

router.route('/join').post(authenticateToken, joinChat)

router.route('/:id').get(authenticateToken, getChat)

module.exports = router
