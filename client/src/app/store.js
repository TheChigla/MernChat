import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import toastReducer from '../features/toast/toastSlice'
import chatReducer from '../features/chat/chatSlice'
import messageReducer from '../features/message/messageSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    toast: toastReducer,
    chat: chatReducer,
    message: messageReducer,
  },
})
