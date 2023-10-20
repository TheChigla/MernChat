import { createSlice } from '@reduxjs/toolkit'

export const toastSlice = createSlice({
  name: 'toast',
  initialState: {
    errors: null,
    success: null,
  },
  reducers: {
    addErrors: (state, action) => {
      state.errors = action.payload.errors
    },
    addSuccess: (state, action) => {
      state.success = action.payload.success
    },
  },
})

export const { addErrors, addSuccess } = toastSlice.actions

export default toastSlice.reducer
