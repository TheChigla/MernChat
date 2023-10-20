const Chat = require('../models/Chat')
const User = require('../models/User')
const bcrypt = require('bcryptjs')

// @GET | Get user chats //
const getChats = async (req, res) => {
  // Find current user
  const user = await User.findOne({ username: req.user })

  // Find chats where current user is an owner or a member
  const chats = await Chat.find({
    $or: [{ chatOwner: user.id }, { chatMember: user.id }],
  }).lean()

  // Find chat member
  for (let chat of chats) {
    if (chat.chatMember) {
      const member = await User.findById(chat.chatMember)
      const owner = await User.findById(chat.chatOwner)
      if (user.id === member.id) {
        chat.member = owner
      } else {
        chat.member = member
      }
    }
  }

  res.status(200).json(chats)
}

// @GET | Get current chat //
const getChat = async (req, res) => {
  try {
    // Get chat id from request params
    const chatId = req.params.id

    // Find chat via chatId
    const chat = await Chat.findOne({ chatId })

    if (chat) {
      res.status(200).json(chat)
    }
  } catch (err) {
    res.status(400).json('Chat not found')
  }
}

// @POST | Create chat //
const createChat = async (req, res) => {
  // Get chat name from body
  const { chatName } = req.body

  // Find chat owner
  const chatOwner = await User.findOne({ username: req.user })

  // Generate chat id
  const hashedId = await bcrypt.hash(chatName, 10)
  const chatId = Buffer.from(hashedId).toString('base64')

  // Prepare chat model
  const chat = Chat({
    chatName,
    chatOwner: chatOwner.id,
    chatId,
  })

  // Save chat to database
  await chat.save()

  res.status(200).json(chat)
}

// @POST | Join in chat //
const joinChat = async (req, res) => {
  // Get chat id from body
  const { chatId } = req.body

  // Find chat via chatId
  const chat = await Chat.findOne({ chatId })

  if (chat) {
    // Find current user
    const user = await User.findOne({ username: req.user })

    // Find chat owner
    const owner = await User.findById(chat.chatOwner)

    // Find chat member
    const member = chat.chatMember ? await User.findById(chat.chatMember) : null

    // Exclusions for user to join in chat
    if (user.id === owner.id) {
      res.status(400).json('You cannot join in your own chat')
    } else if (member && user.id === member.id) {
      res.status(400).json('You have already joined in this conversation')
    } else if (member) {
      res.status(400).json('Chat is already full')
    } else {
      chat.chatMember = user.id
      await chat.save()
    }
  } else {
    res.status(400).json('Chat not found')
  }
}

module.exports = { getChats, getChat, createChat, joinChat }
