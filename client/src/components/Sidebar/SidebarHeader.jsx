import React from 'react'
import { PiChatsFill, PiX } from 'react-icons/pi'

const SidebarHeader = ({ setSidebarScrolled }) => {
  return (
    <div className='sidebar__header flex items-center pl-5 pr-5 justify-between'>
      <div className='flex gap-3 text-2xl text-blue-500 font-bold'>
        <PiChatsFill className='text-3xl' /> MernChat
      </div>
      <PiX
        className='text-3xl text-blue-500 lg:hidden'
        onClick={() => setSidebarScrolled(true)}
      />
    </div>
  )
}

export default SidebarHeader
