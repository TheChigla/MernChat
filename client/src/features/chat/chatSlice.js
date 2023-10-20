import { createSlice } from '@reduxjs/toolkit'

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chats: null,
    chat: null,
  },
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload.chats
    },
    setChat: (state, action) => {
      state.chat = action.payload.chat
    },
  },
})

export const { setChats, setChat } = chatSlice.actions

export default chatSlice.reducer
