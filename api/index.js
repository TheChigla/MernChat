const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')
require('colors')
require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser')
const connectDB = require('./config/connectDB')

// Express app
const app = express()

// Connect to DB
connectDB()

// Socket server

const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URI,
    credentials: true,
    methods: ['GET', 'POST'],
  },
})

// Middlewares
app.use(cors({ origin: process.env.CLIENT_URI, credentials: true }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Routes
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoutes')

app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoutes)

// Socket events //
io.on('connection', socket => {
  console.log(`Client connected: ${socket.id}`.bgGreen)

  // Join room event
  socket.on('joinRoom', chatId => {
    socket.join(chatId)
  })

  // Join chat event
  socket.on('joinChat', body => {
    io.to(body.chatId).emit('joinChat', body)
  })

  // Send message event
  socket.on('sendMessage', body => {
    io.to(body.chatId).emit('sendMessage', body)
  })

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`.bgRed)
  })
})
// Socket events //

// Listening port to server
const PORT = process.env.PORT
httpServer.listen(PORT || 5000, () =>
  console.log(`Server has started on port: ${PORT}`.yellow)
)
