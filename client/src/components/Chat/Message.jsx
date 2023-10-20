import React, { useEffect, useRef } from 'react'

const Message = ({ data, currentUser }) => {
  // useRef & useEffect hooks for latest msg scroll
  const ref = useRef()

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }, [data.text])

  return (
    <div
      ref={ref}
      className={
        currentUser
          ? 'message flex w-full flex-row-reverse mb-5 last:mb-0'
          : 'message flex w-full mb-5 last:mb-0'
      }
    >
      <div
        className={
          currentUser
            ? 'message__box rounded-lg border bg-blue-500 flex items-center justify-center pl-5 pr-5 pt-3 pb-3 text-white font-semibold max-w-xl break-all w-xl'
            : 'message__box rounded-lg border bg-white flex items-center justify-center pl-5 pr-5 pt-3 pb-3 text-black font-semibold max-w-xl break-all w-xl'
        }
      >
        {data.text}
      </div>
    </div>
  )
}

export default Message
