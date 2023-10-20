import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import Chat from '../components/Chat/Chat'
import { getUser } from '../features/user/userApiCalls'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import {
  createChat,
  getChat,
  getChats,
  joinChat,
} from '../features/chat/chatApiCalls'
import { io } from 'socket.io-client'
import { useParams } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import {
  getMessages,
  sendMessage,
  addMessage,
} from '../features/message/messageApiCalls'

const Conversations = ({ disabled }) => {
  // Message state
  const [message, setMessage] = useState('')

  // Dispatch for redux
  const dispatch = useDispatch()

  // Define socket
  const socket = io(import.meta.env.VITE_BASE_URI)

  // Define URL params
  const params = useParams()

  // Get chat and put in store
  useEffect(() => {
    const findChat = async () => {
      await getChat(dispatch, params.id)
    }
    findChat()
  }, [])

  // Get messages and put them in store
  useEffect(() => {
    const retreiveMessages = async () => {
      await getMessages(dispatch, params.id)
    }
    retreiveMessages()
  }, [])

  // Get user and put in store
  useEffect(() => {
    const findUser = async () => {
      await getUser(dispatch)
    }
    findUser()
  }, [])

  // Get user chats
  useEffect(() => {
    const retrieveChats = async () => {
      await getChats(dispatch)
    }
    retrieveChats()
  }, [])

  // Join in room via socket
  useEffect(() => {
    const joinRoom = async () => {
      if (params.id) {
        socket.emit('joinRoom', params.id)
      }
    }
    joinRoom()
  }, [socket])

  // Scroll state for sidebar
  const [sidebarScrolled, setSidebarScrolled] = useState(false)

  // Get user from store
  const user = useSelector(state => state.user.user)

  // Get chats from store
  const chats = useSelector(state => state.chat.chats)

  // Get current chat from store
  const chat = useSelector(state => state.chat.chat)

  // Get messages from store
  const messages = useSelector(store => store.message.messages)

  // Get errors from redux
  const errors = useSelector(state => state.toast.errors)

  // Get success from redux
  const success = useSelector(state => state.toast.success)

  // Call toast for error
  useEffect(() => {
    if (errors) {
      errors.forEach(error => {
        toast.error(error)
      })
    }
  }, [errors])

  // Call toast for success
  useEffect(() => {
    if (success) {
      toast.success(success)
    }
  }, [success])

  // Popup for chat creation
  const handleCreatePopup = () => {
    Swal.fire({
      title: 'Create new chat',
      showCancelButton: true,
      confirmButtonColor: 'rgb(15 23 42)',
      confirmButtonText: 'Submit',
      html: '<input type="text" placeholder="Chat name" class="border rounded pl-2 h-10 w-full" id="chatName" required />',
      preConfirm: () => {
        const chatName = document.getElementById('chatName').value

        createChat(chatName)
      },
    })
  }

  // Popup for joining in chat
  const handleJoinPopup = () => {
    Swal.fire({
      title: 'Join in chat',
      showCancelButton: true,
      confirmButtonColor: 'rgb(15 23 42)',
      confirmButtonText: 'Join',
      html: '<input type="text" placeholder="Chat id" class="border rounded pl-2 h-10 w-full" id="chatId" required />',
      preConfirm: () => {
        const chatId = document.getElementById('chatId').value

        const body = {
          name: `${user.firstName} ${user.lastName}`,
          username: `${user.username}`,
          chatId,
        }

        joinChat(dispatch, chatId)

        // Send socket info
        socket.emit('joinChat', body)

        setTimeout(() => {
          window.location.href = `/conversations/${chatId}`
        }, 1000)
      },
    })
  }

  // Handle send message
  const handleSendMessage = async e => {
    e.preventDefault()

    // Body for socket
    const body = {
      chatId: params.id,
      text: message,
      senderId: user._id,
    }

    socket.emit('sendMessage', body)

    sendMessage(body)

    setMessage('')
  }

  if (localStorage.getItem('token')) {
    return (
      <main>
        <Toaster position='top-left' />
        <div className='conversations'>
          <div className='conversations__wrapper flex'>
            <Sidebar
              sidebarScrolled={sidebarScrolled}
              setSidebarScrolled={setSidebarScrolled}
              handleCreatePopup={handleCreatePopup}
              handleJoinPopup={handleJoinPopup}
              chats={chats}
              socket={socket}
            />
            <Chat
              chat={chat}
              disabled={disabled}
              setSidebarScrolled={setSidebarScrolled}
              setMessage={setMessage}
              message={message}
              handleSendMessage={handleSendMessage}
              socket={socket}
              user={user}
              messages={messages}
            />
          </div>
        </div>
      </main>
    )
  } else {
    window.location.href = '/'
  }
}

export default Conversations
