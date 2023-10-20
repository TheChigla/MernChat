const mongoose = require('mongoose')

const chatSchema = mongoose.Schema(
  {
    chatName: {
      type: String,
      required: true,
    },
    chatId: {
      type: String,
      required: true,
    },
    chatOwner: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    chatMember: {
      type: mongoose.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
)

const Chat = mongoose.model('Chat', chatSchema)

module.exports = Chat
