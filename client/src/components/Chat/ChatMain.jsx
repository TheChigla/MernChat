import Message from './Message'

const ChatMain = ({ user, messages }) => {
  return (
    <div className='chat__main flex-1 overflow-auto mb-5 lg:pr-5'>
      {messages && user ? (
        Object.entries(messages).map(([key, value]) => {
          return (
            <Message
              key={key}
              data={value}
              currentUser={value.senderId == user._id ? true : false}
            />
          )
        })
      ) : (
        <div className='loader full'></div>
      )}
    </div>
  )
}

export default ChatMain
