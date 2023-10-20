import './Sidebar.scss'
import { FaLink } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import { useEffect, useState } from 'react'

const SidebarUser = ({ data, socket }) => {
  const [joinedName, setJoinedName] = useState('')
  const [joinedUsername, setJoinedUsername] = useState('')

  // Define URL params
  const params = useParams()

  // Join chat notification
  useEffect(() => {
    socket.on('joinChat', body => {
      setJoinedName(body.name)
      setJoinedUsername(body.username)
    })
  }, [socket])

  return (
    <a
      href={`/conversations/${data.chatId}`}
      className={
        data.chatId === params.id
          ? 'sidebar__user selected flex items-center justify-between p-3 border-l-4 border-blue-500 cursor-pointer'
          : 'sidebar__user flex items-center p-3 cursor-pointer justify-between'
      }
    >
      <Toaster position='top-left' />
      <div className='sidebar__user---group flex gap-3 items-center'>
        <div className='sidebar__user---avatar w-10 h-10 rounded-full flex justify-center items-center text-gray-950 font-semibold relative bg-blue-200'>
          <div className='sidebar__user---avatar__letter font-semibold'>
            {data.member
              ? data.member.username[0]
              : joinedUsername
              ? joinedUsername[0]
              : '⌛'}
          </div>
          <div
            className={
              1 === 1
                ? 'sidebar__user---avatar__status w-4 h-4 rounded-full bg-green-500 border-white border absolute ml-6 mt-6'
                : 'sidebar__user---avatar__status w-4 h-4 rounded-full bg-gray-500 border-white border absolute ml-6 mt-6'
            }
          ></div>
        </div>
        <div className='sidebar__user---username text-lg font-semibold'>
          {data.member
            ? `${data.member.firstName} ${data.member.lastName}`
            : joinedName
            ? joinedName
            : 'Empty chat'}
        </div>
      </div>
      <div className='sidebar__chat---share-button hidden'>
        <button
          type='button'
          className='text-blue-500'
          onClick={e => {
            e.preventDefault()
            navigator.clipboard.writeText(data.chatId)
            toast.success('Succesfully copied chat id')
          }}
        >
          <FaLink />
        </button>
      </div>
    </a>
  )
}

export default SidebarUser
