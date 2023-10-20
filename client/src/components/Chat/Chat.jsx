import React, { useEffect } from 'react'
import ChatMain from './ChatMain'
import ChatFooter from './ChatFooter'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage } from '../../features/message/messageApiCalls'

const Chat = ({
  disabled,
  chat,
  setSidebarScrolled,
  setMessage,
  message,
  handleSendMessage,
  socket,
  user,
}) => {
  // Dispatch for redux
  const dispatch = useDispatch()
  
  // Get messages from store
  const messages = useSelector(store => store.message.messages)

   useEffect(() => {
    socket.on('sendMessage', body => {
      addMessage(dispatch, body)
    })
  }, [])

  return (
    <div className='chat w-screen h-screen p-5'>
      <div className='chat__wrapper flex flex-col h-full'>
        {disabled || !chat ? (
          <div className='flex-1 text-gray-950 text-lg lg:text-2xl font-semibold flex items-center justify-center'>
            Please select a conversation or create new one
          </div>
        ) : (
          <ChatMain messages={messages} user={user} />
        )}
        <ChatFooter
          disabled={disabled}
          chat={chat}
          setSidebarScrolled={setSidebarScrolled}
          setMessage={setMessage}
          message={message}
          handleSendMessage={handleSendMessage}
        />
      </div>
    </div>
  )
}

export default Chat
