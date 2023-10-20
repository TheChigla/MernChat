import { VscSend, VscMenu } from 'react-icons/vsc'

const ChatFooter = ({
  disabled,
  chat,
  setSidebarScrolled,
  setMessage,
  message,
  handleSendMessage,
}) => {
  return (
    <div className='chat__footer h-12'>
      <form
        className='chat__footer---form flex gap-3'
        onSubmit={e => handleSendMessage(e)}
      >
        <button
          type='button'
          className='w-12 h-12 bg-blue-500 rounded flex items-center justify-center text-white text-2xl lg:text-3xl lg:hidden'
        >
          <VscMenu
            onClick={() => {
              setSidebarScrolled(false)
            }}
          />
        </button>
        <input
          type='text'
          name=''
          id=''
          className='h-12 border pl-3 pr-3 outline-none w-full rounded'
          placeholder='Type your message here'
          required
          disabled={disabled || !chat}
          onChange={e => setMessage(e.target.value)}
          value={message}
        />
        <button
          type='submit'
          className='w-12 h-12 bg-blue-500 rounded flex items-center justify-center text-white  text-2xl lg:text-3xl'
          disabled={disabled || !chat}
          chat={chat}
        >
          <VscSend />
        </button>
      </form>
    </div>
  )
}

export default ChatFooter
