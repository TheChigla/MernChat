import React, { useEffect, useState } from 'react'
import SidebarHeader from './SidebarHeader'
import SidebarUser from './SidebarUser'
import SidebarFooter from './SidebarFooter'

const Sidebar = ({
  handleCreatePopup,
  handleJoinPopup,
  setSidebarScrolled,
  sidebarScrolled,
  chats,
  socket,
}) => {
  return (
    <div
      className={
        sidebarScrolled
          ? 'sidebar fixed lg:relative -translate-x-80'
          : 'sidebar fixed lg:relative'
      }
    >
      <div className='sidebar__wrapper bg-white max-w-xs w-screen h-screen pt-5 lg:max-w-sm lg:w-screen flex flex-col fixed lg:relative'>
        <SidebarHeader setSidebarScrolled={setSidebarScrolled} />
        <div className='sidebar__list mt-5 flex-1 overflow-auto'>
          {chats ? (
            Object.entries(chats).map(([key, value]) => {
              return <SidebarUser data={value} key={key} socket={socket} />
            })
          ) : (
            <div className='loader'></div>
          )}
        </div>
        <SidebarFooter
          handleCreatePopup={handleCreatePopup}
          handleJoinPopup={handleJoinPopup}
        />
      </div>
    </div>
  )
}

export default Sidebar
