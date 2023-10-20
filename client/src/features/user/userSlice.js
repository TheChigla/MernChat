import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    authed: false,
    user: null,
  },
  reducers: {
    authUser: (state, action) => {
      state.authed = action.payload.authed
    },
    setUser: (state, action) => {
      state.user = action.payload.user
    },
  },
})

export const { authUser, setUser } = userSlice.actions

export default userSlice.reducer
