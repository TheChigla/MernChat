import { FaPlus, FaUser } from 'react-icons/fa'
import { FaArrowRightFromBracket, FaPowerOff } from 'react-icons/fa6'
import { useSelector } from 'react-redux'

const SidebarFooter = ({ handleCreatePopup, handleJoinPopup }) => {
  // Get user from store
  const user = useSelector(state => state.user.user)

  return (
    <div className='sidebar__footer h-16 w-full flex items-center justify-between pl-3 pr-3'>
      <div className='sidebar__footer---user flex gap-3 items-center text-gray-950 font-semibold text-lg'>
        <FaUser className='text-gray-800' /> {user ? user.firstName : ''}
      </div>
      <div className='sidebar__footer---buttons flex gap-3 items-center'>
        <div className='sidebar__footer---button'>
          <button
            type='button'
            className='w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-1xl'
            onClick={() => handleCreatePopup()}
          >
            <FaPlus title='Add new chat' />
          </button>
        </div>
        <div className='sidebar__footer---button'>
          <button
            type='button'
            className='w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-1xl'
            onClick={() => handleJoinPopup()}
          >
            <FaArrowRightFromBracket title='Join in chat' />
          </button>
        </div>
        <div className='sidebar__footer---button'>
          <button
            type='button'
            className='w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-1xl'
            onClick={() => {
              localStorage.removeItem('token')
              window.location.href = '/'
            }}
          >
            <FaPowerOff title='Sign out' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default SidebarFooter
