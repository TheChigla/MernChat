import { createSlice } from '@reduxjs/toolkit'

export const messageSlice = createSlice({
  name: 'message',
  initialState: {
    messages: null,
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload.messages
    },
    updateMessages: (state, action) => {
      state.messages.push(action.payload.message)
    },
  },
})

export const { setMessages, updateMessages } = messageSlice.actions

export default messageSlice.reducer
