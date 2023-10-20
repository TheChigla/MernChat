const Message = require('../models/Message')
const User = require('../models/User')

// @POST | Send message //
const sendMessage = async (req, res) => {
  // Find current user
  const user = await User.findOne({ username: req.user })

  // Get data from body
  const { chatId, text } = req.body

  // Prepare message model for upload
  const message = Message({
    chatId,
    text,
    senderId: user.id,
  })

  await message.save()
}

// @GET | Get messages //
const getMessages = async (req, res) => {
  // Get data from body
  const chatId = req.params.id

  // Find appropriate messages
  const messages = await Message.find({ chatId }).lean()

  res.status(200).json(messages)
}

module.exports = { sendMessage, getMessages }
